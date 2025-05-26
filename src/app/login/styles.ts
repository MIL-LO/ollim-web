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

  /* 태블릿 크기 */
  @media (max-width: 768px) {
    padding: 0 16px;
  }

  /* 작은 모바일 화면 */
  @media (max-width: 480px) {
    padding: 0 14px;
  }

  /* 매우 작은 화면 (375x667) - 하단 정렬 유지 */
  @media (max-width: 375px) {
    padding: 0 12px;
    justify-content: flex-end; /* 하단 정렬 유지 */
  }

  /* 높이가 작은 화면에서도 하단 정렬 유지 */
  @media (max-height: 667px) {
    justify-content: flex-end; /* 하단 정렬 유지 */
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  margin-bottom: 100px; /* 기본 마진 증가 */
  display: flex;
  justify-content: center;
  max-width: 480px;

  /* 태블릿 */
  @media (max-width: 768px) {
    margin-bottom: 80px;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    margin-bottom: 70px;
  }

  /* 매우 작은 화면 (375x667) */
  @media (max-width: 375px) {
    margin-bottom: 60px; /* 충분한 하단 여백 확보 */
  }

  /* 높이가 작은 화면 */
  @media (max-height: 667px) {
    margin-bottom: 50px;
  }

  /* 매우 높이가 작은 화면 */
  @media (max-height: 600px) {
    margin-bottom: 40px;
  }

  /* 매우 높이가 작은 화면 (iPhone SE 등) */
  @media (max-height: 568px) {
    margin-bottom: 30px;
  }
`;

export const CenteredLoginButtons = styled(LoginButtons)`
  width: 100%;
  max-width: 320px;

  /* 웹에서 버튼이 너무 커지지 않도록 제한 */
  @media (min-width: 1200px) {
    max-width: 320px;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    max-width: 280px;
  }

  /* 매우 작은 화면 (375x667) */
  @media (max-width: 375px) {
    max-width: 100%;
  }

  /* 최소 화면 */
  @media (max-width: 360px) {
    max-width: 100%;
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
  max-width: 120px; /* 웹에서 크기 제한 */

  /* 태블릿 */
  @media (max-width: 768px) {
    width: 35%;
    height: 4px;
  }

  /* 작은 모바일 */
  @media (max-width: 480px) {
    width: 40%;
    height: 4px;
    bottom: 8px;
  }

  /* 매우 작은 화면 (375x667) */
  @media (max-width: 375px) {
    width: 45%;
    height: 4px;
    bottom: 6px;
  }

  /* 높이가 작은 화면 */
  @media (max-height: 667px) {
    bottom: 6px;
    height: 3px;
  }

  /* 매우 높이가 작은 화면 */
  @media (max-height: 600px) {
    bottom: 4px;
    height: 3px;
  }
`;
