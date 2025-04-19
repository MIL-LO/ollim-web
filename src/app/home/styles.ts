import styled, { keyframes } from 'styled-components';

// 부드러운 위아래 움직임 애니메이션
const float = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
`;

// 물결 효과 애니메이션
const wave = keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 100% 0; }
`;

// 물방울 애니메이션
const bubbleRise = keyframes`
    0% {
        transform: translateY(0) scale(0.8);
        opacity: 0;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-80px) scale(1.2);
        opacity: 0;
    }
`;

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00afd8;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  z-index: 1;
  overflow: hidden; // 애니메이션 요소가 넘치지 않도록

  @media (max-width: 480px) {
    height: 100vh; // 모바일에서 전체 높이 사용
  }

  @media (max-height: 667px) {
    height: 100%; // 작은 화면 높이에서 자연스럽게 조정
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  position: relative;

  img {
    animation: ${float} 6s ease-in-out infinite;
    z-index: 2;
  }

  @media (max-width: 480px) {
    padding: 0 16px; // 작은 화면에서 이미지 좌우 여백 추가
  }

  @media (max-width: 360px) {
    padding: 0 12px; // 더 작은 화면에서 여백 조정
  }
`;

export const MusicIconWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 40px;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    top: 60px;
    left: 30px;
  }

  @media (max-width: 480px) {
    top: 50px;
    left: 20px;
  }

  @media (max-height: 667px) {
    top: 40px; // 화면 높이가 작을 때 위치 조정
  }

  @media (max-width: 360px) {
    top: 40px;
    left: 16px;
  }
`;

export const WaveContainer = styled.div`
  position: absolute;
  bottom: 100px; // 네비게이션 바 위에 위치하도록 조정
  left: 0;
  width: 100%;
  height: 20px;
  background: url('/images/wave.png') repeat-x; // 물결 이미지 경로
  background-size: 40px 20px;
  animation: ${wave} 10s linear infinite;
  z-index: 1;
  opacity: 0.7;
`;

export const Bubble = styled.div<{ size: string; left: string; delay: string; duration: string }>`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  left: ${(props) => props.left};
  bottom: 190px; // 위치 조정 가능
  animation: ${bubbleRise} ${(props) => props.duration} ease-in-out infinite;
  animation-delay: ${(props) => props.delay};
  z-index: 3;
`;
