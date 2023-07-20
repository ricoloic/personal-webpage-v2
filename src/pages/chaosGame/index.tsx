import withTitle from '../../hoc/withTitle';
import ChaosGame from './ChaosGame';
import withSketch from '../../hoc/withSketch';

export default withSketch()(withTitle('chaosGame')(ChaosGame));
