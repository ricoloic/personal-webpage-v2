import withTitle from '../../hoc/withTitle';
import ChaosGame from './ChaosGame';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = ['chaosGame/sketch/index.ts'];

export default withCode(files)(withSketch()(withTitle('chaosGame')(ChaosGame)));
