import withTitle from '../../hoc/withTitle';
import MaurerRose from './MaurerRose';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = ['maurerRose/sketch/index.ts'];

export default withCode(files)(
  withSketch()(withTitle('maurerRose')(MaurerRose))
);
