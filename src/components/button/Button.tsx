import React, { MouseEventHandler } from 'react';
import { Children } from '../../types';
import StyleButton from './Button.styles';

interface Props {
  children: Children;
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button({ children, name, onClick = undefined }: Props) {
  return (
    <StyleButton type="button" name={name} onClick={onClick}>
      {children}
    </StyleButton>
  );
}

export default Button;
