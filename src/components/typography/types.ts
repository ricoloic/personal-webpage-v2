import { Children, CssSize, FontSizesKeys, FontWeightsKeys } from '../../types';

export interface TypographyProps {
  children: Children;
  $fontSize?: FontSizesKeys | undefined;
  $fontWeight?: FontWeightsKeys | undefined;
  $my?: CssSize | undefined;
  $userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all' | undefined;
}
