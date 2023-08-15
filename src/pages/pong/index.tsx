import withTitle from '../../hoc/withTitle';
import Pong from './Pong';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'pong/sketch/index.ts',
  'pong/sketch/handle.ts',
  'pong/sketch/ball.ts',
];

export default withCode(files)(withSketch()(withTitle('pong')(Pong)));
