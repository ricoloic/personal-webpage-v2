import styled from 'styled-components';

export const Wrapper = styled.div<{ $disabled?: boolean }>`
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
  margin: 0;

  ${({ $disabled = false, theme }) =>
    $disabled &&
    `
  cursor: not-allowed;
  background-color: ${theme.black};
  background-image: linear-gradient(to top, ${theme.black}, ${theme.black} 33%);
  `}

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;

  border: 1px solid ${({ theme }) => theme.black};
  border-radius: 0.25em;
  padding: 5px 10px;

  cursor: pointer;
  line-height: 1.1;

  // Optional styles
  // remove for transparency
  background-color: ${({ theme }) => theme.white};
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.white},
    ${({ theme }) => theme.white} 33%
  );

  // Custom arrow
  &:not(.select--multiple)::after {
    content: '';
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: ${({ theme }) => theme.black};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  // Interim solution until :focus-within has better support
  select:focus + .focus {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid var(--select-focus);
    border-radius: inherit;
  }
`;

export const Select = styled.select`
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;

  // Stack above custom arrow
  z-index: 1;

  // Remove dropdown arrow in IE10 & IE11
  // @link https://www.filamentgroup.com/lab/select-css.html
  &::-ms-expand {
    display: none;
  }

  // Remove focus outline, will add on alternate element
  outline: none;

  color: ${({ theme }) => theme.black};
`;

export const Label = styled.label`
  user-select: none;
  color: ${({ theme }) => theme.black};
`;

export default { Label, Select, Wrapper };
