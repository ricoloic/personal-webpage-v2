import withSketch from '../../hoc/withSketch';
import withTitle from '../../hoc/withTitle';
import CaveGeneration from './CaveGeneration';
import withCode from '../../hoc/withCode';

const files = [
  'caveGeneration/sketch/index.ts',
  'caveGeneration/sketch/mapGenerator.ts',
  'caveGeneration/sketch/meshGenerator.ts',
];

export default withCode(files)(
  withSketch()(withTitle('caveGeneration')(CaveGeneration))
);
