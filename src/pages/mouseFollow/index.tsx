import withTitle from '../../hoc/withTitle';
import MouseFollow from './MouseFollow';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = ['mouseFollow/sketch/index.ts', 'mouseFollow/sketch/particle.ts'];

export default withCode(files)(
  withSketch()(withTitle('mouseFollow')(MouseFollow))
);
