/* eslint-disable no-param-reassign */
import P5 from 'p5';

export type Args = {
  amountOfPoints: number;
  lerpAmount: number;
  randomPoints: boolean;
  iteration: number;
  size: number;
  maxSize: number;
  seedPoints: P5.Vector[];
  currentPoint: P5.Vector;
  previousPoint: P5.Vector;
  center: P5.Vector;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  amountOfPoints: 3,
  lerpAmount: 0.5,
  randomPoints: false,
  iteration: 100,
  size: 0,
  maxSize: 0,
  seedPoints: [],
  currentPoint: new P5.Vector(0, 0),
  previousPoint: new P5.Vector(0, 0),
  center: new P5.Vector(0, 0),
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const pickSeedPoints = () => {
      const radius = args.maxSize / 2 - 10;

      const randomPoint = () =>
        p5.createVector(
          p5.random(-args.center.x, args.center.x),
          p5.random(-args.center.y, args.center.y)
        );

      const pointInCircle = (i: number) => {
        const angle = (i * p5.TWO_PI) / args.amountOfPoints;
        return p5.createVector(radius * p5.cos(angle), radius * p5.sin(angle));
      };

      return Array.from({ length: args.amountOfPoints }).map((_, i) =>
        args.randomPoints ? randomPoint() : pointInCircle(i)
      );
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      args.size = p5.width <= p5.height ? p5.width : p5.height;
      args.maxSize = args.size - args.size / 50;
      args.center.set(p5.width / 2, p5.height / 2);
      args.currentPoint.set(p5.random(args.size), p5.random(args.size));
      args.seedPoints = pickSeedPoints();
      p5.background(args.darkMode ? 30 : 250);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.translate(args.center.x, args.center.y);
      p5.stroke(args.darkMode ? 250 : 30);
      p5.strokeWeight(1);

      args.seedPoints.forEach((point) => p5.point(point.x, point.y));

      for (let i = 0; i < args.iteration; i += 1) {
        p5.point(args.currentPoint.x, args.currentPoint.y);
        const next = p5.random(args.seedPoints);
        args.currentPoint.set(
          p5.lerp(next.x, args.currentPoint.x, args.lerpAmount),
          p5.lerp(next.y, args.currentPoint.y, args.lerpAmount)
        );
      }
    };
  });

export default sketch;
