import React, { ChangeEvent, useState } from 'react';
import { Label, Select, Wrapper } from './Dropdown.styles';

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  title?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange: (value: string) => void;
  options: Option[];
}

function Dropdown({
  name,
  title = undefined,
  disabled = false,
  defaultValue = '',
  onChange,
  options,
}: Props) {
  const [value, setValue] = useState<string | number>(defaultValue);

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      {title && <Label>{title}</Label>}{' '}
      <Wrapper $disabled={disabled}>
        <Select
          value={value}
          name={name}
          disabled={disabled}
          onChange={handleSelectChange as any}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Wrapper>
    </div>
  );
}

export default Dropdown;
