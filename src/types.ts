import { ComponentType, ReactElement } from 'react';
import COLORS from './constants/colors';
import FONT_SIZE, { FONT_WEIGHT } from './constants/sizes';
import PAGES from './constants/pages';
import COLOR_PALETTES from './constants/colorPalettes';

export type Children = ReactElement | ReactElement[] | string;
export type Component = ComponentType<unknown>;

export type CssSize =
  | 0
  | `${number}px`
  | `${number}em`
  | `${number}rem`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`;
export type CssFlexDirections =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';
export type CssPadding =
  | `${CssSize}`
  | `${CssSize} ${CssSize}`
  | `${CssSize} ${CssSize} ${CssSize}`
  | `${CssSize} ${CssSize} ${CssSize} ${CssSize}`;
export type CssMargin =
  | `${CssSize}`
  | `${CssSize} ${CssSize}`
  | `${CssSize} ${CssSize} ${CssSize}`
  | `${CssSize} ${CssSize} ${CssSize} ${CssSize}`;
export type CssWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type ColorsKeys = keyof typeof COLORS;
export type Colors = (typeof COLORS)[ColorsKeys];

export type FontWeightsKeys = keyof typeof FONT_WEIGHT;
export type FontWeights = (typeof FONT_WEIGHT)[FontWeightsKeys];

export type FontSizesKeys = keyof typeof FONT_SIZE;
export type FontSizes = (typeof FONT_SIZE)[FontSizesKeys];

export type PagesKeys = keyof typeof PAGES;
export type Pages = (typeof PAGES)[PagesKeys];

export type ColorPalettesKeys = keyof typeof COLOR_PALETTES;
export type ColorPalettes = (typeof COLOR_PALETTES)[ColorPalettesKeys];
