/**
 * SystemPros.ai "Commissioning Dossier" palette for Remotion compositions.
 *
 * Remotion needs plain color values, so these are hex equivalents of the
 * OKLCH tokens in newsite/src/styles/global.css (single source: /DESIGN.md).
 *
 * Compositions render inside @remotion/player on light pages, framed as
 * dossier "figures": paper-white ground, green structural line-work,
 * copper reserved for the key highlight, ink text.
 */

export const paper = '#ffffff'; // --color-paper       oklch(1 0 0)
export const ink = '#1f2a26'; //   --color-ink         oklch(0.21 0.02 165)
export const muted = '#5f6f69'; // --color-muted       oklch(0.45 0.025 165)
export const green = '#1f5c45'; // --color-green       oklch(0.38 0.09 160)  PRIMARY
export const greenDeep = '#143d31'; // --color-green-deep  oklch(0.27 0.055 162) drench
export const greenMid = '#2e7257'; // lighter structural green for series/variety
export const greenFaint = '#f2f6f4'; // --color-green-faint tinted panel bg
export const copper = '#c66a35'; // --color-copper      oklch(0.60 0.14 45)   ACCENT
export const copperDeep = '#a1522a'; // --color-copper-deep oklch(0.52 0.13 45)
export const copperDark = '#7f3f22'; // darkest copper step (severity ramps)
export const line = '#d5dbd8'; //  --color-line         oklch(0.87 0.01 165)  hairlines
export const paperLit = '#f4f9f6'; // near-white text on drench surfaces
export const drenchLine = '#2f5c4b'; // hairlines on green-deep surfaces

/** RGB triplets for building rgba() strings in animated styles. */
export const greenRGB = '31,92,69';
export const inkRGB = '31,42,38';
export const copperRGB = '198,106,53';

export const fontSans = "'Archivo', system-ui, sans-serif";
export const fontMono = "'Fragment Mono', 'Courier New', monospace";

export const P = {
  paper,
  ink,
  muted,
  green,
  greenDeep,
  greenMid,
  greenFaint,
  copper,
  copperDeep,
  copperDark,
  line,
  paperLit,
  drenchLine,
  greenRGB,
  inkRGB,
  copperRGB,
  fontSans,
  fontMono,
} as const;

export default P;
