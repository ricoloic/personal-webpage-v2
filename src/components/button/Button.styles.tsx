import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  line-height: 10px;
  padding: 5px 10px;
  border: 2px solid ${COLORS.gray900};
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.gray900};
    color: ${COLORS.white};
  }
  div {
    user-select: none;
  }
`;

export default Button;
