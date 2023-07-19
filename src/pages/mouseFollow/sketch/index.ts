/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Particle from './particle';
import COLOR_PALETTES from '../../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../../types';

export type Args = {
  selectColorPalette: ColorPalettesKeys;
  particles: Particle[];
  particlesPerFrame: number;
  center: { x: number; y: number };
  showParticles: boolean;
  showBlob: boolean;
  particleBorder: boolean;
  particleAlfa: boolean;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  selectColorPalette: 'happy',
  particles: [] as Particle[],
  particlesPerFrame: 10,
  center: { x: 0, y: 0 },
  showParticles: true,
  showBlob: true,
  particleBorder: false,
  particleAlfa: false,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      args.center.x = p5.width / 2;
      args.center.y = p5.height / 2;
      p5.noStroke();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);
      p5.translate(args.center.x, args.center.y);

      for (let i = 0; i < args.particlesPerFrame; i += 1) {
        const color = p5.random(COLOR_PALETTES[args.selectColorPalette]);
        const particle = new Particle(p5, args.center, color);
        args.particles.push(particle);
      }

      args.particles.forEach((particle) => {
        particle.update();
        if (!args.showParticles) return;
        particle.show(args.particleBorder, args.particleAlfa);
      });
      args.particles = args.particles.filter(
        (particle) => !particle.finished()
      );

      if (args.showBlob) {
        const sumV = args.particles.reduce(
          (v, particle) => v.add(particle.pos.x, particle.pos.y),
          p5.createVector(0, 0)
        );
        const cntV = sumV.div(args.particles.length);
        p5.fill(args.darkMode ? '#fff' : '#333');
        p5.circle(cntV.x, cntV.y, 50);
      }
    };
  });

export default sketch;
