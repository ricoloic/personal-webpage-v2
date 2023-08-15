import withTitle from '../../hoc/withTitle';
import withSketch from '../../hoc/withSketch';
import BesierCubicCurve from './BesierCubicCurve';
import withCode from '../../hoc/withCode';

const files = [
  'besierCubicCurve/sketch/index.ts',
  'besierCubicCurve/sketch/point.ts',
];

export default withCode(files)(
  withSketch()(withTitle('besierCubicCurve')(BesierCubicCurve))
);
