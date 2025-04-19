// src/app/login/styles.ts
import styled from 'styled-components';
import LoginButtons from '@/components/auth/LoginButtons';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  background-image: url('/images/splash.svg');
  background-size: cover;
  background-position: center;
  max-width: 100%;

  /* 웹에서 배경이 너무 커지지 않도록 제한 */
  @media (min-width: 1200px) {
    max-width: 480px;
    margin: 0 auto;
    background-size: contain;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    padding: 0 14px;
  }

  @media (max-height: 667px) {
    justify-content: center; /* 높이가 작은 화면에서는 중앙 정렬 */
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;

  /* 웹에서도 최대 너비 제한 */
  max-width: 480px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    margin-bottom: 50px;
  }

  @media (max-height: 667px) {
    margin-bottom: 40px;
  }
`;

export const CenteredLoginButtons = styled(LoginButtons)`
  width: 100%;
  max-width: 320px;

  /* 웹에서 버튼이 너무 커지지 않도록 제한 */
  @media (min-width: 1200px) {
    max-width: 320px; /* 최대 너비 유지 */
  }

  @media (max-width: 480px) {
    max-width: 280px;
  }

  @media (max-width: 360px) {
    max-width: 260px;
  }
`;

export const BottomIndicator = styled.div`
  width: 30%;
  height: 5px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  /* 웹에서 크기 제한 */
  max-width: 120px;

  @media (max-width: 768px) {
    width: 35%;
    height: 4px;
  }

  @media (max-width: 480px) {
    width: 40%;
    height: 4px;
    bottom: 8px;
  }

  @media (max-height: 667px) {
    bottom: 6px;
    height: 3px;
  }
`;
