/* eslint-disable no-param-reassign */
import P5 from 'p5';
import COLORS from '../../../constants/colors';

export type Args = {
  petalAmount: number;
  degrees: number;
  center: P5.Vector;
  colorHighlight: boolean;
  size: number;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  petalAmount: 2,
  degrees: 29,
  center: new P5.Vector(0, 0),
  colorHighlight: true,
  size: 0,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      const minSize = p5.width <= p5.height ? p5.width : p5.height;
      args.size = (minSize - minSize / 50) / 2;
      args.center.set(p5.width / 2, p5.height / 2);
      p5.angleMode(p5.DEGREES);
      p5.strokeWeight(2);
      p5.noFill();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.translate(args.center.x, args.center.y);
      p5.background(args.darkMode ? 30 : 250);
      p5.stroke(args.darkMode ? 250 : 30);
      p5.strokeWeight(1);

      p5.beginShape();
      for (let i = 0; i < 360; i += 1) {
        const k = i * args.degrees;
        const r = args.size * p5.sin(args.petalAmount * k);
        const x = r * p5.cos(k);
        const y = r * p5.sin(k);
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);

      if (args.colorHighlight) {
        p5.stroke(p5.color(COLORS.red500));
        p5.strokeWeight(3);
        p5.beginShape();
        for (let i = 0; i < 360; i += 1) {
          const r = args.size * p5.sin(args.petalAmount * i);
          const x = r * p5.cos(i);
          const y = r * p5.sin(i);
          p5.vertex(x, y);
        }
        p5.endShape(p5.CLOSE);
      }
    };
  });

export default sketch;
