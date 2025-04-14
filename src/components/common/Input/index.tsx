import React from 'react';
import { Button } from '@/components/common';
import { InputContainer, StyledInput, InputLabel, RequiredMark, InputGroup } from './Input.styles';

interface InputProps {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  withRecommendButton?: boolean;
  onRecommendClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  required = false,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  fullWidth = false,
  disabled = false,
  withRecommendButton = false,
  onRecommendClick,
}) => {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {label && (
        <InputLabel>
          {label}
          {required && <RequiredMark>*</RequiredMark>}
        </InputLabel>
      )}
      <InputGroup>
        <StyledInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          $hasValue={value.length > 0}
          $withButton={withRecommendButton}
        />
        {withRecommendButton && (
          <Button variant="recommend" size="xsmall" onClick={onRecommendClick}>
            추천받기
          </Button>
        )}
      </InputGroup>
    </InputContainer>
  );
};

export default Input;
