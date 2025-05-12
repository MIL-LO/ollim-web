// 재사용 Input 컴포넌트
// step단, search, inputModal 컴포넌트에서 사용

import React from 'react';
import { Button } from '@/components/common';
import { ExitSVG, SearchSVG } from '../../../../public/svg/Icons';
import styled from 'styled-components';

interface InputProps {
  // 레이아웃관련프롭
  label?: string; // 제목
  required?: boolean; // 필수여부 * 체크
  fullWidth?: boolean;
  withRecommendButton?: boolean;
  color?: string;
  onRecommendClick?: () => void;

  // Input관련프롭
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  required = false,
  withRecommendButton = false,
  fullWidth = false,
  color = '#00AFD8',
  onRecommendClick,

  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
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
        <InputWrap $withButton={withRecommendButton}>
          {/* <SearchSVG color="#A5B7C6" /> */}
          <StyledInput
            $hasValue={value.length > 0}
            $color={color}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          />
          <button>
            <ExitSVG />
          </button>
        </InputWrap>

        {/* <SearchSVG /> */}
        {/* {withRecommendButton && (
          <Button variant="recommend" size="xsmall" onClick={onRecommendClick}>
            추천받기
          </Button>
        )} */}
      </InputGroup>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
`;

const RequiredMark = styled.span`
  color: #f44336;
  margin-left: 4px;
`;

const InputGroup = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
`;

const InputWrap = styled.div<{ $withButton?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 40px; /* 높이 수정 40px */
  padding: 8px 16px;
  border: 0px solid #e0e0e0;
  border-radius: 16px;
  background-color: #ffffff;

  transition: all 0.2s ease;
  width: 100%;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);

  ${(props) =>
    props.$withButton &&
    `
    padding-right: 90px;
  `}

  svg, button {
    width: 16px;
    height: 16px;
  }
`;

const StyledInput = styled.input<{ $hasValue: boolean; $color: string }>`
  outline: none;
  border: none;

  width: 100%;
  height: 100%;

  font-size: 16px;
  color: ${(props) => (props.$hasValue ? props.$color : '#616161')};

  &::placeholder {
    color: #a5b7c6;
  }

  /* &:focus {
      border-color: #00afd8;
      box-shadow: 0 0 0 1px rgba(0, 175, 216, 0.2);
    } */

  &:disabled {
    background-color: #f5f5f5;
    color: #a5b7c6;
    cursor: not-allowed;
  }
`;

InputGroup.defaultProps = {
  className: 'input-group',
};

const buttonPositionStyle = `
  .input-group .recommend-button {
    position: absolute;
    right: 8px;
  }
`;
