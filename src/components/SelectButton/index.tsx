// src/components/SelectButton/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { SelectButtonContainer, ButtonText, ImageWrapper } from './styles';

export interface SelectButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  mood?: 'verygood' | 'good' | 'soso' | 'bad' | 'toobad';
}

const moodToLabel = {
  verygood: '너무 좋아',
  good: '좋아',
  soso: '그냥그래',
  bad: '안좋아',
  toobad: '너무 안좋아',
};

const SelectButton: React.FC<SelectButtonProps> = ({
  label,
  selected = false,
  onClick,
  disabled = false,
  className,
  mood,
}) => {
  return (
    <SelectButtonContainer
      selected={selected}
      onClick={onClick}
      disabled={disabled}
      className={className}
      mood={mood}
    >
      {selected && mood && (
        <ImageWrapper>
          <Image
            src={`/images/${mood}.png`}
            alt={moodToLabel[mood] || label}
            width={24}
            height={24}
          />
        </ImageWrapper>
      )}
      <ButtonText selected={selected} mood={mood}>
        {label}
      </ButtonText>
    </SelectButtonContainer>
  );
};

export default SelectButton;
