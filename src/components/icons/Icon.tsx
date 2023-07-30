import React from 'react';
import { Icon as Iconify } from '@iconify/react';
import COLORS from '../../constants/colors';
import { ColorsKeys, FontSizesKeys } from '../../types';
import FONT_SIZE from '../../constants/sizes';

interface Props {
  name: string;
  fontSize?: FontSizesKeys;
  onClick?: () => void | undefined;
  color?: ColorsKeys;
  style?: React.CSSProperties;
}

function Icon({
  name,
  fontSize = 'base',
  onClick = undefined,
  color = undefined,
  style = {},
}: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      style={{
        display: 'inline-block',
        cursor: onClick ? 'pointer' : undefined,
        padding: '12px',
        ...style,
      }}
    >
      <Iconify
        icon={name}
        color={color ? COLORS[color] : undefined}
        width={FONT_SIZE[fontSize]}
        height={FONT_SIZE[fontSize]}
      />
    </div>
  );
}

export default Icon;
