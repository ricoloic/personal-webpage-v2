import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Wrapper = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 20px;
  background-color: ${COLORS.white};
`;

export default Wrapper;
