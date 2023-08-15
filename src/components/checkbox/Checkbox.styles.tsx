import styled from 'styled-components';

export const Label = styled.label`
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.black};
`;

export const Input = styled.input`
  cursor: pointer;
  appearance: none;
  width: 1em;
  height: 1em;
  border: 3px solid ${({ theme }) => theme.black};
  font: inherit;
  margin-right: 10px;
  margin-bottom: -0.125em; // to align with text
  margin-left: 0;
  &[type='checkbox'] {
    border-radius: 0.25em;
  }
  &:checked {
    border-color: transparent;
    background: ${({ theme }) => theme.black};
    background: linear-gradient(
        ${({ theme }) => theme.black},
        ${({ theme }) => theme.black}
      )
      border-box;
    box-shadow: 0 0 0 2px inset ${({ theme }) => theme.black};
  }
  &:not(:checked):hover {
    border-color: transparent;
    background: linear-gradient(transparent, transparent) padding-box,
      linear-gradient(
          ${({ theme }) => theme.black},
          ${({ theme }) => theme.black}
        )
        border-box;
  }
`;

export default { Label, Input };
