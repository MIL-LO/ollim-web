// src/styles/RecordComplete.styles.ts
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

// 애니메이션 정의
export const bounce = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
`;

// 스타일 컴포넌트
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  background-color: #f0fafd;
  padding: 0 24px;
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 24px;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* 콘텐츠를 상단과 하단 사이에 분배 */
  justify-content: space-between;

  @media (max-width: 480px) {
    padding: 0 10px;
    padding-bottom: 20px;
    /* 모바일에서도 건너뛰기까지 보이도록 조정 */
    justify-content: space-between;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    max-width: 100%;
    padding: 0 32px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 2;
  /* 상단 여백 조정 - 더 아래로 위치하도록 */
  padding-top: 15vh;
  /* 하단 여백 줄임 */

  @media (max-width: 480px) {
    /* 모바일에서는 더 많은 여백 확보 */
    padding-top: 20vh;
  }

  @media (max-height: 667px) {
    /* 작은 화면에서는 상단 여백 줄임 */
    padding-top: 8vh;
  }
`;

export const MainTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  @media (max-width: 360px) {
    font-size: 20px;
    margin-bottom: 6px;
  }
`;

export const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 18px;
    line-height: 1.3;
  }

  @media (max-height: 667px) {
    margin-bottom: 14px;
    font-size: 14px;
  }
`;

export const CharacterImageWrapper = styled.div`
  margin: 16px 0 24px;

  @media (max-width: 480px) {
    margin: 12px 0 18px;
  }

  @media (max-height: 667px) {
    margin: 10px 0 14px;
  }
`;

// 통통 튀는 이미지 컴포넌트
export const BouncingImage = styled(Image)`
  animation: ${bounce} 2s infinite ease-in-out;

  @media (max-width: 480px) {
    width: 140px !important;
    height: 140px !important;
  }

  @media (max-width: 360px) {
    width: 120px !important;
    height: 120px !important;
  }

  @media (max-height: 667px) {
    width: 100px !important;
    height: 100px !important;
  }
`;

export const StatText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  @media (max-width: 360px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

export const NewCharacterText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;
    line-height: 1.3;
  }

  @media (max-height: 667px) {
    margin-bottom: 12px;
    font-size: 12px;
  }
`;

export const Highlight = styled.span`
  font-size: 1.2em;
  font-weight: 700;
  color: #00afd8;
`;

export const BottomSection = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  /* 항상 하단에 배치하면서 적절한 여백 유지 */
  margin-top: auto;
  padding-top: 20px;

  @media (max-width: 480px) {
    padding-top: 5px;
    margin-bottom: 60px;
  }

  @media (max-width: 390px) {
    padding-top: 10px;
    margin-bottom: 20px;
  }

  @media (max-height: 667px) {
    padding-top: 5px;
  }
`;

export const StreakCount = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    margin-bottom: 18px;
  }

  @media (max-width: 360px) {
    margin-bottom: 14px;
  }
`;

export const RecommendButton = styled.button`
  width: 100%;
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00afd8;
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 14px;
  padding: 16px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    height: 76px;
    border-radius: 14px;
    font-size: 13px;
    padding: 12px;
  }

  @media (max-width: 360px) {
    height: 68px;
    padding: 10px;
    font-size: 12px;
    border-radius: 12px;
  }

  @media (max-height: 667px) {
    height: 64px;
    padding: 8px;
  }

  &:hover {
    background-color: #0095b8;
  }
`;

export const RecommendButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 6px;
  }

  @media (max-width: 360px) {
    font-size: 15px;
    margin-top: 4px;
  }
`;

export const SkipButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 16px;
  cursor: pointer;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 8px 12px;
  }

  @media (max-width: 360px) {
    font-size: 14px;
    padding: 6px 10px;
  }

  &:hover {
    color: #00afd8;
  }
`;
