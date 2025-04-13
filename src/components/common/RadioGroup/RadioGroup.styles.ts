import styled from 'styled-components';

export const RadioGroupContainer = styled.div<{ direction: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  gap: ${({ direction }) => (direction === 'horizontal' ? '12px' : '8px')};
  margin: 0 auto;
`;

export const RadioOption = styled.label<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 57px;
  height: 36px;
  background-color: #ffffff;
  color: ${({ active }) => (active ? '#00B8D4' : '#A5B7C6')};
  border: ${({ active }) => (active ? '1px solid #00B8D4' : 'none')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '700' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border: ${({ active }) => (active ? '1px solid #00B8D4' : '1px solid #BDBDBD')};
  }
`;

export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
`;
