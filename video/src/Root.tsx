import React from 'react';
import {Composition} from 'remotion';
import {Main, TOTAL_SECONDS} from './Main';
import {ArtSheet} from './ArtSheet';

export const FPS = 30;

export const Root: React.FC = () => (
  <>
  <Composition id="ArtSheet" component={ArtSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} />
  <Composition
    id="Main"
    component={Main}
    durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
    fps={FPS}
    width={1920}
    height={1080}
  />
  </>
);
