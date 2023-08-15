import withTitle from '../../hoc/withTitle';
import BesierQuadraticCurve from './BesierQuadraticCurve';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'besierQuadraticCurve/sketch/index.ts',
  'besierQuadraticCurve/sketch/point.ts',
];

export default withCode(files)(
  withSketch()(withTitle('besierQuadraticCurve')(BesierQuadraticCurve))
);
