import React from 'react';
import { RadioGroupContainer, RadioOption, HiddenRadio } from './RadioGroup.styles';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  direction?: 'horizontal' | 'vertical';
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  direction = 'horizontal',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <RadioGroupContainer direction={direction}>
      {options.map((option) => (
        <RadioOption key={option.value} active={value === option.value}>
          <HiddenRadio
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          {option.label}
        </RadioOption>
      ))}
    </RadioGroupContainer>
  );
};

export default RadioGroup;
