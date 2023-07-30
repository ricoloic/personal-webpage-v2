type ColorFunction = (frameCount: number) => [number, number, number, number];

export const COLOR_OPTIONS = {
  original: (() => [26, 51, 43, 0.1]) as ColorFunction,
  light: (() => [26, 20, 100, 0.1]) as ColorFunction,
  dark: (() => [0, 0, 0, 0.1]) as ColorFunction,
  colorful: ((frameCount: number) => [
    frameCount % 255,
    255,
    255,
    0.1,
  ]) as ColorFunction,
  blue: ((frameCount: number) => [
    (frameCount % 75) + 180,
    255,
    255,
    0.1,
  ]) as ColorFunction,
  turqouise: ((frameCount: number) => [
    (frameCount % 60) + 150,
    255,
    255,
    0.1,
  ]) as ColorFunction,
  fire: ((frameCount: number) => [
    (frameCount % 70) + 10,
    255,
    255,
    0.1,
  ]) as ColorFunction,
} as const;

export type ColorOptionsKeys = keyof typeof COLOR_OPTIONS;

export default COLOR_OPTIONS;
