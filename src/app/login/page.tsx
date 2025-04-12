'use client';

import React from 'react';
import styled from 'styled-components';
import MobileLayout from '@/components/layout/MobileLayout';
import LoginButtons from '@/components/auth/LoginButtons';

export default function LoginPage() {
  return (
    <MobileLayout fullScreen={true}>
      <LoginContainer>
        <ButtonsWrapper>
          <CenteredLoginButtons />
        </ButtonsWrapper>
      </LoginContainer>
    </MobileLayout>
  );
}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;
    background-image: url('/images/splash.png');
    background-size: cover;
    background-position: center;
`;

// 버튼을 감싸는 wrapper에 마진 바텀과 너비 100% 적용
const ButtonsWrapper = styled.div`
    width: 100%;
    margin-bottom: 80px;
    display: flex;
    justify-content: center;
`;

// LoginButtons 컴포넌트를 확장하여 너비를 100%로 설정
const CenteredLoginButtons = styled(LoginButtons)`
    width: 100%;
    max-width: 320px;
`;

const BottomIndicator = styled.div`
    width: 30%;
    height: 5px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
`;