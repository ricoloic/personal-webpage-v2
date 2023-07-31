import withTitle from '../../hoc/withTitle';
import Pong from './Pong';
import withSketch from '../../hoc/withSketch';

export default withSketch()(withTitle('pong')(Pong));
