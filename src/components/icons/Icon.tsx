import React from 'react';
import COLORS from '../../constants/colors';
import ICONS from './constants';
import { ColorsKeys, FontSizesKeys } from '../../types';
import FONT_SIZE from '../../constants/size';

interface Props {
  name: keyof typeof ICONS;
  fontSize?: FontSizesKeys;
  onClick?: () => void | undefined;
  color?: ColorsKeys;
}

function Icon({
  name,
  fontSize = 'base',
  onClick = undefined,
  color = undefined,
}: Props) {
  const icon = ICONS[name]({
    fontSize: FONT_SIZE[fontSize],
    onClick,
    cursor: onClick ? 'pointer' : undefined,
    color: color ? COLORS[color] : undefined,
  });
  return (
    <div
      style={{
        display: 'inline-block',
        width: FONT_SIZE[fontSize],
        height: FONT_SIZE[fontSize],
      }}
    >
      {icon}
    </div>
  );
}

export default Icon;
