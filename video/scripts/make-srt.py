"""Writes publish/fath.ar.srt from the aligned script tokens (src/timing.json)."""
import json, re
ROOT = __file__.rsplit('/scripts/', 1)[0]
T = json.load(open(f'{ROOT}/src/timing.json'))

def ts(x):
    ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'

cues, cur = [], []
for i, t in enumerate(T):
    cur.append(t)
    gap = (T[i + 1]['s'] - t['e']) if i + 1 < len(T) else 9
    if re.search(r'[.،؟:…»]$', t['t']) and (len(cur) >= 3 or gap > 0.5) or len(cur) >= 7 or gap > 0.9:
        cues.append(cur); cur = []
if cur: cues.append(cur)

out = []
for n, c in enumerate(cues, 1):
    start, end = c[0]['s'] - 0.05, c[-1]['e'] + 0.25
    if n < len(cues):
        end = min(end, cues[n][0]['s'] - 0.07)
    words = [re.sub(r'[«»]', '', w['t']) for w in c]
    text = ' '.join(words)
    if len(words) > 4:  # two balanced lines
        h = (len(words) + 1) // 2
        text = ' '.join(words[:h]) + '\n' + ' '.join(words[h:])
    out.append(f'{n}\n{ts(max(start, 0))} --> {ts(end)}\n{text}\n')
import os
os.makedirs(f'{ROOT}/publish', exist_ok=True)
open(f'{ROOT}/publish/fath.ar.srt', 'w', encoding='utf8').write('\n'.join(out))
print(len(cues), 'cues')
