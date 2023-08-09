/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Maze from './maze';

export type Args = {
  darkMode: boolean;
};

export const defaultArgs: Args = {
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    let maze: Maze;
    const scale = 30;
    let moveX = 0;
    let moveY = 0;

    const generateDefault = () => {
      const cols = p5.floor(p5.width / scale) - 1;
      const rows = p5.floor(p5.height / scale) - 1;
      moveX = (p5.width - cols * scale) / 2;
      moveY = (p5.height - rows * scale) / 2;
      maze = new Maze(cols, rows);
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
      p5.background(args.darkMode ? 30 : 250);
      p5.translate(moveX, moveY);
      if (maze.finished()) {
        for (let i = 0; i < 10; i += 1) maze.solveStep();
      } else {
        for (let i = 0; i < 10; i += 1) maze.mazeStep();
      }
      maze.show(p5, args.darkMode, scale);
    };
  });

export default sketch;
