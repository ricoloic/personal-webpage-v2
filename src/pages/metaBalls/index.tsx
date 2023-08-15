import MetaBalls from './MetaBalls';
import withSketch from '../../hoc/withSketch';
import withTitle from '../../hoc/withTitle';
import withCode from '../../hoc/withCode';

const files = [
  'metaBalls/sketch/index.ts',
  'metaBalls/sketch/ball.ts',
  'metaBalls/sketch/meshGenerator.ts',
];

export default withCode(files)(withSketch()(withTitle('metaBalls')(MetaBalls)));
