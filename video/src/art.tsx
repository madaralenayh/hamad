import React from 'react';
import {COLORS} from './theme';

const INK = COLORS.ink;
const BLUE = COLORS.blue;

/** Shared hatching pattern used by every hand-drawn engraving below. */
const Defs: React.FC<{id: string}> = ({id}) => (
  <defs>
    <pattern id={`h-${id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
      <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="1.1" />
    </pattern>
    <pattern id={`h2-${id}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
      <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.8" />
    </pattern>
  </defs>
);

const S: React.SVGProps<SVGSVGElement> = {viewBox: '0 0 300 300', width: '100%', height: '100%', overflow: 'visible'};
const line = {fill: 'none', stroke: INK, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;

export const Globe: React.FC = () => (
  <svg {...S}>
    <Defs id="g" />
    <ellipse cx="150" cy="268" rx="90" ry="10" fill={INK} opacity={0.12} />
    <circle cx="150" cy="130" r="92" fill={BLUE} opacity={0.55} />
    <path d="M150 38 A92 92 0 0 1 150 222 A70 92 0 0 0 150 38Z" fill="url(#h-g)" opacity={0.55} />
    <circle cx="150" cy="130" r="92" {...line} />
    <ellipse cx="150" cy="130" rx="40" ry="92" {...line} strokeWidth={2} />
    <ellipse cx="150" cy="130" rx="76" ry="92" {...line} strokeWidth={1.6} />
    <path d="M60 100 Q150 120 240 100 M58 160 Q150 180 242 160" {...line} strokeWidth={1.8} />
    <path d="M60 130 H240" {...line} strokeWidth={2.4} />
    <path d="M78 205 Q150 262 222 205" {...line} />
    <path d="M150 222 V256 M110 262 H190 M118 268 H182" {...line} />
    <path d="M104 80 q14 -12 30 -4 q6 20 -10 26 q-16 4 -20 -22z M170 140 q22 -8 34 8 q-6 22 -26 20 q-14 -12 -8 -28z" fill="url(#h2-g)" stroke={INK} strokeWidth={1.8} />
  </svg>
);

export const Bulb: React.FC = () => (
  <svg {...S}>
    <Defs id="b" />
    <ellipse cx="150" cy="276" rx="60" ry="8" fill={INK} opacity={0.12} />
    <path d="M150 28 C 92 28 60 72 66 120 C 70 150 94 166 100 190 L 200 190 C 206 166 230 150 234 120 C 240 72 208 28 150 28Z" fill={BLUE} opacity={0.5} />
    <path d="M150 28 C 92 28 60 72 66 120 C 70 150 94 166 100 190 L 200 190 C 206 166 230 150 234 120 C 240 72 208 28 150 28Z" {...line} />
    <path d="M190 40 C 222 60 230 100 218 138 L 200 190 L 214 150 C 232 110 220 64 190 40Z" fill="url(#h-b)" opacity={0.6} />
    <path d="M130 190 V152 C130 108 170 108 170 152 V190" {...line} stroke={COLORS.accent} /><circle cx="150" cy="121" r="4" fill={COLORS.accent} />
    <path d="M104 208 H196 M108 224 H192 M112 240 H188" {...line} />
    <path d="M122 240 Q150 270 178 240" {...line} />
    <path d="M150 6 V-16 M60 30 L40 12 M240 30 L260 12 M26 110 H4 M274 110 H296" {...line} stroke={COLORS.accent} strokeWidth={4} />
  </svg>
);

export const Sprout: React.FC = () => (
  <svg {...S}>
    <Defs id="s" />
    <ellipse cx="150" cy="262" rx="100" ry="12" fill={INK} opacity={0.12} />
    <path d="M60 250 Q70 214 150 208 Q230 214 240 250 Z" fill={BLUE} opacity={0.55} />
    <path d="M60 250 Q70 214 150 208 Q230 214 240 250 Z" {...line} />
    <path d="M70 246 Q150 232 232 246 M90 232 Q150 224 208 232" fill="url(#h-s)" stroke={INK} strokeWidth={1.4} />
    <path d="M150 210 C 148 170 152 140 150 100" {...line} strokeWidth={4} />
    <path d="M150 128 C 110 128 84 100 90 62 C 130 60 152 90 150 128Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={3} />
    <path d="M150 112 C 190 112 216 84 210 46 C 170 44 148 74 150 112Z" fill="#fff" opacity={0.0} stroke={INK} strokeWidth={3} />
    <path d="M150 112 C 190 112 216 84 210 46 C 170 44 148 74 150 112Z" fill="url(#h-s)" opacity={0.7} />
    <path d="M150 124 C 130 108 108 88 96 68" {...line} strokeWidth={1.8} />
  </svg>
);

export const Scales: React.FC = () => (
  <svg {...S}>
    <Defs id="c" />
    <ellipse cx="150" cy="276" rx="80" ry="8" fill={INK} opacity={0.12} />
    <path d="M150 40 V262 M110 270 H190 M122 262 H178" {...line} strokeWidth={4} />
    <circle cx="150" cy="38" r="10" fill={COLORS.accent} stroke={INK} strokeWidth={3} />
    <path d="M44 74 Q150 56 256 74" {...line} strokeWidth={4} />
    <path d="M44 74 L22 168 M44 74 L66 168 M256 74 L234 168 M256 74 L278 168" {...line} strokeWidth={1.8} />
    <path d="M14 168 Q44 206 74 168 Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={3} />
    <path d="M226 128 Q256 166 286 128 Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={3} transform="translate(0,0)" />
    <path d="M256 74 L240 128 M256 74 L272 128" {...line} strokeWidth={1.8} />
    <path d="M24 176 Q44 196 66 176" fill="url(#h-c)" stroke="none" opacity={0.6} />
  </svg>
);

export const Books: React.FC = () => (
  <svg {...S}>
    <Defs id="k" />
    <ellipse cx="150" cy="272" rx="110" ry="9" fill={INK} opacity={0.12} />
    <rect x="46" y="206" width="212" height="52" rx="4" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={3} />
    <path d="M62 206 V258 M72 206 V258 M232 206 V258" {...line} strokeWidth={2} />
    <rect x="70" y="156" width="190" height="48" rx="4" fill="#fff" opacity={0.0} stroke={INK} strokeWidth={3} />
    <rect x="70" y="156" width="190" height="48" rx="4" fill={BLUE} opacity={0.35} /><rect x="70" y="156" width="190" height="48" rx="4" fill="url(#h-k)" opacity={0.5} />
    <path d="M86 156 V204 M96 156 V204" {...line} strokeWidth={2} />
    <rect x="52" y="112" width="200" height="42" rx="4" fill={BLUE} opacity={0.5} stroke={INK} strokeWidth={3} />
    <path d="M70 112 V154 M214 112 V154 M224 112 V154" {...line} strokeWidth={2} />
    <path d="M60 104 Q150 68 240 104 L240 96 Q150 60 60 96 Z" fill="#fff" opacity={0.0} stroke={INK} strokeWidth={3} />
    <path d="M60 104 Q104 78 150 100 Q196 78 240 104 V94 Q196 66 150 88 Q104 66 60 94Z" fill={COLORS.paper} stroke={INK} strokeWidth={3} />
    <path d="M150 88 V100" {...line} strokeWidth={2} />
  </svg>
);

export const Typewriter: React.FC = () => (
  <svg viewBox="0 0 520 300" width="100%" height="100%" overflow="visible">
    <Defs id="t" />
    <ellipse cx="260" cy="286" rx="220" ry="10" fill={INK} opacity={0.14} />
    <path d="M70 160 L110 110 H410 L450 160 V250 H70Z" fill={BLUE} opacity={0.55} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M70 160 L110 110 H410 L450 160 V250 H70Z" fill="url(#h-t)" opacity={0.25} />
    <rect x="130" y="76" width="260" height="34" rx="6" fill={COLORS.paper} stroke={INK} strokeWidth={4} />
    <rect x="96" y="250" width="328" height="22" rx="8" fill={INK} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <circle key={`a${i}`} cx={118 + i * 38} cy={188} r={13} fill={COLORS.paper} stroke={INK} strokeWidth={3} />
    ))}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <circle key={`b${i}`} cx={138 + i * 38} cy={222} r={13} fill={COLORS.paper} stroke={INK} strokeWidth={3} />
    ))}
    <path d="M70 132 H92 M428 132 H450" {...line} />
    <circle cx="60" cy="96" r="18" fill="none" stroke={INK} strokeWidth={4} />
    <circle cx="460" cy="96" r="18" fill="none" stroke={INK} strokeWidth={4} />
  </svg>
);

export const SVG_ART: Record<string, React.FC> = {globe: Globe, bulb: Bulb, sprout: Sprout, scales: Scales, books: Books, typewriter: Typewriter};
