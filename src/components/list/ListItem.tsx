import React from 'react';
import { Children, FontSizesKeys } from '../../types';
import { ListItem as StyleListItem } from './List.styles';
import FONT_SIZE from '../../constants/size';

interface Props {
  children: Children;
  fontSize?: FontSizesKeys;
  onClick?: () => void;
  leftPadding?: boolean;
}

function ListItem({
  children,
  fontSize = 'base',
  onClick = undefined,
  leftPadding = false,
}: Props) {
  return (
    <StyleListItem
      $leftPadding={leftPadding}
      $pointer={!!onClick}
      fontSize={FONT_SIZE[fontSize]}
    >
      {children}
    </StyleListItem>
  );
}

export default ListItem;
