import styled from 'styled-components';
import { Colors } from '../../types';

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -30px 0 0 -30px;
  z-index: 9999;
`;

export const AdjacentBackground = styled.div<{ $background: Colors }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ $background }) => $background};
  opacity: 0.5;
  z-index: 9999;
`;

export default { LoaderWrapper, AdjacentBackground };
