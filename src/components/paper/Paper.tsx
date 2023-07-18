import styled from 'styled-components';
import { Colors, CssPadding, CssSize } from '../../types';

export default styled.div<{
  color?: Colors;
  backgroundColor?: Colors;
  borderRadius?: CssSize;
  padding?: CssPadding;
  $hoverEffect?: boolean;
}>`
  color: ${({ color = undefined }) => color};
  background-color: ${({ backgroundColor = undefined }) => backgroundColor};
  border-radius: ${({ borderRadius = '3px' }) => borderRadius};
  padding: ${({ padding = '1em' }) => padding};
  transition: all 0.2sec ease-in-out;
  &:hover {
    transform: ${({ $hoverEffect = false }) =>
      $hoverEffect ? 'scale(0.99)' : undefined};
  }
`;
