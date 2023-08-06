import MetaBalls from './MetaBalls';
import withSketch from '../../hoc/withSketch';
import withTitle from '../../hoc/withTitle';

export default withSketch()(withTitle('metaBalls')(MetaBalls));
