import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Label = styled.label`
  cursor: pointer;
  user-select: none;
`;

export const Input = styled.input`
  cursor: pointer;
  appearance: none;
  width: 1em;
  height: 1em;
  border: 0.1em solid ${COLORS.white};
  font: inherit;
  margin-right: 10px;
  margin-bottom: -0.125em; // to align with text
  margin-left: 0;
  &[type='checkbox'] {
    border-radius: 0.25em;
  }
  &:checked {
    border-color: transparent;
    background: linear-gradient(${COLORS.white}, ${COLORS.white}) border-box;
    box-shadow: 0 0 0 0.1em inset ${COLORS.blue900};
  }
  &:not(:checked):hover {
    border-color: transparent;
    background: linear-gradient(transparent, transparent) padding-box,
      linear-gradient(${COLORS.white}, ${COLORS.white}) border-box;
  }
`;

export default { Label, Input };
