import withTitle from '../../hoc/withTitle';
import Flocking from './Flocking';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'flocking/sketch/index.ts',
  'flocking/sketch/boid.ts',
  'flocking/sketch/quadtree/quadtree.ts',
  'flocking/sketch/quadtree/rectangle.ts',
  'flocking/sketch/quadtree/point.ts',
];

export default withCode(files)(withSketch()(withTitle('flocking')(Flocking)));
