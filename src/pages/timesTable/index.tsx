import withTitle from '../../hoc/withTitle';
import TimesTable from './TimesTable';
import withSketch from '../../hoc/withSketch';

export default withSketch()(withTitle('timesTable')(TimesTable));
