import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  line-height: 10px;
  background-color: transparent;
  color: ${COLORS.white};
  border: ${COLORS.white} 3px solid;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  div {
    user-select: none;
  }
`;

export default Button;
