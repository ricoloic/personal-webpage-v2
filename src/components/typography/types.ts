import { Children, CssSize, FontSizesKeys, FontWeightsKeys } from '../../types';

export interface TypographyProps {
  children: Children;
  fontSize?: FontSizesKeys;
  fontWeight?: FontWeightsKeys;
  my?: CssSize;
  userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all';
}
