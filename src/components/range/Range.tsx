import React, { ChangeEvent, useState } from 'react';
import { Label, RangeSlider, RangeValue } from './Range.styles';

interface Props {
  name: string;
  title?: string;
  defaultValue?: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

function Range({
  name,
  title = undefined,
  onChange,
  defaultValue = 0,
  max,
  min,
  step = undefined,
}: Props) {
  const [value, setValue] = useState<string | number>(defaultValue ?? 0);

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(Number.parseFloat(event.target.value));
  };

  return (
    <div>
      {title && <Label>{title}</Label>}
      <RangeSlider
        name={name}
        type="range"
        onInput={handleRangeChange}
        value={value}
        min={min}
        max={max}
        step={step}
      />
      <RangeValue>{value}</RangeValue>
    </div>
  );
}

export default Range;
