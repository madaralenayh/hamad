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

/* ---- medical / cosmetic engravings (hand drawn, same language as above) ---- */

export const Tooth: React.FC = () => (
  <svg {...S}>
    <Defs id="th" />
    <ellipse cx="150" cy="274" rx="84" ry="9" fill={INK} opacity={0.12} />
    <path d="M92 70 C 112 50 136 66 150 66 C 164 66 188 50 208 70 C 232 96 220 140 212 176 C 206 212 202 252 182 252 C 164 252 164 200 150 200 C 136 200 136 252 118 252 C 98 252 94 212 88 176 C 80 140 68 96 92 70Z" fill="#fff" fillOpacity={0.55} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M200 76 C 222 100 212 142 204 178 C 200 206 196 236 184 246 C 192 214 200 160 200 76Z" fill={BLUE} opacity={0.55} />
    <path d="M200 76 C 222 100 212 142 204 178 C 200 206 196 236 184 246 C 192 214 200 160 200 76Z" fill="url(#h-th)" opacity={0.6} />
    <path d="M104 90 C 112 80 124 80 134 88" {...line} strokeWidth={2.5} />
    <path d="M60 60 l10 -10 m-10 0 l10 10 M236 44 l8 -8 m-8 0 l8 8" {...line} stroke={COLORS.accent} strokeWidth={4} />
  </svg>
);

export const Syringe: React.FC = () => (
  <svg {...S}>
    <Defs id="sy" />
    <ellipse cx="150" cy="276" rx="110" ry="8" fill={INK} opacity={0.1} />
    <g transform="rotate(-35 150 150)">
      <rect x="64" y="128" width="150" height="44" rx="6" fill="#fff" fillOpacity={0.6} stroke={INK} strokeWidth={4} />
      <rect x="120" y="128" width="94" height="44" rx="6" fill={BLUE} opacity={0.55} />
      <rect x="120" y="128" width="94" height="44" rx="6" fill="url(#h-sy)" opacity={0.45} />
      <path d="M76 128 V172 M92 128 V150 M108 128 V150" {...line} strokeWidth={2} />
      <path d="M214 140 H246 V160 H214 M246 150 H286" {...line} strokeWidth={3} />
      <path d="M286 150 L300 150" {...line} strokeWidth={2} />
      <path d="M64 120 V180 M40 120 V180 M40 150 H64" {...line} strokeWidth={4} />
      <path d="M40 112 H20 V188 H40" {...line} strokeWidth={4} />
    </g>
    <circle cx="260" cy="224" r="7" fill={COLORS.accent} opacity={0.9} />
    <circle cx="244" cy="246" r="4" fill={COLORS.accent} opacity={0.7} />
  </svg>
);

export const Scalpel: React.FC = () => (
  <svg {...S}>
    <Defs id="sc" />
    <ellipse cx="150" cy="268" rx="110" ry="8" fill={INK} opacity={0.1} />
    <g transform="rotate(-28 150 150)">
      <path d="M40 142 H150 L210 150 L150 166 H40 Q28 154 40 142Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M40 142 H150 L210 150 L150 166 H40 Q28 154 40 142Z" fill="url(#h-sc)" opacity={0.35} />
      <path d="M150 142 L270 150 L150 158 Z" fill="#fff" fillOpacity={0.8} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M60 150 H130" {...line} strokeWidth={2} />
    </g>
  </svg>
);

export const Microscope: React.FC = () => (
  <svg {...S}>
    <Defs id="mi" />
    <ellipse cx="150" cy="276" rx="92" ry="9" fill={INK} opacity={0.12} />
    <path d="M70 262 H230 V248 H70Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M200 250 C 252 232 252 120 204 84" fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <path d="M200 250 C 252 232 252 120 204 84" fill="none" stroke={BLUE} strokeWidth={8} strokeLinecap="round" opacity={0.7} />
    <g transform="rotate(-24 130 100)">
      <rect x="112" y="30" width="36" height="104" rx="6" fill="#fff" fillOpacity={0.7} stroke={INK} strokeWidth={4} />
      <rect x="112" y="76" width="36" height="58" rx="6" fill="url(#h-mi)" opacity={0.55} />
      <rect x="118" y="130" width="24" height="26" fill={BLUE} stroke={INK} strokeWidth={4} />
    </g>
    <path d="M96 200 H196" {...line} strokeWidth={5} />
    <path d="M110 178 H182" {...line} strokeWidth={3} />
    <circle cx="124" cy="210" r="4" fill={COLORS.accent} />
  </svg>
);

export const Stethoscope: React.FC = () => (
  <svg {...S}>
    <Defs id="st" />
    <ellipse cx="150" cy="278" rx="90" ry="8" fill={INK} opacity={0.1} />
    <path d="M86 36 C 70 36 66 60 66 82 C 66 140 100 164 128 164 C 156 164 190 140 190 82 C 190 60 186 36 170 36" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
    <path d="M86 36 C 70 36 66 60 66 82 C 66 140 100 164 128 164 C 156 164 190 140 190 82 C 190 60 186 36 170 36" fill="none" stroke={BLUE} strokeWidth={4} strokeLinecap="round" />
    <path d="M128 164 V196 C 128 232 150 244 176 244 C 206 244 222 224 222 198" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" />
    <path d="M128 164 V196 C 128 232 150 244 176 244 C 206 244 222 224 222 198" fill="none" stroke={BLUE} strokeWidth={4} strokeLinecap="round" />
    <circle cx="222" cy="182" r="24" fill="#fff" fillOpacity={0.75} stroke={INK} strokeWidth={5} />
    <circle cx="222" cy="182" r="12" fill="url(#h-st)" stroke={INK} strokeWidth={3} />
    <circle cx="86" cy="32" r="9" fill={INK} /><circle cx="170" cy="32" r="9" fill={INK} />
  </svg>
);

export const HandMirror: React.FC = () => (
  <svg {...S}>
    <Defs id="mr" />
    <ellipse cx="150" cy="278" rx="80" ry="8" fill={INK} opacity={0.1} />
    <circle cx="150" cy="116" r="84" fill={BLUE} opacity={0.35} />
    <circle cx="150" cy="116" r="84" fill="none" stroke={INK} strokeWidth={7} />
    <circle cx="150" cy="116" r="72" fill="none" stroke={INK} strokeWidth={2.5} />
    <path d="M96 78 C 112 52 150 44 176 56" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity={0.9} />
    <path d="M110 150 C 124 172 176 172 190 150" fill="url(#h-mr)" opacity={0.0} />
    <path d="M150 200 C 140 214 140 228 146 244 C 150 256 150 262 150 266" fill="none" stroke={INK} strokeWidth={12} strokeLinecap="round" />
    <path d="M150 200 C 140 214 140 228 146 244 C 150 256 150 262 150 266" fill="none" stroke={BLUE} strokeWidth={5} strokeLinecap="round" />
    <ellipse cx="150" cy="270" rx="14" ry="9" fill="#fff" fillOpacity={0.7} stroke={INK} strokeWidth={4} />
    <path d="M232 52 l10 -10 m-10 0 l10 10 M256 84 l7 -7 m-7 0 l7 7" {...line} stroke={COLORS.accent} strokeWidth={4} />
  </svg>
);

export const FaceProfile: React.FC = () => (
  <svg {...S}>
    <Defs id="fp" />
    <ellipse cx="150" cy="282" rx="80" ry="8" fill={INK} opacity={0.12} />
    <path d="M196 270 V214 C 168 208 152 196 154 176 C 140 174 138 166 146 160 C 134 156 136 146 146 142 C 138 136 140 128 150 124 C 140 108 130 82 146 58 C 164 32 206 30 226 52 C 244 72 244 104 238 124 C 234 142 224 152 224 168 C 224 184 238 196 252 206 L 262 270Z" fill="#fff" fillOpacity={0.55} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M226 52 C 244 72 244 104 238 124 C 234 142 224 152 224 168 C 224 184 238 196 252 206 L 262 270 H 226 C 232 240 236 210 228 186 C 224 166 236 144 240 124 C 246 96 244 72 226 52Z" fill={BLUE} opacity={0.55} />
    <path d="M226 52 C 244 72 244 104 238 124 C 234 142 224 152 224 168 C 224 184 238 196 252 206 L 262 270 H 226 C 232 240 236 210 228 186 C 224 166 236 144 240 124 C 246 96 244 72 226 52Z" fill="url(#h-fp)" opacity={0.5} />
    <circle cx="168" cy="100" r="3.5" fill={INK} />
    <path d="M150 90 Q 162 84 176 90" {...line} strokeWidth={3} />
    <path d="M100 200 l-12 -12 m12 0 l-12 12 M82 150 l8 -8 m-8 0 l8 8" {...line} stroke={COLORS.accent} strokeWidth={4} />
  </svg>
);

export const Lamp: React.FC = () => (
  <svg {...S}>
    <Defs id="lp" />
    <ellipse cx="150" cy="286" rx="70" ry="7" fill={INK} opacity={0.1} />
    <path d="M150 0 V40" {...line} strokeWidth={6} />
    <path d="M60 100 C 60 62 104 44 150 44 C 196 44 240 62 240 100 Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <path d="M60 100 C 60 62 104 44 150 44 C 196 44 240 62 240 100 Z" fill="url(#h-lp)" opacity={0.35} />
    <path d="M70 100 H230 L252 120 H48Z" fill="#fff" fillOpacity={0.7} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={88 + i * 31} cy={110} r={5} fill={COLORS.accent} opacity={0.9} />
    ))}
    <path d="M110 128 L72 280 M150 128 V280 M190 128 L228 280" stroke={COLORS.accent} strokeWidth={2.5} strokeDasharray="2 10" strokeLinecap="round" opacity={0.7} />
  </svg>
);

export const Clipboard: React.FC = () => (
  <svg {...S}>
    <Defs id="cb" />
    <ellipse cx="150" cy="280" rx="86" ry="8" fill={INK} opacity={0.1} />
    <rect x="62" y="40" width="176" height="232" rx="10" fill={BLUE} opacity={0.5} stroke={INK} strokeWidth={5} />
    <rect x="80" y="64" width="140" height="190" rx="4" fill="#FBF7EE" stroke={INK} strokeWidth={3} />
    <rect x="112" y="26" width="76" height="34" rx="8" fill="#fff" fillOpacity={0.8} stroke={INK} strokeWidth={5} />
    <path d="M98 100 H202 M98 128 H202 M98 156 H170 M98 184 H190 M98 212 H150" {...line} strokeWidth={3} />
    <path d="M180 214 l10 12 l22 -28" fill="none" stroke={COLORS.accent} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Headphones: React.FC = () => (
  <svg {...S}>
    <Defs id="hp" />
    <ellipse cx="150" cy="276" rx="92" ry="8" fill={INK} opacity={0.1} />
    <path d="M70 170 C 56 70 110 36 150 36 C 190 36 244 70 230 170" fill="none" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    <path d="M70 170 C 56 70 110 36 150 36 C 190 36 244 70 230 170" fill="none" stroke={BLUE} strokeWidth={7} strokeLinecap="round" />
    <rect x="44" y="150" width="58" height="104" rx="24" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={5} />
    <rect x="198" y="150" width="58" height="104" rx="24" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={5} />
    <rect x="44" y="150" width="58" height="104" rx="24" fill="url(#h-hp)" opacity={0.35} />
    <rect x="198" y="150" width="58" height="104" rx="24" fill="url(#h-hp)" opacity={0.35} />
  </svg>
);

export const Newspaper: React.FC = () => (
  <svg {...S}>
    <Defs id="np" />
    <ellipse cx="150" cy="276" rx="104" ry="8" fill={INK} opacity={0.1} />
    <path d="M46 60 L252 48 L262 250 L56 262Z" fill="#FBF7EE" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M70 84 L238 74" {...line} strokeWidth={9} />
    <rect x="74" y="104" width="70" height="56" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={3} transform="rotate(-3 109 132)" />
    <path d="M158 112 L232 108 M158 128 L232 124 M158 144 L214 142 M74 176 L232 170 M74 192 L232 186 M74 208 L232 202 M74 224 L190 220" {...line} strokeWidth={3} />
  </svg>
);

export const Signpost: React.FC = () => (
  <svg {...S}>
    <Defs id="sg" />
    <ellipse cx="150" cy="284" rx="64" ry="7" fill={INK} opacity={0.12} />
    <path d="M150 20 V280" {...line} strokeWidth={9} />
    <path d="M150 38 H230 L252 56 L230 74 H150Z" fill={BLUE} opacity={0.6} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M150 98 H70 L48 116 L70 134 H150Z" fill="#fff" fillOpacity={0.7} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M150 158 H224 L246 176 L224 194 H150Z" fill={BLUE} opacity={0.45} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    <path d="M150 38 H230 L252 56 L230 74 H150Z" fill="url(#h-sg)" opacity={0.35} />
    <path d="M168 56 H222 M80 116 H132 M168 176 H214" {...line} strokeWidth={2.5} stroke={COLORS.accent} />
  </svg>
);

Object.assign(SVG_ART, {tooth: Tooth, syringe: Syringe, scalpel: Scalpel, microscope: Microscope, stethoscope: Stethoscope, mirror: HandMirror, face: FaceProfile, lamp: Lamp, clipboard: Clipboard, headphones: Headphones, newspaper: Newspaper, signpost: Signpost});
