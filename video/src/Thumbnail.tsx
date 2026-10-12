import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Paper} from './Paper';
import {AR_FONT, COLORS} from './theme';

/** Static cover / thumbnail frame (render with `remotion still ... Thumbnail`). */
export const Thumbnail: React.FC = () => {
  const w = 1080;
  return (
    <AbsoluteFill>
      <Paper />
      <div style={{position: 'absolute', left: 960 - w / 2, top: 200, width: w}}>
        <Img src={staticFile('logo.svg')} style={{width: '100%', mixBlendMode: 'multiply'}} />
        <div style={{position: 'absolute', left: '82.1%', top: '23.1%', width: w * 0.047, height: w * 0.047, background: COLORS.accent, transform: 'translate(-50%,-50%) rotate(45deg)'}} />
      </div>
      <div dir="rtl" style={{position: 'absolute', left: 0, right: 0, top: 750, textAlign: 'center', fontFamily: AR_FONT, fontWeight: 800, fontSize: 120, color: COLORS.ink}}>
        من سؤال… إلى <span style={{color: COLORS.accent}}>أثر</span>
      </div>
      <div style={{position: 'absolute', left: 120, right: 120, top: 60, height: 6, background: COLORS.accent, opacity: 0.0}} />
    </AbsoluteFill>
  );
};
