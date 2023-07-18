import styled from 'styled-components';
import { FontSizesKeys, FontWeightsKeys } from '../../types';
import FONT_SIZE, { FONT_WEIGHT } from '../../constants/sizes';

const ListItem = styled.li<{
  $leftPadding?: boolean;
  fontSize?: FontSizesKeys;
  maxFontWeight?: FontWeightsKeys;
  $zoom?: boolean;
  onClick?: () => unknown;
}>`
  padding-left: ${({ $leftPadding = undefined }) =>
    $leftPadding ? '15px' : undefined};
  cursor: ${({ onClick = undefined }) => (onClick ? 'pointer' : undefined)};
  font-size: ${({ fontSize = 'base' }) => FONT_SIZE[fontSize]};
  &:hover {
    font-weight: ${({ maxFontWeight = '600' }) => FONT_WEIGHT[maxFontWeight]};
    ${({ $zoom = false, fontSize = 'base' }) =>
      $zoom &&
      `
    font-size: calc(${FONT_SIZE[fontSize]} + 2px);
    `}
  }
`;

export default ListItem;
