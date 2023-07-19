/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Particle from './particle';
import Flow from './flow';

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

export type Args = {
  selectColor: ColorOptionsKeys;
  particleAmount: number;
  scale: number;
  increment: number;
  columns: number;
  rows: number;
  zoff: number;
  particles: Particle[];
  flowField: Flow[];
  lod: number;
  fallOff: number;
  displayFlow: boolean;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  selectColor: 'light',
  particleAmount: 2000,
  scale: 10,
  increment: 0.1,
  columns: 0,
  rows: 0,
  zoff: 0,
  particles: [],
  flowField: [],
  lod: 10,
  fallOff: 0.6,
  displayFlow: false,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight, p5.P2D).parent(
        'parent'
      );

      p5.background(args.darkMode ? 30 : 250);
      p5.stroke(0, 2);
      p5.noiseDetail(args.lod, args.fallOff);

      args.columns = p5.floor(p5.width / args.scale);
      args.rows = p5.floor(p5.height / args.scale);

      for (let y = 0; y <= args.rows; y += 1) {
        for (let x = 0; x <= args.columns; x += 1) {
          args.flowField.push(new Flow(p5));
        }
      }

      for (let i = 0; i < args.particleAmount; i += 1) {
        args.particles.push(new Particle(p5));
      }
      p5.colorMode(p5.HSB);
      // p.frameRate(20);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      if (args.displayFlow) {
        p5.background(225);
      }
      let yoff = 0;
      for (let y = 0; y <= args.rows; y += 1) {
        let xoff = 0;
        for (let x = 0; x <= args.columns; x += 1) {
          const index = x + y * args.columns;
          const flow = args.flowField[index];

          if (!flow) return;
          flow.update(xoff, yoff, args.zoff);
          if (args.displayFlow) {
            p5.stroke(0, 0, 0, 1);
            p5.strokeWeight(2);
            flow.show(args.scale, x, y);
          }

          xoff += args.increment;
        }
        yoff += args.increment;
      }
      args.zoff += 0.001;

      if (!args.displayFlow) {
        const color = COLOR_OPTIONS[args.selectColor](p5.frameCount);
        args.particles.forEach((particle) => {
          particle.update();
          particle.wrapAround();
          particle.follow(args.scale, args.columns, args.flowField);
          particle.show(color);
        });
      }
    };
  });

export default sketch;
