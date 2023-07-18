import React, { ChangeEvent } from 'react';
import { Input, Label } from './Checkbox.styles';

interface Props {
  name: string;
  title: string;
  onClick: (checked: boolean) => void;
  defaultChecked?: boolean;
}

function Checkbox({ name, onClick, title, defaultChecked = undefined }: Props) {
  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    onClick(event.target.checked);
  };
  return (
    <Label>
      <Input
        type="checkbox"
        name={name}
        onClick={handleClick as any}
        defaultChecked={defaultChecked ?? false}
      />
      {title}
    </Label>
  );
}

export default Checkbox;
