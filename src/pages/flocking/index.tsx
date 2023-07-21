import withTitle from '../../hoc/withTitle';
import Flocking from './Flocking';
import withSketch from '../../hoc/withSketch';

export default withSketch()(withTitle('flocking')(Flocking));
