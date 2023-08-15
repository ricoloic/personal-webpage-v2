import withTitle from '../../hoc/withTitle';
import TimesTable from './TimesTable';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = ['timesTable/sketch/index.ts'];

export default withCode(files)(
  withSketch()(withTitle('timesTable')(TimesTable))
);
