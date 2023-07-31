/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Handle from './handle';
import Ball from './ball';

export type Args = {
  darkMode: boolean;
};

export const defaultArgs: Args = {
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const scale = 10;
    const points = { left: 0, right: 0 };
    const view = { width: 0, height: 0 };
    const leftBar = new Handle(p5, 'left', scale);
    const rightBar = new Handle(p5, 'right', scale);
    const ball = new Ball(p5, scale);
    const fontSize = 100;

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      p5.rectMode(p5.CENTER);
      view.width = p5.width / scale;
      view.height = p5.height / scale;
      ball.create();
      leftBar.create();
      rightBar.create();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      leftBar.create();
      rightBar.create();
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);
      p5.noStroke();
      p5.textSize(fontSize);
      p5.fill(args.darkMode ? 250 : 30);

      for (let y = 0; y < view.height; y += 5) {
        p5.rect(p5.width / 2, y * scale + scale / 2, scale, scale);
      }

      ball.intersectHandles(leftBar, rightBar);
      ball.update();
      ball.show();

      leftBar.move();
      leftBar.show();
      rightBar.move();
      rightBar.show();

      const outBound = ball.outOfBound();
      if (outBound) {
        if (outBound === 'left') {
          points.right += 1;
          ball.create('right');
        } else if (outBound === 'right') {
          points.left += 1;
          ball.create('left');
        }
      }

      // left points
      p5.text(
        points.left.toString(),
        p5.width / 2 / 2 - fontSize / 2,
        fontSize
      );
      // right points
      p5.text(
        points.right.toString(),
        p5.width - p5.width / 2 / 2 - fontSize / 2,
        fontSize
      );
    };

    p5.keyPressed = (event: Record<any, any>) => {
      // up arrow
      if (event.keyCode === 38) {
        rightBar.startMoving('up');
      }
      // down arrow
      if (event.keyCode === 40) {
        rightBar.startMoving('down');
      }
      // w
      if (event.keyCode === 87) {
        leftBar.startMoving('up');
      }
      // s
      if (event.keyCode === 83) {
        leftBar.startMoving('down');
      }
    };

    p5.keyReleased = (event: Record<any, any>) => {
      // up arrow
      if (event.keyCode === 38) {
        rightBar.stopMoving('up');
      }
      // down arrow
      if (event.keyCode === 40) {
        rightBar.stopMoving('down');
      }
      // w
      if (event.keyCode === 87) {
        leftBar.stopMoving('up');
      }
      // s
      if (event.keyCode === 83) {
        leftBar.stopMoving('down');
      }
    };
  });

export default sketch;
