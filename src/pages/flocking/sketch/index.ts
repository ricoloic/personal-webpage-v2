/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Rectangle from './quadtree/rectangle';
import Boid from './boid';
import QuadTree from './quadtree/quadtree';
import Point from './quadtree/point';

export type Args = {
  alignmentForce: number;
  cohesionForce: number;
  separationForce: number;
  displayQuadTree: boolean;
  boidAmount: number;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  alignmentForce: Boid.forces.alignmentForce, // 0.5
  cohesionForce: Boid.forces.cohesionForce, // 0.2
  separationForce: Boid.forces.separationForce, // 4.3
  displayQuadTree: false,
  boidAmount: 250,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    const boids: Boid[] = [];
    let boundary: Rectangle = new Rectangle(0, 0, 0, 0);

    const generateInitialBoundary = () => {
      boundary = new Rectangle(
        p5.width / 2,
        p5.height / 2,
        p5.width,
        p5.height
      );
    };

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      generateInitialBoundary();
      for (let i = 0; i < args.boidAmount; i += 1) boids.push(new Boid(p5));
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
      generateInitialBoundary();
    };

    p5.draw = () => {
      if (args.boidAmount > boids.length) {
        boids.push(new Boid(p5));
      } else if (args.boidAmount < boids.length) {
        boids.splice(0, 1);
      }
      p5.background(args.darkMode ? 30 : 250);

      const quadTree = new QuadTree(boundary, 4);
      for (let i = 0; i < boids.length; i += 1) {
        const boid = boids[i];
        quadTree.insert(new Point(boid.pos.x, boid.pos.y, boid));
      }
      if (args.displayQuadTree) quadTree.show(p5, args.darkMode);

      for (let i = 0; i < boids.length; i += 1) {
        const boid = boids[i];
        const range = new Rectangle(boid.pos.x, boid.pos.y, 50, 50);
        const points = quadTree.query(range);

        boid.flock(
          args.darkMode,
          points.map((point) => point.userData),
          {
            alignmentForce: args.alignmentForce,
            cohesionForce: args.cohesionForce,
            separationForce: args.separationForce,
          }
        );
      }
    };
  });

export default sketch;
