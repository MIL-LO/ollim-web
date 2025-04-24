// src/app/login/page.tsx
'use client';

import React from 'react';
import LoginButtons from '@/components/auth/LoginButtons';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginContainer>
      <ButtonsWrapper>
        <LoginButtons />
      </ButtonsWrapper>
    </LoginContainer>
  );
}

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
  max-width: 100%;
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
