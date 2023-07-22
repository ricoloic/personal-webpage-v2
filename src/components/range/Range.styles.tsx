import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Label = styled.label`
  user-select: none;
`;

const height = '15px';

export const RangeSlider = styled.input`
  -webkit-appearance: none;
  width: calc(100% - 90px);
  border-radius: 5px;
  height: calc(${height} - (${height} / 2));
  background: ${COLORS.gray100};
  outline: none;
  padding: 0;
  margin: 0;

  &::-moz-range-thumb {
    appearance: none;
    width: ${height};
    height: ${height};
    border: 0;
    border-radius: 50%;
    background: ${COLORS.gray900};
    cursor: pointer;
    transition: background 0.15s ease-in-out;
    transform: translateY(calc(-${height} / 4));

    &:hover {
      background: ${COLORS.gray100};
    }
  }
  &::-webkit-slider-thumb {
    appearance: none;
    width: ${height};
    height: ${height};
    border: 0;
    border-radius: 50%;
    background: ${COLORS.gray900};
    cursor: pointer;
    transition: background 0.15s ease-in-out;
    transform: translateY(calc(-${height} / 4));

    &:hover {
      background: ${COLORS.gray100};
    }
  }

  &:active::-moz-range-thumb {
    background: ${COLORS.gray100};
  }
  &:active::-webkit-slider-thumb {
    background: ${COLORS.gray100};
  }

  // Focus state
  &:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${COLORS.gray100},
      0 0 0 calc(${height} / 3) ${COLORS.gray900};
  }
  &:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${COLORS.gray100},
      0 0 0 calc(${height} / 3) ${COLORS.gray100};
  }
  &:focus::-moz-range-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${COLORS.gray100},
      0 0 0 calc(${height} / 3) ${COLORS.gray900};
  }
  &:hover::-moz-range-thumb {
    box-shadow: 0 0 0 calc(${height} / 6) ${COLORS.gray100},
      0 0 0 calc(${height} / 3) ${COLORS.gray100};
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
  color: ${COLORS.white};
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: ${COLORS.gray900};
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
    border-right: 7px solid ${COLORS.gray900};
    border-bottom: 7px solid transparent;
    content: '';
  }
`;

export default { RangeSlider, RangeValue, Label };
