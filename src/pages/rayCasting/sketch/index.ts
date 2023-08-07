/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Caster from './caster';
import BoxBoundary from './boxBoundary';
import Boundary from './boundary';
import Point from './point';
import LineBoundary from './lineBoundary';

export type Args = {
  editing: boolean;
  autoMove: boolean;
  snapNode: boolean;
  casting: boolean;
  clicking: boolean;
  background: boolean;
  boundaries: Boundary[];
  darkMode: boolean;
};

export const defaultArgs: Args = {
  editing: false,
  autoMove: false,
  snapNode: false,
  casting: true,
  clicking: false,
  background: true,
  boundaries: [],
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const center = p5.createVector();
    let xoff = 0;
    let yoff = 1111;
    let caster: Caster;
    let canvasBoundary: BoxBoundary;

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      center.set(p5.width / 2, p5.height / 2);
      p5.noiseDetail(2, 0.7);
      caster = new Caster(p5, p5.createVector(p5.mouseX, p5.mouseY));
      canvasBoundary = new BoxBoundary(
        p5,
        new Point(p5, 0, 0),
        new Point(p5, p5.width, 0),
        new Point(p5, p5.width, p5.height),
        new Point(p5, 0, p5.height)
      );
      args.boundaries.push(new Boundary(p5, 5));
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);

      if (args.autoMove) {
        caster.setPosition(
          p5.noise(xoff) * p5.width,
          p5.noise(yoff) * p5.height
        );
        xoff += 0.01;
        yoff += 0.01;
      } else {
        caster.setPosition(p5.mouseX, p5.mouseY);
      }

      let boundaryLines: LineBoundary[] = [];
      for (let i = 0; i < args.boundaries.length; i += 1) {
        boundaryLines = boundaryLines.concat(args.boundaries[i].lines);
      }
      const tempArray: LineBoundary[] = canvasBoundary
        .getLines()
        .concat(boundaryLines);

      if (!args.clicking) {
        const color = args.darkMode ? 250 : 30;
        if (args.background) caster.castBackground(tempArray, color);
        if (args.casting) caster.castRays(tempArray);
      }

      for (let i = 0; i < args.boundaries.length; i += 1) {
        args.boundaries[i].show(args.darkMode, args.editing);
      }
    };

    p5.mouseReleased = () => {
      args.clicking = false;
      for (let i = args.boundaries.length; i > 0; i -= 1) {
        for (let j = args.boundaries[i - 1].points.length; j > 0; j -= 1) {
          args.boundaries[i - 1].points[j - 1].setMoving(false);
        }
      }
    };

    p5.mousePressed = () => {
      args.clicking = true;
      for (let i = args.boundaries.length; i > 0; i -= 1) {
        for (let j = args.boundaries[i - 1].points.length; j > 0; j -= 1) {
          if (args.boundaries[i - 1].points[j - 1].hovering()) {
            args.boundaries[i - 1].points[j - 1].setMoving(true);
            if (!args.snapNode) return;
          }
        }
      }
    };
  });

export default sketch;
