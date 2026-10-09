import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Art, ArtLayer, Chunk, Closing, CollageBoard, Connector, END, FlightPath, Logo, OpeningDiamond, QuestionMark, ReturnDiamond, TextPage, Timeline, TypewriterScene, layout} from './scenes';
import {Paper} from './Paper';

export const TOTAL_SECONDS = Math.ceil((END + 1.8) * 30) / 30;

/** Every chunk is a token range of the script (see data/script.txt); timings come from the voice-over. */
const CHUNKS: Chunk[] = [
  // 1. the dot
  {a: 0, b: 2, y: -330, size: 92},
  {a: 3, b: 4, y: -330, size: 92, accent: [4]},
  // 2. one dot changes a letter...
  {a: 5, b: 9, breaks: [7], accent: [9]},
  {a: 10, b: 12, accent: [12]},
  {a: 13, b: 21, breaks: [16], accent: [20], kashida: {20: [2, 8]}},
  {a: 22, b: 23, size: 150, accent: [23], kashida: {23: [2, 14]}, circle: [23]},
  // 3. curiosity
  {a: 24, b: 26, accent: [26], kashida: {26: [2, 10]}},
  {a: 27, b: 31, breaks: [28], accent: [28]},
  {a: 32, b: 37, breaks: [34], accent: [37]},
  {a: 38, b: 41, accent: [39]},
  {a: 42, b: 44, accent: [43]},
  {a: 45, b: 50, breaks: [48], accent: [50]},
  {a: 51, b: 55, breaks: [53], accent: [54]},
  {a: 56, b: 59},
  {a: 60, b: 63, breaks: [61]},
  {a: 64, b: 68, breaks: [65], accent: [67], kashida: {67: [2, 12]}},
  {a: 69, b: 72, accent: [72]},
  // 4. the idea
  {a: 73, b: 76, y: -300},
  {a: 78, b: 82, breaks: [80], accent: [82]},
  {a: 83, b: 86, breaks: [84], accent: [84, 86]},
  // 5. people and experts
  {a: 87, b: 89, accent: [89]},
  {a: 90, b: 93},
  {a: 94, b: 97, accent: [94]},
  {a: 98, b: 100},
  {a: 101, b: 105, breaks: [102], accent: [105]},
  {a: 106, b: 109, accent: [109]},
  {a: 110, b: 112, accent: [112]},
  {a: 113, b: 116, accent: [116]},
  {a: 117, b: 122, breaks: [119]},
  {a: 123, b: 125},
  {a: 126, b: 128, accent: [126], kashida: {126: [1, 12]}},
  {a: 129, b: 131, accent: [129], kashida: {129: [2, 10]}},
  {a: 132, b: 134},
  {a: 135, b: 138},
  {a: 139, b: 145, breaks: [141], accent: [145]},
  // 6. health and looks
  {a: 146, b: 150, breaks: [148], accent: [150]},
  {a: 151, b: 155, breaks: [152], accent: [152]},
  {a: 156, b: 158, accent: [158], circle: [158]},
  {a: 159, b: 160, accent: [160], kashida: {160: [1, 8]}},
  {a: 161, b: 166, breaks: [163], accent: [166]},
  {a: 167, b: 171, breaks: [168], accent: [171]},
  {a: 172, b: 177, breaks: [174]},
  {a: 178, b: 182, breaks: [179], accent: [182]},
  {a: 183, b: 186, breaks: [184], accent: [186], kashida: {186: [1, 10]}},
  // 7. how we talk
  {a: 187, b: 189},
  {a: 190, b: 193},
  {a: 194, b: 195, accent: [195], labels: [{text: 'مصطلح', at: 0, x: 1180, y: 330}]},
  {a: 196, b: 197},
  {a: 198, b: 202, breaks: [199]},
  {a: 203, b: 207, breaks: [205]},
  {a: 208, b: 212, breaks: [210], accent: [210]},
  // (213-220: typewriter scene)
  {a: 221, b: 225, breaks: [223]},
  {a: 226, b: 229},
  {a: 230, b: 231, size: 170, accent: [230, 231], circle: [231]},
  {a: 232, b: 237, breaks: [233], accent: [233, 237]},
  // 8. the name
  {a: 238, b: 243, breaks: [240], y: -300},
  {a: 245, b: 249, breaks: [246], accent: [249], kashida: {249: [2, 10]}},
  {a: 250, b: 253, breaks: [251]},
  {a: 254, b: 257, breaks: [255]},
  {a: 258, b: 261, breaks: [259], accent: [258]},
  {a: 262, b: 267, breaks: [264]},
  {a: 268, b: 271, accent: [271]},
  {a: 272, b: 277, breaks: [273], accent: [277]},
  {a: 278, b: 282, breaks: [279], accent: [282]},
  {a: 283, b: 288, breaks: [284]},
  {a: 289, b: 295, breaks: [291], accent: [290]},
  {a: 296, b: 299, accent: [299]},
  {a: 300, b: 304, breaks: [302], accent: [303], kashida: {303: [1, 12]}},
  // 9. the collage (305-315 text on top, board below)
  {a: 305, b: 307, y: -380, size: 88},
  {a: 308, b: 310, y: -380, size: 88},
  {a: 311, b: 315, y: -380, size: 88, accent: [315]},
  // 10. back to the dot, then the close
  {a: 316, b: 320, breaks: [318], accent: [316], y: 60},
  {a: 321, b: 325, breaks: [323], accent: [323], y: 60},
  {a: 326, b: 329, breaks: [327], accent: [329], y: 60},
  {a: 330, b: 332, y: 170},
  {a: 334, b: 337, breaks: [335], y: 170, accent: [337], kashida: {335: [0, 10]}},
];

const PAGES = layout(CHUNKS);

const ART: Art[] = [
  {kind: 'img', name: 'magnifier', at: 24, until: 37, x: 1560, y: 215, w: 470, rot: -8},
  {kind: 'img', name: 'camera', at: 42, until: 50, x: 330, y: 205, w: 470, rot: -6, enter: 'throw'},
  {kind: 'img', name: 'mic', at: 43, until: 50, x: 1570, y: 820, w: 470, rot: 5, enter: 'throw'},
  {kind: 'svg', name: 'globe', at: 66, until: 72, x: 1560, y: 230, w: 330},
  {kind: 'img', name: 'mic', at: 106, until: 122, x: 1580, y: 220, w: 460, rot: -4, enter: 'right'},
  {kind: 'svg', name: 'books', at: 129, until: 145, x: 350, y: 225, w: 330, enter: 'left'},
  {kind: 'svg', name: 'scales', at: 156, until: 160, x: 1560, y: 230, w: 340, enter: 'drop'},
  {kind: 'img', name: 'magnifier', at: 161, until: 182, x: 330, y: 810, w: 440, rot: 6},
  {kind: 'img', name: 'mic', at: 187, until: 202, x: 350, y: 820, w: 440, rot: -5, enter: 'left'},
  {kind: 'svg', name: 'bulb', at: 226, until: 237, x: 1560, y: 240, w: 340, enter: 'drop'},
];

const STAGES = [
  {label: 'سؤال', at: 28},
  {label: 'تجربة', at: 48},
  {label: 'معرفة', at: 109},
  {label: 'أثر', at: 337},
];

export const Main: React.FC = () => (
  <AbsoluteFill>
    <Paper />
    <Audio src={staticFile('voice.mp3')} />
    <OpeningDiamond />
    <ReturnDiamond />
    <QuestionMark />
    <Connector />
    <FlightPath />
    <ArtLayer items={ART} />
    <TypewriterScene />
    <CollageBoard />
    <Logo at={77} until={77} y={560} w={880} />
    <Logo at={244} until={244} y={560} w={880} />
    <Logo at={333} until={337} y={330} w={700} />
    <Logo at={340} y={215} w={440} />
    {PAGES.map((p, i) => (
      <TextPage key={i} c={p.c} from={p.from} to={p.to} />
    ))}
    <Closing />
    <Timeline stages={STAGES} />
  </AbsoluteFill>
);
