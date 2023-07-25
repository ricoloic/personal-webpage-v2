/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Particle from './particle';
import COLOR_PALETTES from '../../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../../types';

export type Args = {
  selectColorPalette: ColorPalettesKeys;
  particlesPerFrame: number;
  showParticles: boolean;
  showBlob: boolean;
  particleBorder: boolean;
  particleAlfa: boolean;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  selectColorPalette: 'happy',
  particlesPerFrame: 10,
  showParticles: true,
  showBlob: true,
  particleBorder: false,
  particleAlfa: false,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const particles: Particle[] = [];
    const center = { x: 0, y: 0 };

    const generateDefault = () => {
      center.x = p5.width / 2;
      center.y = p5.height / 2;
    };
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      generateDefault();
      p5.noStroke();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      generateDefault();
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);
      p5.translate(center.x, center.y);

      for (let i = 0; i < args.particlesPerFrame; i += 1) {
        const color = p5.random(COLOR_PALETTES[args.selectColorPalette]);
        const particle = new Particle(p5, center, color);
        particles.push(particle);
      }

      const avg = { x: 0, y: 0 };
      for (let i = 0; i < particles.length; i += 1) {
        particles[i].update();
        if (args.showParticles)
          particles[i].show(args.particleBorder, args.particleAlfa);
        avg.x += particles[i].pos.x;
        avg.y += particles[i].pos.y;
        if (particles[i].finished()) particles.splice(i, 1);
      }
      avg.x /= particles.length;
      avg.y /= particles.length;

      if (args.showBlob) {
        p5.fill(args.darkMode ? 250 : 30);
        p5.circle(avg.x, avg.y, 50);
      }
    };
  });

export default sketch;
