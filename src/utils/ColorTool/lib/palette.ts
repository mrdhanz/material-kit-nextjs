import convert from 'color-convert';
import { diff as ciede2000 } from 'color-diff';
import { decodeColor, MATERIAL_2014, PaletteSpec } from '../palettes';
import { HSV } from 'color-convert/conversions';
const TOLERANCE_LIGHTNESS = [
  2.048875457, 5.124792061, 8.751659557, 12.07628774, 13.91449542, 15.92738893, 15.46585818, 15.09779227, 15.13738673,
  15.09818372,
];

const TOLERANCE_CHROMA = [
  1.762442714, 4.213532634, 7.395827458, 11.07174158, 13.89634504, 16.37591477, 16.27071136, 16.54160806, 17.35916727,
  19.88410864,
];
export interface ClosestPaletteProps {
  l: {
    L: number;
    a: number;
    b: number;
    c: number;
    h: number;
  };
}
/**
 * Uses the CIEDE2000 algorithm to find the closest golden palette.
 */

function findClosestPalette({ l: { L, a, b, c, h } }: ClosestPaletteProps, spec: Array<Array<PaletteSpec>>) {
  const { closest, palette } = spec
    .map((palette) => {
      const scores = palette.map((color) => ciede2000({ L: color[0], a: color[1], b: color[2] }, { L, a, b }));
      const bestScore = Math.min.apply(Math, scores);

      return {
        bestScore,
        closest: palette[scores.indexOf(bestScore)],
        palette,
      };
    })
    .sort((a, b) => a.bestScore - b.bestScore)[0];

  return {
    closest,
    delta: {
      l: closest[0] - L,
      c: closest[3] - c,
      h: closest[4] - h,
    },
    palette,
  };
}

/**
 * Convert a HEX color to a clamped HSV equivelant. This is accomplished by
 * rounding the hue value to a full number during conversion.
 * @param {String} hexColor
 * @return {Array}
 */
function hex2hsv(hexColor: string): HSV {
  const [h, s, v] = convert.hex.hsv.raw(hexColor);
  return [Math.round(h), s, v];
}

export interface LabCH {
  l: number;
  a: number;
  b: number;
  c: number;
  h: number;
}
/**
 * Convert HSV to CIELAB and LCH simulateously. Because these color spaces are
 * modeled according to human perception of color this allows us to compare and
 * ultimately change values on the source color to generate proper variants.
 * @param {Array} - HSV color
 * @return {Object}
 */
function labch([hue, saturation, value]: number[]): LabCH {
  const [l, a, b] = convert.hsv.lab.raw([hue, saturation, value]);
  const [c, h] = convert.lab.lch.raw([l, a, b]).slice(1);
  return { l, a, b, c, h } as LabCH;
}

/**
 * Generate a compliant Material Design color palette based on a source color.
 * @param {String|Array} original - Source color for the palette. Either a HEX
 * code or an array with HSV values.
 * @param {Object} spec - Source Material palettes used to generate new ones.
 * @param {Object} tolerance - Acceptable lightness and chroma drift for a color to be considered an exact match.
 * @return {Array} Hex values for the full color palette.
 */
export function makePalette(
  original: string | HSV,
  spec = MATERIAL_2014,
  tolerance = { lightness: TOLERANCE_LIGHTNESS, chroma: TOLERANCE_CHROMA, closest: -1 }
) {
  if (typeof original === 'string') original = hex2hsv(original);
  const { l, a, b, c, h } = labch(original);

  const { closest, delta, palette } = findClosestPalette({ l: { L: l, a, b, c, h } }, spec);

  const isGrey = decodeColor(palette[5])[3] < 30;

  let maxLightness = 100;
  const lightnessMinimumStep = 2;

  return palette.map((specColors, index) => {
    if (specColors === closest && typeof original !== 'string') {
      maxLightness = Math.max(l - 1.7, 0);
      return '#' + convert.hsv.hex(original);
    }

    specColors = decodeColor(specColors);
    tolerance.closest = palette.indexOf(closest);

    let lightness = specColors[0] - (tolerance.lightness[index] / tolerance.lightness[tolerance.closest]) * delta.l;
    lightness = Math.min(lightness, maxLightness);
    lightness = Math.min(Math.max(lightness, 0), 100);

    // If a greyscale color, a less complex chroma conversion is done.
    let chroma = isGrey
      ? specColors[3] - delta.c
      : specColors[3] - delta.c * Math.min(tolerance.chroma[index] / tolerance.chroma[tolerance.closest], 1.25);
    chroma = Math.max(0, chroma);

    const hue = (specColors[4] - delta.h + 360) % 360;

    maxLightness = Math.max(lightness - lightnessMinimumStep, 0);

    return '#' + convert.lch.hex([lightness, chroma, hue]);
  });
}
