# FTH intro video (Remotion)

16:9 / 1920×1080 / 30 fps motion-graphics video driven by the voice-over.

- `public/voice.mp3` – the voice-over
- `data/script.txt` – the script, one beat per line
- `data/words.json` – per-word timings of the voice-over (ElevenLabs Scribe)
- `src/timing.json` – script tokens aligned to those timings
- `src/Main.tsx` – scene plan: text chunks (`CHUNKS`) and illustrations/photos (`ART`)
- `src/scenes.tsx` – the animation pieces (word reveal, kashida, circles, typewriter, collage…)
- `src/art.tsx` – hand-drawn engraving-style illustrations (`npx remotion still src/index.ts ArtSheet out/art.png` shows them all)

```
npm i
npm run studio                                   # preview
npx remotion render src/index.ts Main out/fath.mp4 --codec=h264 --crf=20
```

## Real photos

Each slot below shows an illustration until a photo with that name exists in `public/photos/`
(`.jpg`, `.png` or `.webp`). The photo then replaces the illustration as a framed print with a slow zoom.
After adding photos run `npm run photos` and render again.

| file name          | appears when the voice says                |
| ------------------ | ------------------------------------------ |
| `patient-portrait` | "نقترب من الإنسان…"                          |
| `doctor`           | "أهل المعرفة"                                |
| `operating-room`   | "ونقف عند التفاصيل…"                         |
| `medical-study`    | "سنوات من التعلّم"                           |
| `dental`           | "صحتنا"                                     |
| `skincare`         | "ملامحنا / نظرتنا لأنفسنا"                   |
| `filler`           | "كيف نفهم الخيارات اللي قدّامنا؟"             |
| `surgery`          | "وكيف نفرّق بين تجربة تخصّ صاحبها…"           |
| `cosmetic`         | "تكون له ملامحه وقيمته"                      |
| `consultation`     | "يمكن معلومة توضّح لك قرار"                  |
| `podcast`          | "يمكن حديث يفتح لك زاوية جديدة"              |
