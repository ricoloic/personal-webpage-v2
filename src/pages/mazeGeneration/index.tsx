import withSketch from '../../hoc/withSketch';
import withTitle from '../../hoc/withTitle';
import MazeGeneration from './MazeGeneration';
import withCode from '../../hoc/withCode';

const files = [
  'mazeGeneration/sketch/index.ts',
  'mazeGeneration/sketch/cell.ts',
  'mazeGeneration/sketch/maze.ts',
];

export default withCode(files)(
  withSketch()(withTitle('mazeGeneration')(MazeGeneration))
);
