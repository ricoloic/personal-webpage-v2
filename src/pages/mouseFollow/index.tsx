import withTitle from '../../hoc/withTitle';
import MouseFollow from './MouseFollow';
import withSketch from '../../hoc/withSketch';

export default withSketch()(withTitle('mouseFollow')(MouseFollow));
