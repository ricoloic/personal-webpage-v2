import styled from 'styled-components';
import { Colors, CssSize, FontSizes } from '../../types';
import COLORS from '../../constants/colors';

export const List = styled.ul<{
  width?: CssSize;
  color?: Colors;
}>`
  width: ${({ width = undefined }) => width};
  color: ${({ color = COLORS.white }) => color};
  list-style-type: none;
`;

export const ListItem = styled.li<{
  $leftPadding: boolean;
  $pointer: boolean;
  fontSize: FontSizes;
}>`
  padding-left: ${({ $leftPadding }) => ($leftPadding ? '15px' : undefined)};
  cursor: ${({ $pointer }) => ($pointer ? 'pointer' : undefined)};
  font-size: ${({ fontSize }) => fontSize};
  &:hover {
    font-weight: 900;
    font-size: calc(${({ fontSize }) => fontSize} + 2px);
  }
`;
