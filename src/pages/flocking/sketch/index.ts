/* eslint-disable no-param-reassign */
import P5 from 'p5';
import Rectangle from './quadtree/rectangle';
import Boid from './boid';
import QuadTree from './quadtree/quadtree';
import Point from './quadtree/point';

export type Args = {
  boundary: Rectangle;
  boids: Boid[];
  quadTree: QuadTree;
  alignmentForce: number;
  cohesionForce: number;
  separationForce: number;
  displayQuadTree: boolean;
  boidAmount: number;
  darkMode: boolean;
};

export const defaultArgs: Args = {
  boundary: new Rectangle(0, 0, 0, 0),
  boids: [],
  quadTree: new QuadTree(),
  alignmentForce: Boid.forces.alignmentForce, // 0.5
  cohesionForce: Boid.forces.cohesionForce, // 0.2
  separationForce: Boid.forces.separationForce, // 4.3
  displayQuadTree: false,
  boidAmount: 250,
  darkMode: true,
};

const sketch = (args: Args, height: number) =>
  new P5((p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, height).parent('parent');
      args.boundary = new Rectangle(
        p5.width / 2,
        p5.height / 2,
        p5.width,
        p5.height
      );

      for (let i = 0; i < args.boidAmount; i += 1)
        args.boids.push(new Boid(p5));
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, height);
    };

    p5.draw = () => {
      p5.background(args.darkMode ? 30 : 250);

      args.quadTree = new QuadTree(args.boundary, 4);
      // eslint-disable-next-line no-restricted-syntax
      for (const boid of args.boids) {
        args.quadTree.insert(new Point(boid.pos.x, boid.pos.y, boid));
      }
      if (args.displayQuadTree) args.quadTree.show(p5, args.darkMode);

      // eslint-disable-next-line no-restricted-syntax
      for (const boid of args.boids) {
        const range = new Rectangle(boid.pos.x, boid.pos.y, 50, 50);
        const points = args.quadTree.query(range);

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
