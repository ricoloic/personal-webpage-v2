import withSketch from '../../hoc/withSketch';
import withTitle from '../../hoc/withTitle';
import CaveGeneration from './CaveGeneration';

export default withSketch()(withTitle('caveGeneration')(CaveGeneration));
