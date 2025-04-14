import styled from 'styled-components';

export const DatePickerContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
`;

export const Required = styled.span`
  color: #f44336;
  margin-left: 4px;
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
`;

export const StyledInput = styled.input<{ $hasValue: boolean }>`
  height: 40px;
  padding: 8px 16px;
  padding-right: 40px;
  border: 0px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 16px;
  color: ${(props) => (props.$hasValue ? '#00AFD8' : '#616161')};
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    border-color: #00afd8;
    box-shadow: 0 0 0 1px rgba(0, 175, 216, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #9e9e9e;
    cursor: not-allowed;
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
`;

export const CalendarIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #9e9e9e;
`;

InputContainer.defaultProps = {
  className: 'datepicker-input-group',
};
