import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {COLORS} from './theme';
import {Label, Line, Page, Paper, Timeline} from './parts';

export const TOTAL_SECONDS = 30;

const Dot: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const f = frame / fps;
  // Slow push-in on a tiny speck, then it settles back into a "dot" on the page.
  const zoom = interpolate(f, [0, 3.2, 4.4], [0.06, 1, 0.16], {extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.2, 1)});
  const y = interpolate(f, [3.2, 4.4], [0, -260], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const o = interpolate(f, [4.2, 5], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', width: 560, height: 560, marginLeft: -280, marginTop: -280 + y, borderRadius: 40, background: COLORS.accent, transform: `rotate(45deg) scale(${zoom})`, opacity: o, boxShadow: '0 18px 40px rgba(26,26,26,.18)'}} />
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill>
    <Paper />
    <Dot />

    <Page from={0.4} to={4.6}>
      <div style={{position: 'absolute', top: 150}}>
        <Line from={0.5} to={3.8} size={92} words={[{t: 'قرّب'}, {t: 'الصورة'}, {t: 'شوي…'}, {t: 'تشوف'}, {t: 'هالنقطة؟', accent: true}]} />
      </div>
    </Page>

    <Page from={4.8} to={9.2}>
      <Line from={5} to={8.4} words={[{t: 'صغيرة…'}, {t: 'لكن'}, {t: 'مكانها'}, {t: 'يغيّر'}, {t: 'حرف.', accent: true}]} />
    </Page>

    <Page from={9.4} to={13}>
      <Line from={9.6} to={12.2} words={[{t: 'والحرف'}, {t: 'يغيّر'}, {t: 'كلمة.', accent: true}]} />
    </Page>

    <Page from={13.2} to={19}>
      <div>
        <Line from={13.4} to={16.8} size={104} words={[{t: 'والكلمة…'}, {t: 'ممكن'}, {t: 'تغيّر'}, {t: 'الطريقة'}]} />
        <Line from={16.8} to={18.4} size={104} words={[{t: 'اللي'}, {t: 'نشوف'}, {t: 'فيها'}, {t: 'حكاية', accent: true}, {t: 'كاملة'}]} />
      </div>
    </Page>

    <Page from={19.2} to={23.2}>
      <Line from={19.5} to={21} size={150} words={[{t: 'وهذي'}, {t: 'حكايتنا.', accent: true, kashida: {after: 3, count: 14}, circle: true}]} />
    </Page>

    <Page from={23.4} to={30}>
      <div style={{position: 'relative'}}>
        <Line from={23.6} to={25.2} size={118} words={[{t: 'بدأت'}, {t: 'من'}, {t: 'فضول.', accent: true, kashida: {after: 2, count: 10}}]} />
        <Line from={25.4} to={28.6} size={84} words={[{t: 'من'}, {t: 'سؤال'}, {t: 'وقفنا'}, {t: 'عنده'}, {t: 'وقلنا:'}, {t: 'أكيد', strike: false}, {t: 'فيه'}, {t: 'شيء'}, {t: 'يستحق'}]} />
        <Label text="السؤال" at={24.4} style={{top: -60, right: 120}} />
      </div>
    </Page>

    <Timeline total={TOTAL_SECONDS} stages={[{label: 'سؤال', at: 26.5}, {label: 'تجربة', at: 999}, {label: 'معرفة', at: 999}, {label: 'أثر', at: 999}]} />
  </AbsoluteFill>
);
