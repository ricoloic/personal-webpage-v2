/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Particle from './particle';
import Flow from './flow';
import { COLOR_OPTIONS, ColorOptionsKeys } from './colorOptions';

export type Args = {
  selectColor: ColorOptionsKeys;
  particleAmount: number;
  scale: number;
  increment: number;
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
  lod: 10,
  fallOff: 0.6,
  displayFlow: false,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const particles: Particle[] = [];
    const flowField: Flow[] = [];
    let columns = 0;
    let rows = 0;
    let zoff = 0;

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height, p5.P2D).parent('parent');

      p5.background(args.darkMode ? 30 : 250);
      p5.stroke(0, 2);
      p5.noiseDetail(args.lod, args.fallOff);

      columns = p5.floor(p5.width / args.scale);
      rows = p5.floor(p5.height / args.scale);

      for (let y = 0; y <= rows; y += 1) {
        for (let x = 0; x <= columns; x += 1) {
          flowField.push(new Flow(p5));
        }
      }

      for (let i = 0; i < args.particleAmount; i += 1) {
        particles.push(new Particle(p5));
      }
      p5.colorMode(p5.HSB);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      columns = p5.floor(p5.width / args.scale);
      rows = p5.floor(p5.height / args.scale);

      for (let y = 0; y <= rows; y += 1) {
        for (let x = 0; x <= columns; x += 1) {
          flowField.push(new Flow(p5));
        }
      }
      p5.colorMode(p5.RGB);
      p5.background(args.darkMode ? 30 : 250);
      p5.colorMode(p5.HSB);
      for (let i = 0; i < particles.length; i += 1) {
        particles[i].reset();
      }
    };

    p5.draw = () => {
      if (args.displayFlow) {
        p5.colorMode(p5.RGB);
        p5.background(args.darkMode ? 30 : 250);
      }

      let yoff = 0;
      for (let y = 0; y <= rows; y += 1) {
        let xoff = 0;
        for (let x = 0; x <= columns; x += 1) {
          const index = x + y * columns;
          const flow = flowField[index];

          if (!flow) return;
          flow.update(xoff, yoff, zoff);
          if (args.displayFlow) {
            p5.stroke(args.darkMode ? 250 : 30);
            p5.strokeWeight(2);
            flow.show(args.scale, x, y);
          }

          xoff += args.increment;
        }
        yoff += args.increment;
      }
      zoff += 0.001;

      if (!args.displayFlow) {
        // if (p5.frameCount % 10 === 0) {
        //   p5.colorMode(p5.RGB);
        //   p5.background(args.darkMode ? 30 : 250, 1);
        //   p5.colorMode(p5.HSB);
        // }
        const color = COLOR_OPTIONS[args.selectColor](p5.frameCount);
        for (let i = 0; i < particles.length; i += 1) {
          particles[i].update();
          particles[i].wrapAround();
          particles[i].follow(args.scale, columns, flowField);
          particles[i].show(color);
        }
      }
    };
  });

export default sketch;
