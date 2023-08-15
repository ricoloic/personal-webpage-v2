import withTitle from '../../hoc/withTitle';
import MouseConfetti from './MouseConfetti';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'mouseConfetti/sketch/index.ts',
  'mouseConfetti/sketch/confetti.ts',
];

export default withCode(files)(
  withSketch()(withTitle('mouseConfetti')(MouseConfetti))
);
