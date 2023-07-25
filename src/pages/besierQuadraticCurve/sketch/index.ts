/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Point from './point';

export type Args = {
  displayControlLines: boolean;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  displayControlLines: true,
  darkMode: true,
};

const calculateQuadraticBesier = (
  t: number,
  pt1: Point,
  pt2: Point,
  pt3: Point
) => {
  const calc = (axis: 'x' | 'y') =>
    pt2.vector[axis] +
    (1 - t) * (1 - t) * (pt1.vector[axis] - pt2.vector[axis]) +
    t * t * (pt3.vector[axis] - pt2.vector[axis]);
  return { x: calc('x'), y: calc('y') };
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let initiated = false;
    const weight = 15;
    let t = 1;
    const points: Point[] = [];

    const assignPoints = () => {
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;
      const minMult = 150;
      const v1 = [centerX + minMult, centerY + minMult];
      const v2 = [centerX, centerY - minMult];
      const v3 = [centerX - minMult, centerY + minMult];
      if (initiated) {
        points[0].vector.set(v1[0], v1[1]);
        points[1].vector.set(v2[0], v2[1]);
        points[2].vector.set(v3[0], v3[1]);
      } else {
        points.push(new Point(p5, v1[0], v1[1], weight, 'P1'));
        points.push(new Point(p5, v2[0], v2[1], weight, 'P2'));
        points.push(new Point(p5, v3[0], v3[1], weight, 'P3'));
        initiated = true;
      }
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      assignPoints();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      assignPoints();
    };

    p5.draw = () => {
      if (t >= 1) {
        t = 0;
      }
      t += 0.001;
      p5.background(args.darkMode ? 30 : 250);
      p5.noFill();

      p5.strokeWeight(2);
      p5.stroke(args.darkMode ? 250 : 30);
      p5.beginShape();
      for (let i = 0; i <= 1.0000001; i += 0.01) {
        const curvePoint = calculateQuadraticBesier(
          i,
          points[0],
          points[1],
          points[2]
        );
        p5.vertex(curvePoint.x, curvePoint.y);
      }
      p5.endShape();

      if (args.displayControlLines) {
        points[0].lineToPoint(points[1]);
        points[1].lineToPoint(points[2]);

        p5.strokeWeight(1);
        p5.stroke('#f9c846');
        const a1 = [
          p5.lerp(points[0].vector.x, points[1].vector.x, t),
          p5.lerp(points[0].vector.y, points[1].vector.y, t),
        ];
        const a2 = [
          p5.lerp(points[1].vector.x, points[2].vector.x, t),
          p5.lerp(points[1].vector.y, points[2].vector.y, t),
        ];
        p5.line(a1[0], a1[1], a2[0], a2[1]);
        const curvePoint = calculateQuadraticBesier(
          t,
          points[0],
          points[1],
          points[2]
        );
        p5.strokeWeight(1);
        p5.stroke(args.darkMode ? 250 : 30);
        p5.push();
        p5.translate(-15, 15);
        p5.text(t.toString().slice(0, 4), curvePoint.x, curvePoint.y);
        p5.pop();
      }

      for (let i = 0; i < points.length; i += 1) {
        points[i].update();
        points[i].show(args.darkMode);
      }
    };

    p5.mousePressed = () => {
      for (let i = 0; i < points.length; i += 1) {
        if (points[i].mouseHover()) {
          points[i].isSelected = true;
        }
      }
    };

    p5.mouseReleased = () => {
      for (let i = 0; i < points.length; i += 1) {
        points[i].isSelected = false;
      }
    };
  });

export default sketch;
