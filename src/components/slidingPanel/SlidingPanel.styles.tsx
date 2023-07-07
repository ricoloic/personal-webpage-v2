import styled from 'styled-components';
import { Colors, CssSize } from '../../types';

export const Wrapper = styled.div<{
  right?: CssSize;
  left?: CssSize;
  width: CssSize;
  transform: string;
  overflow: string;
  background: Colors;
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: ${({ right = undefined }) => right};
  left: ${({ left = undefined }) => left};
  width: ${({ width }) => width};
  transform: ${({ transform }) => transform};
  background: ${({ background }) => background};
  transition: 0.3s ease-out;
  overflow: ${({ overflow }) => overflow};
  z-index: 999;
`;

export const ContentContainer = styled.div`
  max-height: 60vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Wrapper;
