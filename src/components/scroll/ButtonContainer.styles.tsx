import styled from 'styled-components';
import { CssSize } from '../../types';

export const Wrapper = styled.div<{
  $top?: CssSize | undefined;
  $bottom?: CssSize | undefined;
}>`
  position: absolute;
  top: ${({ $top = undefined }) => $top};
  bottom: ${({ $bottom = undefined }) => $bottom};
  left: calc(50%);
  transform: translateX(calc(-50%));
`;

export default Wrapper;
