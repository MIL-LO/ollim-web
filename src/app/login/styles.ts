// src/app/login/styles.ts
import styled from 'styled-components';
import LoginButtons from '@/components/auth/LoginButtons';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  background-image: url('/images/splash.svg');
  background-size: cover;
  background-position: center;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  margin-bottom: 80px;
  display: flex;
  justify-content: center;
`;

export const CenteredLoginButtons = styled(LoginButtons)`
  width: 100%;
  max-width: 320px;
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
`;
