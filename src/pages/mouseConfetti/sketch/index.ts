/* eslint-disable no-param-reassign */
import P5 from 'p5';
import COLOR_PALETTES from '../../../constants/colorPalettes';
import { ColorPalettesKeys } from '../../../types';
import Confetti from './confetti';

export type Args = {
  selectColorPalette: ColorPalettesKeys;
  confettiList: Confetti[];
  velocity: number;
  darkMode: boolean;
  fillConfetti: boolean;
  radius: number;
};

export const defaultArgs: Args = {
  selectColorPalette: 'happy',
  confettiList: [],
  velocity: 2,
  darkMode: true,
  fillConfetti: false,
  radius: 40,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      p5.noFill();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);

      const newConfetti = new Confetti(
        p5,
        p5.mouseX,
        p5.mouseY,
        COLOR_PALETTES[args.selectColorPalette],
        args.velocity,
        args.fillConfetti
      );
      args.confettiList.push(newConfetti);

      args.confettiList.forEach((confetti, index) => {
        confetti.animate();
        if (confetti.life < 1) args.confettiList.splice(index, 1);
      });

      if (args.fillConfetti) {
        p5.fill(args.darkMode ? 250 : 30);
        p5.circle(p5.mouseX, p5.mouseY, args.radius * 2);
      }
    };
  });

export default sketch;
