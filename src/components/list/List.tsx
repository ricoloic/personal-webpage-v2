import React from 'react';
import { Children, Colors } from '../../types';
import { ListItem, List as StyleList } from './List.styles';

interface Props {
  children: Children;
  color?: Colors;
}

function List({ children, color = undefined }: Props) {
  return <StyleList color={color}>{children}</StyleList>;
}

List.Item = ListItem;

export default List;
