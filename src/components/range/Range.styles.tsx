import styled from 'styled-components';

export const Label = styled.label`
  user-select: none;
  color: ${({ theme }) => theme.black};
`;

const height = '15px';

export const RangeSlider = styled.input`
  -webkit-appearance: none;
  width: calc(100% - 90px);
  border-radius: 5px;
  height: calc(${height} - (${height} / 2));
  background: ${({ theme }) => theme.black};
  outline: none;
  padding: 0;
  margin: 0;

  &::-moz-range-thumb {
    appearance: none;
    width: ${height};
    height: ${height};
    border: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.white};
    cursor: pointer;
    transition: background 0.15s ease-in-out;
    transform: translateY(calc(-${height} / 4));

    &:hover {
      background: ${({ theme }) => theme.black};
    }
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: ${height};
    height: ${height};
    border: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.white};
    cursor: pointer;
    transition: background 0.15s ease-in-out;
    transform: translateY(calc(-${height} / 4));

    &:hover {
      background: ${({ theme }) => theme.black};
    }
  }

  &:active::-moz-range-thumb {
    background: ${({ theme }) => theme.black};
  }
  &:active::-webkit-slider-thumb {
    background: ${({ theme }) => theme.black};
  }

  // Focus state
  &::-webkit-slider-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${({ theme }) => theme.black},
      0 0 0 calc(${height} / 3) ${({ theme }) => theme.white};
  }
  &::-webkit-slider-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${({ theme }) => theme.black},
      0 0 0 calc(${height} / 3) ${({ theme }) => theme.black};
  }
  &::-moz-range-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${({ theme }) => theme.black},
      0 0 0 calc(${height} / 3) ${({ theme }) => theme.white};
  }
  &::-moz-range-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${({ theme }) => theme.black},
      0 0 0 calc(${height} / 3) ${({ theme }) => theme.black};
  }

  &::-webkit-slider-runnable-track {
    appearance: none;
    max-height: calc(${height} - (${height} / 2));
  }
  &::-moz-range-track {
    appearance: none;
    max-height: calc(${height} - (${height} / 2));
  }
`;

export const RangeValue = styled.span`
  display: inline-block;
  position: relative;
  width: 60px;
  color: ${({ theme }) => theme.white};
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: ${({ theme }) => theme.black};
  padding: 2px 10px;
  margin-left: 8px;
  user-select: none;

  &:after {
    position: absolute;
    top: 6px;
    left: -7px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid ${({ theme }) => theme.black};
    border-bottom: 7px solid transparent;
    content: '';
  }
`;

export default { RangeSlider, RangeValue, Label };
