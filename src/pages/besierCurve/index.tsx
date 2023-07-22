import withTitle from '../../hoc/withTitle';
import BesierCurve from './BesierCurve';
import withSketch from '../../hoc/withSketch';

export default withSketch()(withTitle('besierCurve')(BesierCurve));
