// src/app/record/styles.ts
import styled from 'styled-components';

// EmotionList 스타일 수정 - 상단 여백 줄임
export const EmotionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
  padding: 0 16px;
  margin-top: -10px; /* 상단 여백 줄임 (20px에서 -10px로) */
`;

// EmotionOption 스타일 수정 - 감정별 배경색 추가
export const EmotionOption = styled.button<{ selected: boolean; emotionId?: string }>`
  width: 100%;
  max-width: 268px;
  min-height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.selected && props.emotionId) {
      switch (props.emotionId) {
        case 'very_happy':
          return '#F0FAFD';
        case 'happy':
          return '#D2F6FF';
        case 'neutral':
          return '#00AFD8';
        case 'sad':
          return '#198ABB';
        case 'very_sad':
          return '#254A7E';
        default:
          return '#F0FAFD';
      }
    }
    return 'white';
  }};
  border: 2px solid ${(props) => (props.selected ? '#00AFD8' : '#E0E0E0')};
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  padding: 12px 24px;

  @media (max-width: 360px) {
    max-width: 100%;
    min-height: 70px;
    padding: 10px 16px;
  }

  &:hover {
    border-color: ${(props) => (props.selected ? '#00AFD8' : '#BDBDBD')};
  }
`;

// EmotionText 스타일 수정 - 감정별 텍스트 색상 추가
export const EmotionText = styled.span<{ selected: boolean; emotionId?: string }>`
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  color: ${(props) => {
    if (props.selected && props.emotionId) {
      switch (props.emotionId) {
        case 'very_happy':
        case 'happy':
          return '#00AFD8'; // 밝은 배경색에는 파란색 텍스트
        case 'neutral':
        case 'sad':
        case 'very_sad':
          return 'white'; // 어두운 배경색에는 흰색 텍스트
        default:
          return '#00AFD8';
      }
    }
    return '#333';
  }};

  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

export const EmotionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const EmotionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 360px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

export const BottomButtonArea = styled.div`
  position: fixed;
  bottom: 20px; /* 하단에서 좀 더 위로 올림 */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  background-color: transparent; /* 배경 투명하게 변경 */
  z-index: 50;
  max-width: 480px;
  margin: 0 auto;
  flex-shrink: 0;

  button {
    width: 90% !important;
    max-width: 356px !important;
    height: 44px !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 버튼에 그림자 추가 */
  }

  @media (max-width: 400px) {
    padding: 16px 16px;
    bottom: 15px; /* 작은 화면에서는 약간 더 위로 */
  }
`;

export const Header = styled.div`
  margin-bottom: 25px;
  text-align: center;
  margin-top: 30px; /* 상단 여백 추가 */
`;

export const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const Label = styled.p`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
`;
