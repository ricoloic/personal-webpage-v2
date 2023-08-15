import BlackHole from './BlackHole';
import withTitle from '../../hoc/withTitle';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = ['blackHole/sketch/index.ts', 'blackHole/sketch/particle.ts'];

export default withCode(files)(withSketch()(withTitle('blackHole')(BlackHole)));
