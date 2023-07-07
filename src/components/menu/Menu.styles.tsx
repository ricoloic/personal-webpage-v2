import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Wrapper = styled.div`
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
