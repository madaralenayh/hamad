import {continueRender, delayRender, staticFile} from 'remotion';

export const COLORS = {
  paper: '#F3EADB',
  ink: '#1A1A1A',
  accent: '#F04A23',
  blue: '#8FA3B5',
  grey: '#9A948A',
};

// Brand fonts: Thmanyah Sans (Arabic) and Thmanyah Serif Display (Latin).
export const AR_FONT = 'FathArabic';
export const EN_FONT = 'FathSerif';

const faces: [string, string, string][] = [
  [AR_FONT, 'fonts/thmanyahsans-Black.woff2', '800'],
  [AR_FONT, 'fonts/thmanyahsans-Bold.woff2', '700'],
  [EN_FONT, 'fonts/thmanyahserifdisplay-Black.woff2', '900'],
];

const handle = delayRender('fonts');
Promise.all(
  faces.map(async ([family, file, weight]) => {
    const f = new FontFace(family, `url(${staticFile(file)})`, {weight});
    await f.load();
    document.fonts.add(f);
  }),
)
  .catch((e) => console.error('font load failed', e))
  .finally(() => continueRender(handle));
