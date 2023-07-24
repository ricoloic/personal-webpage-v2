import withTitle from '../../hoc/withTitle';
import BesierQuadraticCurve from './BesierQuadraticCurve';
import withSketch from '../../hoc/withSketch';

export default withSketch()(
  withTitle('besierQuadraticCurve')(BesierQuadraticCurve)
);
