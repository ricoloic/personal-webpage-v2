import withTitle from '../../hoc/withTitle';
import CircularMotion from './CircularMotion';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'circularMotion/sketch/index.ts',
  'circularMotion/sketch/particle.ts',
];

export default withCode(files)(
  withSketch()(withTitle('circularMotion')(CircularMotion))
);
