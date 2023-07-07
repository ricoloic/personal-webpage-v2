import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Button = styled.button`
  font-size: 18px;
  padding: 10px;
  border: 2px solid ${COLORS.black};
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.black};
    color: ${COLORS.white};
  }
`;

export default Button;
