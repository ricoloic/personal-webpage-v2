/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Particle from './particle';
import COLOR_PALETTES from '../../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../../types';

export type Args = {
  selectColorPalette: ColorPalettesKeys;
  particles: Particle[];
  latestMousePositions: P5.Vector[];
  averageMousePosition: P5.Vector;
  lineAmount: number;
  maxRadius: number;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  selectColorPalette: 'happy',
  particles: [] as Particle[],
  latestMousePositions: [],
  averageMousePosition: new P5.Vector(0, 0),
  lineAmount: 10,
  maxRadius: 70,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let position: P5.Vector;
    let xoff = 0;
    let yoff = 10000;

    const createParticle = () => {
      return new Particle(
        p5,
        p5.width / 2,
        p5.height / 2,
        p5.random(COLOR_PALETTES[args.selectColorPalette]),
        args.maxRadius,
        p5.random(0.02, 0.04),
        p5.floor(p5.random(15, 40))
      );
    };

    const updateLatestMousePositions = () => {
      if (args.latestMousePositions.length > 17)
        args.latestMousePositions.splice(0, 1);
      args.latestMousePositions.push(p5.createVector(p5.mouseX, p5.mouseY));
    };

    const updateAverageMousePosition = () => {
      const tempAvgMousePos = args.latestMousePositions.reduce(
        (acc, curr) => P5.Vector.add(acc, curr),
        p5.createVector(0, 0)
      );
      tempAvgMousePos.set(
        p5.floor(tempAvgMousePos.x / args.latestMousePositions.length),
        p5.floor(tempAvgMousePos.y / args.latestMousePositions.length)
      );
      args.averageMousePosition = tempAvgMousePos.copy();
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');

      position = p5.createVector();
      args.particles = Array.from({ length: args.lineAmount }).map(
        createParticle
      );
      args.latestMousePositions = [];
      args.averageMousePosition = p5.createVector(0, 0);
      p5.noFill();
      p5.noiseDetail(2, 0.5);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      if (args.lineAmount > args.particles.length)
        args.particles.push(createParticle());
      else if (args.lineAmount < args.particles.length) args.particles.pop();

      if (p5.mouseIsPressed) {
        updateLatestMousePositions();
        updateAverageMousePosition();
      }

      position.set(
        p5.map(p5.noise(xoff), 0, 1, args.maxRadius, p5.width - args.maxRadius),
        p5.map(p5.noise(yoff), 0, 1, args.maxRadius, p5.height - args.maxRadius)
      );
      xoff += 0.01;
      yoff += 0.01;

      p5.background(args.darkMode ? 30 : 250);
      args.particles.forEach((particle) =>
        particle.animate(
          p5.mouseIsPressed ? args.averageMousePosition : position
        )
      );
    };
  });

export default sketch;
