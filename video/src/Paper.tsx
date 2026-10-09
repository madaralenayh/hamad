import React from 'react';
import {COLORS} from './theme';

/** Cream paper with a very light grain, constant for the whole video. */
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
