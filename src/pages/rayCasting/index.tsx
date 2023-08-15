import withTitle from '../../hoc/withTitle';
import RayCasting from './RayCasting';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'rayCasting/sketch/index.ts',
  'rayCasting/sketch/lineBoundary.ts',
  'rayCasting/sketch/boundary.ts',
  'rayCasting/sketch/boxBoundary.ts',
  'rayCasting/sketch/point.ts',
  'rayCasting/sketch/ray.ts',
  'rayCasting/sketch/caster.ts',
  'rayCasting/sketch/casterContainer.ts',
];

export default withCode(files)(
  withSketch()(withTitle('rayCasting')(RayCasting))
);
