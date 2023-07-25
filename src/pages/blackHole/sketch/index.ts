/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Particle from './particle';

export type Args = {
  darkMode: boolean;
};

export const defaultArgs: Args = {
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const particles: Particle[] = [];
    const center = { x: 0, y: 0 };
    const blackHole = p5.createVector(0, 0);

    const generateDefault = () => {
      center.x = p5.width / 2;
      center.y = p5.height / 2;
      blackHole.set(center.x, center.y);
      particles.splice(0, particles.length);
      const minR = p5.height / 3;
      for (let i = 0; i <= 5; i += 1) {
        const a = p5.map(i, 0, 5, 0, p5.TWO_PI);
        const x = p5.cos(a) * minR;
        const y = p5.sin(a) * minR;
        particles.push(
          new Particle(p5, { x: x + center.x, y: y + center.y }, 10, 300)
        );
      }
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      p5.ellipseMode(p5.CENTER);
      generateDefault();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      generateDefault();
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);

      for (let i = 0; i < particles.length; i += 1) {
        const force = P5.Vector.sub(blackHole, particles[i].pos)
          .normalize()
          .setMag(0.7);
        particles[i].applyForce(force);
        particles[i].update();
        particles[i].show(args.darkMode);
        particles[i].showTrail(args.darkMode, 10);
        if (particles[i].lifeTime < 1) particles.splice(i, 1);
      }

      p5.fill(args.darkMode ? 250 : 30);
      p5.ellipse(center.x, center.y, 30);
    };

    p5.mousePressed = () => {
      particles.push(new Particle(p5, { x: p5.mouseX, y: p5.mouseY }, 10, 300));
    };
  });

export default sketch;
