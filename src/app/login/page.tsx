// src/app/login/page.tsx
'use client';

import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import LoginButtons from '@/components/auth/LoginButtons';
import { LoginContainer, ButtonsWrapper, BottomIndicator } from './styles';

export default function LoginPage() {
  return (
    <LoginContainer>
      <ButtonsWrapper>
        <LoginButtons />
      </ButtonsWrapper>
    </LoginContainer>
  );
}
