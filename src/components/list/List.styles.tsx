import styled from 'styled-components';
import { Colors, CssSize } from '../../types';
import COLORS from '../../constants/colors';

export const List = styled.ul<{
  width?: CssSize;
  color?: Colors;
}>`
  width: ${({ width = undefined }) => width};
  color: ${({ color = COLORS.white }) => color};
  list-style-type: none;
`;

export const ListItem = styled.li`
  &:hover {
    font-size: 2em;
  }
`;
