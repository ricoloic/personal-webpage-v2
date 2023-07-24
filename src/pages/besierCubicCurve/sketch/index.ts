/* eslint-disable no-param-reassign */
import P5 from 'p5';

export type Args = {
  darkMode: boolean;
};

export const defaultArgs: Args = {
  darkMode: true,
};

const calculateCubicBesier = (
  t: number,
  pt1: P5.Vector,
  pt2: P5.Vector,
  pt3: P5.Vector,
  pt4: P5.Vector
) => {
  const calc = (axis: 'x' | 'y') =>
    (1 - t) * (1 - t) * (1 - t) * pt1[axis] +
    3 * (1 - t) * (1 - t) * t * pt2[axis] +
    3 * (1 - t) * t * t * pt3[axis] +
    t * t * t * pt4[axis];
  return new P5.Vector(calc('x'), calc('y'));
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let t = 1;
    let point1: P5.Vector;
    let point2: P5.Vector;
    let point3: P5.Vector;
    let point4: P5.Vector;

    const assignPoints = () => {
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;
      const minMult = 150;
      point1 = p5.createVector(centerX - minMult, centerY - minMult);
      point2 = p5.createVector(centerX + minMult, centerY);
      point3 = p5.createVector(centerX - minMult, centerY);
      point4 = p5.createVector(centerX + minMult, centerY + minMult);
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
      // const t = p5.map(p5.mouseX, 0, p5.width, 0, 1); // 0.5;
      if (t >= 1) {
        t = 0;
      }
      t += 0.001;
      p5.background(args.darkMode ? 30 : 250);
      p5.noFill();

      // point2.set(p5.mouseX, p5.mouseY);

      p5.strokeWeight(1);
      p5.stroke('#f96e46');
      p5.line(point1.x, point1.y, point2.x, point2.y);
      p5.line(point2.x, point2.y, point3.x, point3.y);
      p5.line(point3.x, point3.y, point4.x, point4.y);

      p5.strokeWeight(2);
      p5.stroke(args.darkMode ? 250 : 30);
      p5.beginShape();
      for (let i = 0; i <= 1.0000001; i += 0.01) {
        const curvePoint = calculateCubicBesier(
          i,
          point1,
          point2,
          point3,
          point4
        );
        p5.vertex(curvePoint.x, curvePoint.y);
      }
      p5.endShape();

      const a1 = [
        p5.lerp(point1.x, point2.x, t),
        p5.lerp(point1.y, point2.y, t),
      ];
      const a2 = [
        p5.lerp(point2.x, point3.x, t),
        p5.lerp(point2.y, point3.y, t),
      ];
      const a3 = [
        p5.lerp(point3.x, point4.x, t),
        p5.lerp(point3.y, point4.y, t),
      ];
      p5.strokeWeight(1);
      p5.stroke('#f9c846');
      p5.line(a1[0], a1[1], a2[0], a2[1]);
      p5.line(a2[0], a2[1], a3[0], a3[1]);
      const b1 = [p5.lerp(a1[0], a2[0], t), p5.lerp(a1[1], a2[1], t)];
      const b2 = [p5.lerp(a2[0], a3[0], t), p5.lerp(a2[1], a3[1], t)];
      p5.stroke('#94BFBE');
      p5.line(b1[0], b1[1], b2[0], b2[1]);
      const curvePoint = calculateCubicBesier(
        t,
        point1,
        point2,
        point3,
        point4
      );
      p5.strokeWeight(1);
      p5.stroke(args.darkMode ? 250 : 30);
      p5.push();
      p5.translate(-15, 15);
      p5.text(t.toString().slice(0, 4), curvePoint.x, curvePoint.y);
      p5.pop();

      p5.stroke(args.darkMode ? 250 : 30);
      p5.strokeWeight(10);
      p5.point(point1.x, point1.y);
      p5.point(point2.x, point2.y);
      p5.point(point3.x, point3.y);
      p5.point(point4.x, point4.y);
      p5.strokeWeight(1);
      p5.push();
      p5.translate(15, 15);
      p5.text('P1', point1.x, point1.y);
      p5.text('P2', point2.x, point2.y);
      p5.text('P3', point3.x, point3.y);
      p5.text('P4', point4.x, point4.y);
      p5.pop();
    };
  });

export default sketch;
