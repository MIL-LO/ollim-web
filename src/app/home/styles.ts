import styled from 'styled-components';

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
