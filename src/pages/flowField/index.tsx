import withTitle from '../../hoc/withTitle';
import FlowField from './FlowField';
import withSketch from '../../hoc/withSketch';
import withCode from '../../hoc/withCode';

const files = [
  'flowField/sketch/index.ts',
  'flowField/sketch/particle.ts',
  'flowField/sketch/flow.ts',
  'flowField/sketch/colorOptions.ts',
];

export default withCode(files)(withSketch()(withTitle('flowField')(FlowField)));
