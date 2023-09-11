/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Branch from './branch';

export type Args = {
  displacementAngle: number;
  simulation: boolean;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  displacementAngle: Math.PI / 6,
  simulation: true,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let wave = 0;
    const center = p5.createVector();
    let branch: Branch;

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      p5.strokeWeight(1);
      center.set(p5.width / 2, p5.height / 2);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      center.set(p5.width / 2, p5.height / 2);
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);
      const a = args.simulation ? wave : args.displacementAngle;
      branch = new Branch(
        p5.height / 3,
        p5.createVector(center.x, p5.height),
        -p5.PI / 2,
        a
      );
      branch.show(p5, args.darkMode);
      wave += 0.005;
    };
  });

export default sketch;
