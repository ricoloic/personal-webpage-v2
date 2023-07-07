import ICONS from './constants';
import { FontSizesKeys } from '../../types';
import FONT_SIZE from '../../constants/size';

interface Props {
  name: keyof typeof ICONS;
  fontSize?: FontSizesKeys;
  onClick?: () => void | undefined;
}

function Icon({ name, fontSize = 'base', onClick = undefined }: Props) {
  const icon = ICONS[name]({
    fontSize: FONT_SIZE[fontSize],
    onClick,
    cursor: onClick ? 'pointer' : undefined,
  });
  return icon;
}

export default Icon;
