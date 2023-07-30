import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Wrapper = styled.div`
  position: sticky;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background-color: ${COLORS.white};
`;

export default Wrapper;
