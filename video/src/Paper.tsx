import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './theme';

/** Cream paper with a very light grain that flickers slightly, plus a few soft clouds drifting by. */
export const Paper: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const seed = Math.floor(frame / 3) % 12;
  const t = frame / fps;
  const clouds = [
    {y: 90, w: 520, h: 120, v: 14, o: 0.38, x0: 200},
    {y: 700, w: 640, h: 140, v: 9, o: 0.3, x0: 1300},
    {y: 380, w: 420, h: 90, v: 20, o: 0.22, x0: 800},
    {y: 850, w: 380, h: 80, v: 26, o: 0.2, x0: 100},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: COLORS.paper}}>
      {clouds.map((c, i) => {
        const x = ((c.x0 - t * c.v) % (width + c.w * 2)) - c.w;
        return <div key={i} style={{position: 'absolute', left: x < -c.w ? x + width + c.w * 2 : x, top: c.y, width: c.w, height: c.h, borderRadius: '50%', background: '#fff', opacity: c.o, filter: 'blur(38px)'}} />;
      })}
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.16, mixBlendMode: 'multiply'}}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};
