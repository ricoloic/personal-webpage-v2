import styled from 'styled-components';
import { Colors, CssSize } from '../../types';
import COLORS from '../../constants/colors';

export const Wrapper = styled.div<{
  $open?: boolean;
  $right?: CssSize;
  $left?: CssSize;
  width: CssSize;
  transform: string;
  overflow?: string;
  $background: Colors;
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: ${({ $right = undefined }) => $right};
  left: ${({ $left = undefined }) => $left};
  width: ${({ width }) => `min(${width}, 100%)`};
  transform: ${({ transform }) => transform};
  background: ${({ $background }) => $background};
  transition: 0.3s ease-out;
  overflow: ${({ overflow = undefined }) => overflow};
  z-index: 999;
  ${({ $open }) => $open && `box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);`}
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${COLORS.white};
`;

export const CloseContainer = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
`;

export const ContentContainer = styled.div<{ $gap?: CssSize }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = undefined }) => $gap};
  padding: 20px;
`;

export default { Wrapper, CloseContainer, ContentContainer, WrapperContent };
