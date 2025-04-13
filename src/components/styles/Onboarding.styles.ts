// components/styles/Onboarding.styles.tsx
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  background-color: #f0fafd;
  position: relative;
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 15px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 30px;
  padding-bottom: 100px; /* 버튼 영역을 위한 하단 패딩 추가 */
`;

export const Header = styled.div`
  margin-bottom: 45px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 17px;
  font-weight: 700;
  color: #212121;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #424242;
  text-align: center;
`;

export const FormSection = styled.div`
  margin-bottom: 40px; /* 질문 간격 증가 */
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 16px;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
  width: 358px; /* 전체 너비 고정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

export const InputWrapper = styled.div`
  flex: 1; /* 남은 공간 채우기 */
`;

export const RecommendButton = styled.button`
  width: 81px; /* 버튼 너비 고정 */
  height: 40px; /* 버튼 높이 수정 */
  padding: 0;
  background-color: #e0f7fa;
  color: #00afd8;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #b2ebf2;
  }

  &:active {
    background-color: #80deea;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px 24px 24px 24px;
  background-color: #f0fafd;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export const StyledButton = styled.button`
  width: 175px;
  height: 44px;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
`;

export const PlaceButtonsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: flex-start;
  margin: 0;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 8px;

  /* 스크롤바 스타일링 (웹킷 기반 브라우저) */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d0d0d0;
    border-radius: 10px;
  }
`;

export const PlaceButton = styled.button<{ selected: boolean }>`
  min-width: fit-content;
  padding: 10px 16px;
  background-color: ${(props) => (props.selected ? '#00B8D4' : '#ffffff')};
  color: ${(props) => (props.selected ? '#ffffff' : '#A5B7C6')};
  border: ${(props) => (props.selected ? 'none' : '1px solid #E0E0E0')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.selected ? '#00A5C0' : '#F5F5F5')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectBox = styled.select`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  color: #616161;
  appearance: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

  &:focus {
    box-shadow: 0 0 0 1px rgba(0, 175, 216, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #9e9e9e;
    cursor: not-allowed;
  }
`;

export const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #9e9e9e;
  pointer-events: none;
`;

export const MBTIOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
`;

export const MBTIOption = styled.button<{ selected: boolean }>`
  padding: 10px 0;
  background-color: ${(props) => (props.selected ? '#00B8D4' : '#ffffff')};
  color: ${(props) => (props.selected ? '#ffffff' : '#A5B7C6')};
  border: ${(props) => (props.selected ? 'none' : '1px solid #E0E0E0')};
  border-radius: 10px;
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? '#00A5C0' : '#F5F5F5')};
  }
`;
