import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Paper} from './Paper';
import {SVG_ART} from './art';

/** Contact sheet of every hand-drawn illustration (render with `remotion still ... ArtSheet`). */
export const ArtSheet: React.FC = () => {
  const names = Object.keys(SVG_ART);
  return (
    <AbsoluteFill>
      <Paper />
      <div style={{position: 'absolute', inset: 30, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10}}>
        {names.map((n) => {
          const A = SVG_ART[n];
          return (
            <div key={n} style={{height: 330, position: 'relative'}}>
              <A />
              <div style={{position: 'absolute', bottom: 0, left: 0, font: '20px monospace'}}>{n}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
