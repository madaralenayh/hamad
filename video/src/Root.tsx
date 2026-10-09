import React from 'react';
import {Composition} from 'remotion';
import {Main, TOTAL_SECONDS} from './Main';

export const FPS = 30;

export const Root: React.FC = () => (
  <Composition
    id="Main"
    component={Main}
    durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
