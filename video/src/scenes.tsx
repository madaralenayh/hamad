import React from 'react';
import {Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import timing from './timing.json';
import {AR_FONT, COLORS, EN_FONT} from './theme';
import {SVG_ART} from './art';
import photos from './photos.json';

const PHOTOS = photos as Record<string, string>;

export type Tok = {i: number; t: string; line: number; s: number; e: number};
export const T = timing as Tok[];
export const END = T[T.length - 1].e;

const ease = Easing.bezier(0.45, 0, 0.2, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const clean = (t: string) => t.replace(/[.،,…:«»]/g, '');

/** current time in seconds */
export const useT = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame / fps;
};

/* ------------------------------------------------------------------ text */

export type Chunk = {
  a: number;
  b: number;
  breaks?: number[];
  accent?: number[];
  kashida?: Record<number, [number, number]>;
  circle?: number[];
  strike?: number[];
  size?: number;
  y?: number;
  labels?: {text: string; at: number; x: number; y: number; en?: boolean}[];
};

const autoSize = (lines: Tok[][]) => {
  const m = Math.max(...lines.map((l) => l.length));
  return m <= 2 ? 150 : m <= 3 ? 124 : m <= 4 ? 112 : m <= 5 ? 98 : 86;
};

const Tatweel = (text: string, after: number, n: number) => text.slice(0, after) + 'ـ'.repeat(n) + text.slice(after);

const WordEl: React.FC<{tok: Tok; c: Chunk}> = ({tok, c}) => {
  const f = useT();
  const at = tok.s - 0.04;
  const p = interpolate(f, [at, at + 0.3], [0, 1], {...clamp, easing: ease});
  const accent = c.accent?.includes(tok.i);
  let text = clean(tok.t);
  const k = c.kashida?.[tok.i];
  if (k) {
    const kp = interpolate(f, [tok.s, tok.s + 1.0], [0, 1], {...clamp, easing: ease});
    text = Tatweel(text, k[0], Math.round(kp * k[1]));
  }
  const cp = interpolate(f, [tok.s + 0.25, tok.e + 0.4], [0, 1], {...clamp, easing: ease});
  const sp = interpolate(f, [tok.s + 0.3, tok.s + 0.7], [0, 1], clamp);
  const ul = interpolate(f, [tok.s + 0.15, tok.s + 0.7], [0, 1], {...clamp, easing: ease});
  const pop = interpolate(f, [tok.s + 0.05, tok.s + 0.75], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const plain = accent && !k && !c.circle?.includes(tok.i);
  return (
    <span style={{position: 'relative', display: 'inline-block', margin: '0 16px', color: accent ? COLORS.accent : COLORS.ink, opacity: p, transform: `translateY(${(1 - p) * 16}px)`, filter: `blur(${(1 - p) * 6}px)`}}>
      {text}
      {c.circle?.includes(tok.i) && (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={{position: 'absolute', left: -34, top: -26, width: 'calc(100% + 68px)', height: 'calc(100% + 46px)', overflow: 'visible'}}>
          <path d="M150 8 C 60 6, 8 30, 12 62 C 16 100, 110 114, 170 110 C 250 104, 296 80, 290 46 C 284 14, 200 4, 120 14" fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - cp} />
        </svg>
      )}
      {plain && (
        <svg viewBox="0 0 100 14" preserveAspectRatio="none" style={{position: 'absolute', left: 0, bottom: -6, width: '100%', height: 14, overflow: 'visible'}}>
          <path d="M100 7 C 70 2, 38 11, 0 6" fill="none" stroke={COLORS.accent} strokeWidth={4.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ul} />
        </svg>
      )}
      {accent && pop > 0 && pop < 1 && (
        <>
          {[-1, 0, 1].map((d) => (
            <span key={d} style={{position: 'absolute', left: '50%', top: 8, width: 14, height: 14, background: COLORS.accent, transform: `translate(${d * pop * 70 - 7}px, ${-pop * 60}px) rotate(45deg) scale(${1 - pop * 0.6})`, opacity: 1 - pop}} />
          ))}
        </>
      )}
      {c.strike?.includes(tok.i) && <span style={{position: 'absolute', right: -8, top: '54%', height: 6, background: COLORS.accent, width: `calc(${sp * 100}% + 16px)`}} />}
    </span>
  );
};

export const LabelBox: React.FC<{text: string; at: number; x: number; y: number; en?: boolean}> = ({text, at, x, y, en}) => {
  const f = useT();
  const p = interpolate(f, [at, at + 0.25], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', left: x, top: y, background: COLORS.ink, color: '#fff', padding: '8px 22px', fontFamily: en ? EN_FONT : AR_FONT, fontWeight: en ? 900 : 700, fontSize: 34, letterSpacing: en ? 5 : 0, opacity: p, transform: `translateY(${(1 - p) * 10}px)`}}>
      {text}
    </div>
  );
};

/** Chunk visibility window computed from tokens; consecutive chunks cross-fade. */
export const TextPage: React.FC<{c: Chunk; from: number; to: number}> = ({c, from, to}) => {
  const f = useT();
  if (f < from - 0.02 || f > to + 0.02) return null;
  const toks = T.slice(c.a, c.b + 1);
  const lines: Tok[][] = [];
  let cur: Tok[] = [];
  toks.forEach((tk) => {
    cur.push(tk);
    if (c.breaks?.includes(tk.i)) {
      lines.push(cur);
      cur = [];
    }
  });
  if (cur.length) lines.push(cur);
  const size = c.size ?? autoSize(lines);
  const o = interpolate(f, [to - 0.25, to], [1, 0], clamp);
  const slide = interpolate(f, [to - 0.25, to], [0, -26], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(c.y ?? 0) + slide}px) scale(${1 + 0.045 * Math.min(1, Math.max(0, (f - from) / Math.max(to - from, 0.1)))})`, opacity: o}}>
      {lines.map((ln, li) => (
        <div key={li} dir="rtl" style={{fontFamily: AR_FONT, fontWeight: 800, fontSize: size, lineHeight: 1.32, whiteSpace: 'nowrap', textAlign: 'center'}}>
          {ln.map((tk) => (
            <WordEl key={tk.i} tok={tk} c={c} />
          ))}
        </div>
      ))}
      {c.labels?.map((l, i) => (
        <LabelBox key={i} {...l} />
      ))}
    </div>
  );
};

// Letters that can join to the next letter (dual-joining). A kashida may only follow one of these.
const DUAL = new Set('بتثجحخسشصضطظعغفقكلمنهيئ'.split(''));
const stripMarks = (t: string) => t.replace(/[\u064B-\u065F\u0670]/g, '');

const validateKashida = (c: Chunk) => {
  Object.entries(c.kashida ?? {}).forEach(([idx, [after]]) => {
    const raw = clean(T[Number(idx)].t);
    // `after` counts characters of the raw token (diacritics included), like Tatweel() does
    const prev = stripMarks(raw.slice(0, after)).slice(-1);
    const next = stripMarks(raw.slice(after)).slice(0, 1);
    if (!prev || !next || !DUAL.has(prev)) {
      throw new Error(`Bad kashida in "${raw}" after ${after}: "${prev}" cannot join to "${next}"`);
    }
  });
};

/** Lays chunks out in time. `to` of a chunk = start of the next chunk + overlap. */
export const layout = (chunks: Chunk[]) =>
  chunks.map((c, i) => {
    validateKashida(c);
    const from = T[c.a].s - 0.1;
    const end = T[c.b].e;
    const nextStart = chunks[i + 1] ? T[chunks[i + 1].a].s - 0.05 : end + 1.6;
    // hold the text until the next one is about to appear, so the two never share the screen for long
    return {c, from, to: Math.max(end + 0.3, Math.min(nextStart, end + 1.3))};
  });

/* ------------------------------------------------------------------- art */

export type Enter = 'scale' | 'left' | 'right' | 'drop' | 'throw';
export type Art = {
  kind: 'img' | 'svg';
  name: string;
  at: number;
  until: number;
  x: number;
  y: number;
  w: number;
  rot?: number;
  enter?: Enter;
  /** if public/photos/<photo>.* exists it replaces the illustration */
  photo?: string;
};

const ArtEl: React.FC<{a: Art}> = ({a}) => {
  const f = useT();
  const start = T[a.at].s - 0.1;
  const end = T[a.until].e + 0.7;
  if (f < start || f > end + 0.05) return null;
  const inP = interpolate(f, [start, start + 0.7], [0, 1], {...clamp, easing: a.enter === 'throw' ? Easing.out(Easing.back(1.6)) : ease});
  const outP = interpolate(f, [end - 0.5, end], [1, 0], clamp);
  const float = Math.sin((f - start) * 1.6) * 7;
  let tx = 0, ty = 0, sc = 0.9 + 0.1 * inP;
  const e = a.enter ?? 'scale';
  if (e === 'left') tx = -(1 - inP) * 420;
  if (e === 'right') tx = (1 - inP) * 420;
  if (e === 'drop') ty = -(1 - inP) * 500;
  if (e === 'throw') {
    tx = (a.x < 960 ? -1 : 1) * (1 - inP) * 900;
    ty = -(1 - inP) * 300;
    sc = 1;
  }
  const rot = (a.rot ?? 0) + (e === 'throw' ? (1 - inP) * (a.x < 960 ? -40 : 40) : 0);
  const Svg = SVG_ART[a.name];
  const photo = a.photo ? PHOTOS[a.photo] : undefined;
  if (photo) {
    const k = interpolate(f, [start, end], [1, 1.14], clamp);
    const pw = a.w * 1.2, ph = a.w * 1.0;
    return (
      <div style={{position: 'absolute', left: a.x - pw / 2, top: a.y - ph / 2, width: pw, height: ph, background: '#fff', padding: '14px 14px 46px', boxSizing: 'border-box', boxShadow: '0 16px 30px rgba(0,0,0,.28)', opacity: Math.min(inP * 1.4, 1) * outP, transform: `translate(${tx}px, ${ty + float}px) rotate(${rot}deg)`}}>
        <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
          <Img src={staticFile(`photos/${photo}`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${k})`}} />
        </div>
      </div>
    );
  }
  return (
    <div style={{position: 'absolute', left: a.x - a.w / 2, top: a.y - a.w / 2, width: a.w, height: a.w, opacity: Math.min(inP * 1.4, 1) * outP, transform: `translate(${tx}px, ${ty + float}px) rotate(${rot}deg) scale(${sc})`, filter: 'drop-shadow(0 12px 12px rgba(26,26,26,.16))', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {a.kind === 'img' ? <Img src={staticFile(`art/${a.name}.png`)} style={{width: '100%'}} /> : <Svg />}
    </div>
  );
};
export const ArtLayer: React.FC<{items: Art[]}> = ({items}) => (
  <>
    {items.map((a, i) => (
      <ArtEl key={i} a={a} />
    ))}
  </>
);

/* ----------------------------------------------------------- brand logo */

export const Logo: React.FC<{at: number; until?: number; y: number; w: number}> = ({at, until, y, w}) => {
  const f = useT();
  const start = T[at].s - 0.6;
  const end = until !== undefined ? T[until].e + 0.5 : 1e9;
  if (f < start || f > end) return null;
  const p = interpolate(f, [start, start + 0.8], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [end - 0.3, end], [1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: 960 - w / 2, top: y - (w * 458) / 824 / 2, width: w, opacity: o}}>
      <Img src={staticFile('logo.svg')} style={{width: '100%', mixBlendMode: 'multiply', clipPath: `inset(0 0 0 ${(1 - p) * 100}%)`}} />
      <div style={{position: 'absolute', left: '82.1%', top: '23.1%', width: w * 0.047, height: w * 0.047, background: COLORS.accent, transform: 'translate(-50%,-50%) rotate(45deg)', opacity: Math.max(0, Math.min(1, (p - 0.9) * 10))}} />
    </div>
  );
};

/* ------------------------------------------------- one-off scene pieces */

/** Opening: a speck is pushed in to a big diamond, then settles back to a dot. */
export const OpeningDiamond: React.FC = () => {
  const f = useT();
  const zoom = interpolate(f, [0, 3.0, 4.6], [0.05, 1, 0.14], {...clamp, easing: ease});
  const y = interpolate(f, [3.0, 4.6], [60, -250], {...clamp, easing: ease});
  const o = interpolate(f, [4.6, 5.4], [1, 0], clamp);
  if (f > 5.5) return null;
  return <div style={{position: 'absolute', left: 960 - 270, top: 540 - 270 + y, width: 540, height: 540, borderRadius: 34, background: COLORS.accent, transform: `rotate(45deg) scale(${zoom})`, opacity: o, boxShadow: '0 18px 40px rgba(26,26,26,.18)'}} />;
};

/** The dot returns near the end ("هالنقطة اللي شفناها في البداية"). */
export const ReturnDiamond: React.FC = () => {
  const f = useT();
  const a = T[316].s - 0.1;
  const b = T[330].s + 0.3;
  if (f < a || f > b) return null;
  const p = interpolate(f, [a, a + 0.9], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.8))});
  const o = interpolate(f, [b - 0.5, b], [1, 0], clamp);
  const pulse = 1 + Math.sin((f - a) * 3) * 0.03;
  return <div style={{position: 'absolute', left: 960 - 70, top: 215 - 70, width: 140, height: 140, borderRadius: 12, background: COLORS.accent, transform: `rotate(45deg) scale(${p * pulse})`, opacity: o}} />;
};

/** Dotted orange line that links "كيف" to "ليش". */
export const Connector: React.FC = () => {
  const f = useT();
  const a = T[112].s, b = T[116].s + 0.3, out = T[122].e + 0.8;
  if (f < a || f > out) return null;
  const p = interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [out - 0.5, out], [1, 0], clamp);
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: o}}>
      <path d="M1380 760 C 1150 930, 760 930, 540 760" fill="none" stroke={COLORS.accent} strokeWidth={6} strokeLinecap="round" strokeDasharray="1 16" pathLength={1000} style={{strokeDasharray: '2 16'}} clipPath="url(#cn)" />
      <clipPath id="cn"><rect x={1920 - 1920 * p} y={0} width={1920 * p} height={1080} /></clipPath>
      <rect x={1380 - 14} y={760 - 14} width={28} height={28} fill={COLORS.accent} transform={`rotate(45 1380 760)`} opacity={p > 0.02 ? 1 : 0} />
    </svg>
  );
};

/** A long dotted path that "flies" along the bottom while the aspirations are listed. */
export const FlightPath: React.FC = () => {
  const f = useT();
  const a = T[245].s, b = T[299].e + 0.4;
  if (f < a - 0.2 || f > b + 0.8) return null;
  const p = interpolate(f, [a, b], [0, 1], clamp);
  const o = interpolate(f, [b, b + 0.8], [1, 0], clamp) * interpolate(f, [a - 0.2, a + 0.4], [0, 1], clamp);
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: o}}>
      <clipPath id="fp"><rect x={1920 - 1920 * p} y={0} width={1920 * p + 2} height={1080} /></clipPath>
      <path d="M2020 840 C 1700 740, 1500 940, 1160 840 S 640 740, 380 860 S -60 900 -120 820" fill="none" stroke={COLORS.ink} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 14" clipPath="url(#fp)" />
    </svg>
  );
};

/** Big faint question mark behind the three questions. */
export const QuestionMark: React.FC = () => {
  const f = useT();
  const a = T[161].s - 0.1, b = T[182].e + 0.5;
  if (f < a || f > b) return null;
  const p = interpolate(f, [a, a + 1.0], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [b - 0.5, b], [1, 0], clamp);
  return <div style={{position: 'absolute', left: 120, top: 40, fontFamily: AR_FONT, fontWeight: 800, fontSize: 520, color: COLORS.accent, opacity: 0.12 * p * o, transform: `rotate(-8deg) scale(${0.9 + 0.1 * p})`, lineHeight: 1}}>؟</div>;
};

const TORN = 'polygon(0 0,100% 0,100% 94%,97% 97%,93% 94%,89% 98%,84% 95%,79% 98%,73% 94%,68% 98%,62% 95%,57% 98%,51% 94%,45% 98%,40% 95%,34% 98%,28% 94%,22% 98%,17% 95%,11% 98%,6% 94%,0 97%)';

/** Typewriter scene: a torn sheet rolls out and the three lines are typed on it. */
export const TypewriterScene: React.FC = () => {
  const f = useT();
  const a = T[213].s - 0.5, b = T[220].e + 1.0;
  if (f < a || f > b + 0.5) return null;
  const p = interpolate(f, [a, a + 0.9], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [b - 0.5, b], [1, 0], clamp);
  const lines = [
    {from: 213, to: 214, accentIdx: 214},
    {from: 215, to: 217, accentIdx: 217},
    {from: 218, to: 220, accentIdx: 220},
  ];
  const Type = ({from, to, accentIdx}: {from: number; to: number; accentIdx: number}) => {
    const toks = T.slice(from, to + 1);
    return (
      <div dir="rtl" style={{fontFamily: AR_FONT, fontWeight: 700, fontSize: 76, lineHeight: 1.5, whiteSpace: 'nowrap', textAlign: 'right'}}>
        {toks.map((tk) => {
          const txt = clean(tk.t);
          const n = Math.round(interpolate(f, [tk.s, tk.e], [0, txt.length], clamp));
          const shown = txt.slice(0, n);
          const showCursor = f >= tk.s && f <= tk.e;
          return (
            <span key={tk.i} style={{margin: '0 14px', color: tk.i === accentIdx ? COLORS.accent : COLORS.ink}}>
              {shown}
              {showCursor && <span style={{display: 'inline-block', width: 4, height: 62, background: COLORS.ink, marginRight: 6, verticalAlign: 'middle'}} />}
            </span>
          );
        })}
      </div>
    );
  };
  return (
    <div style={{position: 'absolute', inset: 0, opacity: o}}>
      <div style={{position: 'absolute', left: 960 - 520, top: 50 - (1 - p) * 300, width: 1040, height: 500, background: '#FBF7EE', clipPath: TORN, boxShadow: '0 20px 40px rgba(0,0,0,.2)', transform: 'rotate(-1.5deg)', padding: '70px 90px', boxSizing: 'border-box'}}>
        {lines.map((l) => (
          <Type key={l.from} {...l} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 960 - 260, top: 600 + (1 - p) * 300, width: 520, height: 300, opacity: p}}>
        {React.createElement(SVG_ART.typewriter)}
      </div>
    </div>
  );
};

/** Collage board: crumpled sheet, three printed frames thrown on one after another. */
export const CollageBoard: React.FC = () => {
  const f = useT();
  const a = T[305].s - 0.5, b = T[315].e + 0.55;
  if (f < a || f > b + 0.5) return null;
  const p = interpolate(f, [a, a + 0.8], [0, 1], {...clamp, easing: ease});
  const o = interpolate(f, [b - 0.6, b], [1, 0], clamp);
  const frames = [
    {at: 305, x: 560, rot: -5, no: '#01', cap: 'وجه', img: 'mic'},
    {at: 308, x: 960, rot: 3, no: '#02', cap: 'تجربة', img: 'camera'},
    {at: 311, x: 1360, rot: -3, no: '#03', cap: 'فكرة', svg: 'sprout'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: o}}>
      <svg width={1560} height={620} style={{position: 'absolute', left: 180, top: 300 + (1 - p) * 200, opacity: p, filter: 'drop-shadow(0 16px 24px rgba(0,0,0,.2))'}}>
        <filter id="crumple" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="4" seed="7" result="n" />
          <feDiffuseLighting in="n" lightingColor="#EFE6D2" surfaceScale="2.6" result="l"><feDistantLight azimuth="45" elevation="62" /></feDiffuseLighting>
        </filter>
        <rect width="1560" height="620" filter="url(#crumple)" />
      </svg>
      {frames.map((fr) => {
        const s = T[fr.at].s - 0.1;
        const q = interpolate(f, [s, s + 0.7], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.5))});
        const Svg = fr.svg ? SVG_ART[fr.svg] : null;
        return (
          <div key={fr.at} style={{position: 'absolute', left: fr.x - 190, top: 390, width: 380, height: 460, background: '#fff', padding: '20px 20px 0', boxSizing: 'border-box', boxShadow: '0 14px 26px rgba(0,0,0,.25)', transform: `translateY(${(1 - q) * -900}px) rotate(${fr.rot + (1 - q) * -25}deg)`, opacity: Math.min(q * 3, 1)}}>
            <div style={{width: '100%', height: 320, overflow: 'hidden', background: COLORS.paper, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {fr.img ? <Img src={staticFile(`art/${fr.img}.png`)} style={{height: '100%', transform: 'scale(1.35)'}} /> : Svg ? <div style={{width: 280, height: 280}}><Svg /></div> : null}
              <div style={{position: 'absolute'}} />
            </div>
            <div dir="rtl" style={{fontFamily: AR_FONT, fontWeight: 700, fontSize: 40, textAlign: 'center', marginTop: 22, color: COLORS.ink}}><span dir="ltr" style={{unicodeBidi: 'isolate', marginLeft: 12, color: COLORS.accent}}>{fr.no}</span>{fr.cap}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Final line: "والحكاية" small, then the big orange "توّها تبدأ" with a horizontal motion blur. */
export const Closing: React.FC = () => {
  const f = useT();
  const a = T[338].s - 0.1;
  if (f < a) return null;
  const p1 = interpolate(f, [a, a + 0.4], [0, 1], {...clamp, easing: ease});
  const s2 = T[339].s - 0.15;
  const p2 = interpolate(f, [s2, s2 + 0.7], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'translateY(90px)'}}>
      <div dir="rtl" style={{fontFamily: AR_FONT, fontWeight: 800, fontSize: 96, color: COLORS.ink, opacity: p1, transform: `translateY(${(1 - p1) * 16}px)`}}>والحكاية</div>
      <div dir="rtl" style={{fontFamily: AR_FONT, fontWeight: 800, fontSize: 250, color: COLORS.accent, lineHeight: 1.1, opacity: p2, transform: `translateX(${(1 - p2) * -700}px)`, filter: `blur(${(1 - p2) * 46}px)`, whiteSpace: 'nowrap'}}>توّها تبدأ</div>
    </div>
  );
};

/* -------------------------------------------------------------- timeline */

export const Timeline: React.FC<{stages: {label: string; at: number}[]}> = ({stages}) => {
  const f = useT();
  const left = 160, right = 1760, y = 985;
  const lp = interpolate(f, [0.8, 2.4], [0, 1], {...clamp, easing: ease});
  const fade = interpolate(f, [END + 0.2, END + 1.2], [1, 0], clamp);
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity: fade}}>
      <line x1={right} y1={y} x2={right - (right - left) * lp} y2={y} stroke={COLORS.ink} strokeWidth={2.5} strokeDasharray="2 10" strokeLinecap="round" opacity={0.5} />
      {stages.map((s, i) => {
        const x = right - ((right - left) * (i + 1)) / stages.length;
        const p = interpolate(f, [T[s.at].s, T[s.at].s + 0.5], [0, 1], {...clamp, easing: Easing.out(Easing.back(2.2))});
        return (
          <g key={i} opacity={Math.min(p * 2, 1)}>
            <rect x={x - 12 * p} y={y - 12 * p} width={24 * p} height={24 * p} fill={COLORS.accent} transform={`rotate(45 ${x} ${y})`} />
            <text x={x} y={y - 30} textAnchor="middle" fontFamily={AR_FONT} fontWeight={700} fontSize={30} fill={COLORS.ink}>{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ----------------------------------------------------------- transitions */

const STRIP = 'polygon(3% 0,0 6%,4% 12%,1% 19%,5% 26%,0 33%,4% 40%,1% 47%,5% 54%,0 61%,4% 68%,1% 75%,5% 82%,0 89%,3% 100%,96% 100%,100% 94%,95% 87%,99% 80%,96% 73%,100% 66%,95% 59%,99% 52%,96% 45%,100% 38%,95% 31%,99% 24%,96% 17%,100% 10%,97% 0)';

/** A torn paper strip that sweeps across the frame right-to-left while the scene underneath changes. */
export const PaperSweep: React.FC<{at: number}> = ({at}) => {
  const f = useT();
  const mid = T[at].s - 0.2;
  const a = mid - 0.45, b = mid + 0.45;
  if (f < a || f > b) return null;
  const w = 520;
  const p = interpolate(f, [a, b], [0, 1], {...clamp, easing: Easing.bezier(0.55, 0, 0.35, 1)});
  const x = 1920 + 60 - p * (1920 + w + 140);
  return (
    <div style={{position: 'absolute', left: x, top: -40, width: w, height: 1160, transform: 'rotate(3deg)', filter: 'drop-shadow(-14px 0 22px rgba(26,26,26,.22))'}}>
      <div style={{width: '100%', height: '100%', clipPath: STRIP, background: 'linear-gradient(90deg,#F8F1E1,#EFE4CE 60%,#F4EBD8)'}}>
        <div style={{position: 'absolute', left: '46%', top: '45%', width: 36, height: 36, background: COLORS.accent, transform: 'rotate(45deg)'}} />
      </div>
    </div>
  );
};
