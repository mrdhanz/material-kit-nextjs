export { default as MATERIAL_2014 } from './2014';
export * from './uibakery';
export type PaletteSpec = [number, number, number, number, number];
export const decodeColor = ([l, a, b, c, h]: PaletteSpec): PaletteSpec => [l, a, b, c, h] as PaletteSpec;
