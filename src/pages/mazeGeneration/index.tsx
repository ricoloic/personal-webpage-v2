import withSketch from '../../hoc/withSketch';
import withTitle from '../../hoc/withTitle';
import MazeGeneration from './MazeGeneration';

export default withSketch()(withTitle('mazeGeneration')(MazeGeneration));
