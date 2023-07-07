import { ReactElement } from 'react';
import COLORS from './constants/colors';
import FONT_SIZE from './constants/size';

export type Children = ReactElement | ReactElement[] | string;

export type CssSize =
  | number
  | `${number}px`
  | `${number}em`
  | `${number}rem`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | `${number}`;

export type ColorsKeys = keyof typeof COLORS;
export type Colors = typeof COLORS[ColorsKeys];

export type FontSizesKeys = keyof typeof FONT_SIZE;
export type FontSizes = typeof FONT_SIZE[FontSizesKeys];
