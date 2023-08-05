/* eslint-disable no-param-reassign */
import P5 from 'p5';

export type Args = {
  amountOfPoints: number;
  lerpAmount: number;
  randomPoints: boolean;
  iteration: number;
  size: number;
  maxSize: number;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  amountOfPoints: 3,
  lerpAmount: 0.5,
  randomPoints: false,
  iteration: 100,
  size: 0,
  maxSize: 0,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const center = p5.createVector();
    const currentPoint = p5.createVector();
    let seedPoints: P5.Vector[] = [];

    const pickSeedPoints = () => {
      const radius = args.maxSize / 2 - 10;

      const randomPoint = () =>
        p5.createVector(
          p5.random(-center.x, center.x),
          p5.random(-center.y, center.y)
        );

      const pointInCircle = (i: number) => {
        const angle = (i * p5.TWO_PI) / args.amountOfPoints;
        return p5.createVector(radius * p5.cos(angle), radius * p5.sin(angle));
      };

      return Array.from({ length: args.amountOfPoints }).map((_, i) =>
        args.randomPoints ? randomPoint() : pointInCircle(i)
      );
    };

    const generateDefault = () => {
      args.size = p5.width <= p5.height ? p5.width : p5.height;
      args.maxSize = args.size - args.size / 50;
      center.set(p5.width / 2, p5.height / 2);
      currentPoint.set(p5.random(args.size), p5.random(args.size));
      seedPoints = pickSeedPoints();
      p5.background(args.darkMode ? 30 : 250);
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      generateDefault();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      generateDefault();
    };

    p5.draw = () => {
      p5.translate(center.x, center.y);
      p5.stroke(args.darkMode ? 250 : 30);
      p5.strokeWeight(1);

      seedPoints.forEach((point) => p5.point(point.x, point.y));

      for (let i = 0; i < args.iteration; i += 1) {
        p5.point(currentPoint.x, currentPoint.y);
        const next = p5.random(seedPoints);
        currentPoint.set(
          p5.lerp(next.x, currentPoint.x, args.lerpAmount),
          p5.lerp(next.y, currentPoint.y, args.lerpAmount)
        );
      }
    };
  });

export default sketch;
