/* eslint-disable no-param-reassign */
import P5 from 'p5';
import MapGenerator from './mapGenerator';

export type Args = {
  randomFillPercent: number;
  tileScale: number;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  randomFillPercent: 47,
  tileScale: 20,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let mapGenerator: MapGenerator;

    const generateDefault = () => {
      const w = p5.ceil(p5.width / args.tileScale - 1);
      const h = p5.ceil(p5.height / args.tileScale - 1);
      mapGenerator = new MapGenerator(p5, w, h, args.randomFillPercent);
      const halfTile = args.tileScale / 2;
      p5.background(args.darkMode ? 30 : 250);
      p5.translate(halfTile, halfTile);
      mapGenerator.show(args.tileScale);
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      generateDefault();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      generateDefault();
    };

    //     p5.draw = () => {};
  });

export default sketch;
