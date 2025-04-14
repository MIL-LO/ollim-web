import React from 'react';
import {
  DatePickerContainer,
  Label,
  Required,
  InputContainer,
  StyledInput,
  CalendarIcon,
} from './DatePicker.styles';
import { FaCalendarAlt } from 'react-icons/fa';

interface DatePickerProps {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  required = false,
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
  fullWidth = false,
  disabled = false,
}) => {
  // 현재 날짜를 YYYY-MM-DD 형식으로 얻기
  const today = new Date().toISOString().split('T')[0];

  // 입력값이 있는지 확인 (명시적으로 boolean으로 변환)
  const hasValue: boolean = Boolean(value && value.trim() !== '');

  // 값이 변경될 때 onChange 콜백 호출
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <DatePickerContainer $fullWidth={fullWidth}>
      {label && (
        <Label>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <InputContainer>
        <StyledInput
          type="date"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          $hasValue={hasValue}
          max={today} // 오늘 날짜 이후는 선택 불가능하게 설정
        />
        <CalendarIcon>
          <FaCalendarAlt />
        </CalendarIcon>
      </InputContainer>
    </DatePickerContainer>
  );
};

export default DatePicker;
