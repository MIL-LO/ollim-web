import styled from 'styled-components';
import Image from 'next/image';

// 색상 맵핑
const moodColorMap = {
  very_happy: '#F0FAFD',
  happy: '#D2F6FF',
  neutral: '#00AFD8',
  sad: '#198ABB',
  very_sad: '#254A7E',
};

// 이 부분은 기존 코드 유지...
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
  background-color: transparent;
  position: relative;
  max-width: 480px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 0;
  position: relative;
  margin-top: 20px;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 2px;
  background-color: #e3f8fb;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: #00afd8;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 40px; // 20px에서 40px로 증가시켜 아래로 내림
  padding-bottom: 100px;
`;

export const Header = styled.div`
  margin-bottom: 35px; // 25px에서 35px로 증가
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const FormSection = styled.div`
  margin-top: -10px; // -10px에서 10px로 변경하여 아래로 내림
  width: 100%;
`;

export const Label = styled.p`
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
`;

export const EmotionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  margin-right: 16px; // 마진을 16px로 증가
  display: flex;
  align-items: center;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmotionButton = styled.button<{ selected: boolean; emotionId?: string }>`
  width: 268px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.selected && props.emotionId) {
      return moodColorMap[props.emotionId];
    }
    return props.selected ? '#F0FAFD' : 'white';
  }};
  color: ${(props) => {
    if (props.selected && props.emotionId) {
      if (
        props.emotionId === 'neutral' ||
        props.emotionId === 'sad' ||
        props.emotionId === 'very_sad'
      ) {
        return 'white';
      }
      return '#00AFD8';
    }
    return '#333';
  }};
  border: 1px solid ${(props) => (props.selected ? '#00AFD8' : '#E0E0E0')};
  border-radius: 100px;
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s ease;
  /* 그림자 색상 적용 */
  box-shadow: 0 2px 6px ${(props) => (props.selected ? '#00AFD81A' : '#FFFFFF4D')};

  &:hover {
    border-color: ${(props) => (props.selected ? '#00AFD8' : '#BDBDBD')};
  }
`;

export const ButtonText = styled.span<{ selected?: boolean; emotionId?: string }>`
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  color: ${(props) => {
    if (props.selected) {
      if (
        props.emotionId === 'neutral' ||
        props.emotionId === 'sad' ||
        props.emotionId === 'very_sad'
      ) {
        return 'white'; // 어두운 배경색일 때는 흰색 텍스트
      }
      return '#00AFD8'; // 밝은 배경색일 때는 파란색 텍스트
    }
    return '#333';
  }};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 24px 40px 24px;
  background-color: #f0fafd;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  z-index: 5;

  /* Button 컴포넌트에 적용될 스타일 */
  button {
    width: 356px !important;
    height: 44px !important;
  }
`;
