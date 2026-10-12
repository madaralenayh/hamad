"""Builds audio/mix.wav: processed voice + ducked music + synthesized sound design.

python3 scripts/build-audio.py   (needs numpy + ffmpeg; music in audio/music-raw.mp3, voice in public/voice.mp3)
"""
import json, re, subprocess, random
import numpy as np

SR = 48000
ROOT = __file__.rsplit('/scripts/', 1)[0]
T = json.load(open(f'{ROOT}/src/timing.json'))
DUR = T[-1]['e'] + 1.8
DUR = np.ceil(DUR * 30) / 30
N = int(DUR * SR)
rng = np.random.default_rng(7)

def run(*a):
    r = subprocess.run(a, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if r.returncode:
        raise SystemExit(r.stderr[-1500:])

# ---------------------------------------------------------------- voice
run('ffmpeg', '-y', '-i', f'{ROOT}/public/voice.mp3', '-af',
    'highpass=f=70,'
    'equalizer=f=220:t=q:w=1.0:g=-1.5,'
    'equalizer=f=3200:t=q:w=1.2:g=1.8,'
    'deesser=i=0.35:m=0.5:f=0.5,'
    'acompressor=threshold=-21dB:ratio=2.6:attack=12:release=180:makeup=3,'
    'loudnorm=I=-16:TP=-2:LRA=7,'
    f'apad=whole_dur={DUR}', '-ar', str(SR), '-ac', '2', '-t', str(DUR), f'{ROOT}/audio/voice-proc.wav')

# ---------------------------------------------------------------- music (ducked under the voice)
fade_out_start = DUR - 3.5
run('ffmpeg', '-y', '-i', f'{ROOT}/audio/music-raw.mp3', '-i', f'{ROOT}/audio/voice-proc.wav', '-filter_complex',
    '[0:a]atrim=0:%f,asetpts=PTS-STARTPTS,'
    'highpass=f=60,lowpass=f=13000,'
    'equalizer=f=2800:t=q:w=0.9:g=-5,equalizer=f=600:t=q:w=1:g=-2,'
    'volume=-6dB,afade=t=in:st=0:d=2.0,afade=t=out:st=%f:d=3.2[m];'
    '[m][1:a]sidechaincompress=threshold=0.04:ratio=4:attack=30:release=900:makeup=1[ducked]' % (DUR, fade_out_start),
    '-map', '[ducked]', '-ar', str(SR), '-ac', '2', '-t', str(DUR), f'{ROOT}/audio/music-proc.wav')

def load(path):
    p = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True)
    a = np.frombuffer(p.stdout, dtype=np.float32).reshape(-1, 2)
    out = np.zeros((N, 2), dtype=np.float32)
    out[:min(N, len(a))] = a[:N]
    return out

voice = load(f'{ROOT}/audio/voice-proc.wav')
music = load(f'{ROOT}/audio/music-proc.wav')

# ---------------------------------------------------------------- sound design (synthesized, so no licensing issues)
def env_exp(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))

def lowpass(x, k):  # one-pole, k in (0,1): bigger = brighter
    y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x):
        s += k * (v - s); y[i] = s
    return y

def whoosh(dur=0.75, lo=0.02, hi=0.5, gain=0.5):
    n = int(dur * SR); x = rng.standard_normal(n)
    out = np.zeros(n); seg = 24; L = n // seg
    for i in range(seg):
        k = lo + (hi - lo) * np.sin(np.pi * (i + 0.5) / seg) ** 1.4
        out[i * L:(i + 1) * L] = lowpass(x[i * L:(i + 1) * L], k)
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** 2.2
    hp = out - lowpass(out, 0.004)
    return hp * e * gain * 3.2

def pop(gain=0.35):
    n = int(0.16 * SR); t = np.arange(n) / SR
    f = 900 * np.exp(-t * 14) + 380
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.035)
    click = rng.standard_normal(n) * env_exp(n, 0.002) * 0.25
    return (tone + click) * gain

def key(gain=0.3):
    n = int(0.05 * SR)
    clk = rng.standard_normal(n) * env_exp(n, 0.0025); clk = clk - lowpass(clk, 0.1)
    thud = np.sin(2 * np.pi * 140 * np.arange(n) / SR) * env_exp(n, 0.012) * 0.6
    return (clk * 0.7 + thud) * gain

def impact(gain=0.7):
    n = int(1.4 * SR); t = np.arange(n) / SR
    f = 60 * np.exp(-t * 3) + 34
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.35)
    noise = lowpass(rng.standard_normal(n), 0.03) * env_exp(n, 0.18) * 0.6
    return (body + noise) * gain

def brush(dur=1.0, gain=0.3):
    n = int(dur * SR); x = rng.standard_normal(n)
    y = lowpass(x, 0.35) - lowpass(x, 0.05)
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** 1.5
    return y * e * gain * 2.2

def riser(dur=3.0, gain=0.35):
    n = int(dur * SR); t = np.arange(n) / SR
    f = 110 * (1 + 3.2 * (t / dur) ** 2)
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / dur) ** 2
    tone2 = np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * (t / dur) ** 2.6 * 0.5
    noise = (lowpass(rng.standard_normal(n), 0.1) - lowpass(rng.standard_normal(n), 0.01)) * (t / dur) ** 3 * 0.8
    return (tone + tone2 + noise) * gain

sfx = np.zeros((N, 2), dtype=np.float32)

def put(sound, at, pan=0.0):
    i = int(max(at, 0) * SR)
    if i >= N: return
    s = sound[:N - i]
    sfx[i:i + len(s), 0] += s * (1 - max(pan, 0))
    sfx[i:i + len(s), 1] += s * (1 + min(pan, 0))

tt = lambda i: T[i]['s']

main = open(f'{ROOT}/src/Main.tsx', encoding='utf8').read()
accents = sorted({int(x) for m in re.finditer(r'accent: \[([\d, ]+)\]', main) for x in m.group(1).split(',') if x.strip()})
arts = sorted({int(m.group(1)) for m in re.finditer(r"\{kind: '(?:img|svg)'.*?at: (\d+)", main)})
SWEEPS = [int(x) for x in re.search(r'const SWEEPS = \[([\d, ]+)\]', open(f'{ROOT}/src/Main.tsx').read()).group(1).split(',')]

def PK(x, peak):
    return x / max(float(np.abs(x).max()), 1e-9) * peak

put(PK(riser(3.0), 0.18), 0.0)
put(PK(impact(), 0.30), 3.0)
for i in SWEEPS:
    put(PK(whoosh(0.8), 0.26), tt(i) - 0.55, pan=rng.uniform(-0.3, 0.3))
for i in arts:
    put(PK(whoosh(0.45, lo=0.03, hi=0.3), 0.14), tt(i) - 0.25, pan=0.25 if rng.random() > .5 else -0.25)
for i in accents:
    put(PK(pop(), 0.11), tt(i) + 0.02, pan=rng.uniform(-0.2, 0.2))
for i in (77, 244, 333, 340):
    put(PK(brush(0.95), 0.16), tt(i) - 0.6)
    put(PK(impact(), 0.22), tt(i) + 0.15)
for tok in T[213:221]:
    chars = len(re.sub(r'[.،,…:«»]', '', tok['t']))
    for c in range(chars):
        put(PK(key(), 0.09), tok['s'] + (tok['e'] - tok['s']) * c / max(chars, 1) + rng.uniform(-0.01, 0.01), pan=rng.uniform(-0.15, 0.15))
put(PK(impact(), 0.40), tt(339) - 0.05)
put(PK(whoosh(0.7), 0.30), tt(339) - 0.6)

# duck the sound design a little under the voice so words stay clean
env = np.abs(voice).max(axis=1)
env = np.convolve(env, np.ones(int(0.12 * SR)) / int(0.12 * SR), mode='same')
duck = 1 - 0.45 * np.clip(env / 0.12, 0, 1)
sfx *= duck[:, None].astype(np.float32)

mix = voice + music + sfx
peak = np.abs(mix).max()
print('raw peak', round(float(peak), 3))
out = (mix * (0.9 / peak if peak > 0.9 else 1.0)).astype('<f4')
open(f'{ROOT}/audio/mix-raw.f32', 'wb').write(out.tobytes())
run('ffmpeg', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', f'{ROOT}/audio/mix-raw.f32', f'{ROOT}/audio/mix-raw.wav')
# final master (two-pass loudnorm): -14 LUFS integrated, -1.5 dBTP max (YouTube / social friendly)
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', f'{ROOT}/audio/mix-raw.wav', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json', '-f', 'null', '-'], capture_output=True, text=True)
m = json.loads(r.stderr[r.stderr.rindex('{'):])
af = ('loudnorm=I=-14:TP=-1.5:LRA=9:measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true,'
      'alimiter=limit=0.82:level=disabled') % (m['input_i'], m['input_tp'], m['input_lra'], m['input_thresh'], m['target_offset'])
run('ffmpeg', '-y', '-i', f'{ROOT}/audio/mix-raw.wav', '-af', af, '-ar', str(SR), '-c:a', 'pcm_s16le', f'{ROOT}/audio/mix.wav')
print('events: sweeps', len(SWEEPS), 'art', len(arts), 'accents', len(accents))
