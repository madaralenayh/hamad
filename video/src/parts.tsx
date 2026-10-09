import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {AR_FONT, COLORS, EN_FONT} from './theme';

const ease = Easing.bezier(0.45, 0, 0.2, 1);

/** Cream paper + very light grain, fixed for the whole video. */
export const Paper: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: COLORS.paper}}>
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.16, mixBlendMode: 'multiply'}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
        <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.9 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

/** Fade + 14px rise + blur-clear, starting at `at` seconds. */
export const useReveal = (at: number, dur = 0.3) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  return {opacity: p, transform: `translateY(${(1 - p) * 14}px)`, filter: `blur(${(1 - p) * 6}px)`};
};

export type W = {t: string; accent?: boolean; kashida?: {after: number; count: number}; circle?: boolean; strike?: boolean};

const withKashida = (text: string, after: number, n: number) =>
  text.slice(0, after) + 'ـ'.repeat(n) + text.slice(after);

/** One word. `at` = absolute second when it appears. Kashida stretches after it appears. */
export const Word: React.FC<{w: W; at: number}> = ({w, at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const style = useReveal(at);
  let text = w.t;
  if (w.kashida) {
    const p = interpolate(frame, [(at + 0.1) * fps, (at + 1.1) * fps], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: ease,
    });
    text = withKashida(w.t, w.kashida.after, Math.round(p * w.kashida.count));
  }
  const circleP = interpolate(frame, [(at + 0.6) * fps, (at + 1.4) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const strikeP = interpolate(frame, [(at + 0.6) * fps, (at + 1.0) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <span style={{position: 'relative', display: 'inline-block', margin: '0 18px', color: w.accent ? COLORS.accent : COLORS.ink, ...style}}>
      {text}
      {w.circle && (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={{position: 'absolute', left: -30, top: -22, width: 'calc(100% + 60px)', height: 'calc(100% + 40px)', overflow: 'visible'}}>
          <path
            d="M150 8 C 60 6, 8 30, 12 62 C 16 100, 110 114, 170 110 C 250 104, 296 80, 290 46 C 284 14, 200 4, 120 14"
            fill="none" stroke={COLORS.accent} strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circleP}
          />
        </svg>
      )}
      {w.strike && (
        <span style={{position: 'absolute', left: -8, top: '54%', height: 6, background: COLORS.accent, width: `calc(${strikeP * 100}% + 16px)`, right: 'auto'}} />
      )}
    </span>
  );
};

/** A line of words, spread evenly between `from` and `to` seconds. */
export const Line: React.FC<{words: W[]; from: number; to: number; size?: number; fontFamily?: string}> = ({words, from, to, size = 116, fontFamily = AR_FONT}) => {
  const step = (to - from) / Math.max(words.length, 1);
  return (
    <div dir="rtl" style={{fontFamily, fontWeight: 800, fontSize: size, lineHeight: 1.35, textAlign: 'center', whiteSpace: 'nowrap'}}>
      {words.map((w, i) => (
        <Word key={i} w={w} at={from + i * step} />
      ))}
    </div>
  );
};

/** Black label with small white text, pops above/below a word. */
export const Label: React.FC<{text: string; at: number; style?: React.CSSProperties; en?: boolean}> = ({text, at, style, en}) => {
  const s = useReveal(at, 0.25);
  return (
    <div style={{position: 'absolute', background: COLORS.ink, color: '#fff', padding: '8px 22px', fontFamily: en ? EN_FONT : AR_FONT, fontWeight: en ? 900 : 700, fontSize: 34, letterSpacing: en ? 4 : 0, ...style, ...s}}>
      {text}
    </div>
  );
};

/** Wrapper that fades a page in/out between two absolute seconds. */
export const Page: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const f = frame / fps;
  if (f < from - 0.05 || f > to + 0.05) return null;
  const o = interpolate(f, [from, from + 0.01, to - 0.35, to], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const slide = interpolate(f, [to - 0.35, to], [0, -24], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: o, transform: `translateY(${slide}px)`}}>
      {children}
    </div>
  );
};

/** Dotted timeline along the bottom; dots fill in as stages complete. */
export const Timeline: React.FC<{stages: {label: string; at: number}[]; total: number}> = ({stages, total}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const f = frame / fps;
  const left = 160, right = 1760, y = 960;
  const lineP = interpolate(f, [0.5, 2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <line x1={right} y1={y} x2={right - (right - left) * lineP} y2={y} stroke={COLORS.ink} strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" opacity={0.55} />
      {stages.map((s, i) => {
        const x = right - ((right - left) * (i + 1)) / (stages.length);
        const p = interpolate(f, [s.at, s.at + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2))});
        return (
          <g key={i} opacity={p}>
            <circle cx={x} cy={y} r={14 * p} fill={COLORS.accent} />
            <text x={x} y={y + 52} textAnchor="middle" fontFamily={AR_FONT} fontWeight={700} fontSize={30} fill={COLORS.ink}>{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
};
