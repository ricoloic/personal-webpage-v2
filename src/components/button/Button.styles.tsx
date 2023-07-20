import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  line-height: 10px;
  padding: 5px 10px;
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  transition: 0.1s;
  cursor: pointer;
  &:hover * {
    transform: scale(1.05);
  }
  div {
    user-select: none;
  }
`;

export default Button;
