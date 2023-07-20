import styled from 'styled-components';
import { CssSize, FontSizesKeys, FontWeightsKeys } from '../../types';
import FONT_SIZE, { FONT_WEIGHT } from '../../constants/sizes';

const ListItem = styled.li<{
  $leftPadding?: boolean;
  fontSize?: FontSizesKeys;
  maxFontWeight?: FontWeightsKeys;
  $zoom?: boolean;
  onClick?: () => unknown;
  $gap?: CssSize;
  marginY?: CssSize;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ $gap = '5px' }) => $gap};
  ${({ marginY = '10px' }) => `
    margin-top: ${marginY};
    margin-bottom: ${marginY};
  `}
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
