/* eslint-disable no-param-reassign */
import P5 from 'p5';

export type Args = {
  amountOfPoints: number;
  multiplier: number;
  radius: number;
  transparency: number;
  lineThickness: number;
  center: P5.Vector;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  amountOfPoints: 200,
  multiplier: 2,
  radius: 0,
  transparency: 60,
  lineThickness: 2,
  center: new P5.Vector(0, 0),
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const calculatePositionFromIteration = (iteration: number) => {
      const angle = p5.map(iteration, 0, args.amountOfPoints, 0, p5.TWO_PI);
      return p5.createVector(
        p5.cos(angle) * args.radius,
        p5.sin(angle) * args.radius
      );
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      args.center.set(p5.width / 2, p5.height / 2);
      args.radius = p5.min(args.center.x, args.center.y) - 50;
      p5.strokeWeight(args.lineThickness);
      p5.frameRate(30);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);
      p5.translate(args.center.x, args.center.y);
      p5.strokeWeight(args.lineThickness);
      p5.stroke(
        args.darkMode ? 250 : 30,
        p5.map(args.transparency, 0, 100, 250, 0)
      );
      for (let i = 0; i < args.amountOfPoints; i += 1) {
        const point1 = calculatePositionFromIteration(i);
        const j = (i * args.multiplier) % args.amountOfPoints;
        const point2 = calculatePositionFromIteration(j);

        p5.line(point1.x, point1.y, point2.x, point2.y);
      }
    };
  });

export default sketch;
