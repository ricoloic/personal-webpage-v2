/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Ball from './ball';
import MeshGenerator from './meshGenerator';

export type Args = {
  darkMode: boolean;
  ballAmount: number;
  showCircles: boolean;
};

export const defaultArgs: Args = {
  darkMode: true,
  ballAmount: 8,
  showCircles: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const scale = 18;
    let cols: number;
    let rows: number;
    const balls: Ball[] = [];
    const center = p5.createVector();

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      cols = p5.ceil(p5.width / scale + 1);
      rows = p5.ceil(p5.height / scale + 1);
      for (let i = 0; i < args.ballAmount; i += 1) {
        balls.push(new Ball(p5, scale));
      }
      center.set(p5.width / 2, p5.height / 2);
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      cols = p5.ceil(p5.width / scale + 1);
      rows = p5.ceil(p5.height / scale + 1);
    };

    p5.draw = () => {
      if (args.ballAmount < balls.length) {
        balls.splice(0, 1);
      } else if (args.ballAmount > balls.length) {
        balls.push(new Ball(p5, scale));
      }
      p5.background(args.darkMode ? 30 : 250);
      p5.strokeWeight(2);
      p5.stroke(250);
      const map: [number, number][][] = [];

      for (let col = 0; col < cols; col += 1) {
        map[col] = [];
        for (let row = 0; row < rows; row += 1) {
          const x = col * scale;
          const y = row * scale;
          let sum = 0;
          for (let i = 0; i < balls.length; i += 1) {
            const xdif = x - balls[i].pos.x;
            const ydif = y - balls[i].pos.y;
            const d = p5.sqrt(xdif * xdif + ydif * ydif);
            sum += balls[i].radius / d;
          }
          map[col][row] = [
            sum >= 1.8 ? 1 : 0,
            p5.min(p5.map(sum, 0, 2, 0, 1), 1),
          ];
        }
      }

      const meshGenerator = new MeshGenerator(p5, map, scale);
      meshGenerator.show(args.darkMode);

      for (let i = 0; i < balls.length; i += 1) {
        balls[i].update();

        if (args.showCircles) balls[i].show(args.darkMode);
      }
    };
  });

export default sketch;
