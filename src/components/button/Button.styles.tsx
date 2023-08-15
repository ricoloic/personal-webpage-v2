import styled from 'styled-components';

export const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  padding: 10px;
  line-height: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  border: ${({ theme }) => theme.black} 3px solid;
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
