'use client';

import React from 'react';
import styled from 'styled-components';
import MobileLayout from '@/components/layout/MobileLayout';
import LoginButtons from '@/components/auth/LoginButtons';

export default function LoginPage() {
  return (
    <MobileLayout fullScreen={true}>
      <LoginContainer>
        <LoginButtons />
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