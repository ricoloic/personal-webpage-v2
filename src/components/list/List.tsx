import styled from 'styled-components';
import { Colors, CssSize } from '../../types';

const List = styled.ul<{
  width?: CssSize;
  color?: Colors;
  $noMargin?: boolean;
  $noPadding?: boolean;
}>`
  width: ${({ width = undefined }) => width};
  color: ${({ color = undefined }) => color};
  margin: ${({ $noMargin = undefined }) => ($noMargin ? '0' : undefined)};
  padding: ${({ $noPadding = undefined }) => ($noPadding ? '0' : undefined)};
  list-style-type: none;
  line-height: 1.2;
`;

export default List;
