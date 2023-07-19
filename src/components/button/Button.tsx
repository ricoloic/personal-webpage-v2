import React, { MouseEventHandler } from 'react';
import { Children } from '../../types';
import StyleButton from './Button.styles';

interface Props {
  children: Children;
  icon?: Children;
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button({
  children,
  name,
  onClick = undefined,
  icon = undefined,
}: Props) {
  if (icon) {
    return (
      <StyleButton type="button" name={name} onClick={onClick}>
        {icon}
        <div>{children}</div>
      </StyleButton>
    );
  }

  return (
    <StyleButton type="button" name={name} onClick={onClick}>
      {children}
    </StyleButton>
  );
}

export default Button;
