/* eslint-disable no-param-reassign */
import P5 from 'p5';
import MapGenerator from './mapGenerator';

export type Args = {
  randomFillPercent: number;
  tileScale: number;
  numberOfPass: number;
  randomSeed: boolean;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  randomFillPercent: 47,
  tileScale: 20,
  numberOfPass: 5,
  randomSeed: true,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let mapGenerator: MapGenerator;

    const generateDefault = () => {
      const w = p5.ceil(p5.width / args.tileScale - 1);
      const h = p5.ceil(p5.height / args.tileScale - 1);
      p5.background(args.darkMode ? 250 : 30);
      const halfTile = args.tileScale / 2;
      p5.translate(p5.width / 2 + halfTile, p5.height / 2 + halfTile);
      mapGenerator = new MapGenerator(
        p5,
        w,
        h,
        args.randomFillPercent,
        args.tileScale,
        args.numberOfPass,
        3,
        args.randomSeed
      );
      mapGenerator.show(args.darkMode);
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      p5.noStroke();
      p5.stroke(0);
      p5.rectMode(p5.CENTER);
      generateDefault();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      generateDefault();
    };

    // p5.draw = () => {};
  });

export default sketch;
