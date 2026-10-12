// Lists the photos in public/photos so scenes can use them (run: npm run photos).
import {readdirSync, writeFileSync} from 'node:fs';
const names = readdirSync(new URL('../public/photos/', import.meta.url))
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .map((f) => f.replace(/\.(jpe?g|png|webp)$/i, ''));
const files = Object.fromEntries(
  readdirSync(new URL('../public/photos/', import.meta.url))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => [f.replace(/\.(jpe?g|png|webp)$/i, ''), f]),
);
writeFileSync(new URL('../src/photos.json', import.meta.url), JSON.stringify(files, null, 2) + '\n');
console.log('photos:', names.join(', ') || '(none)');
