'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { OAuthProvider, OAuthMessage } from '@/types/auth.types';
import { ButtonContainer, AppleButton, GoogleButton, ErrorMessage } from './styles';

// 환경변수에서 API URL 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다.');
}

// OAuth 엔드포인트들
const OAUTH_ENDPOINTS = {
  GOOGLE: `${API_BASE_URL}/oauth2/authorization/google`,
  APPLE: `${API_BASE_URL}/oauth2/authorization/apple`,
} as const;

// 타입 확장: window 인터페이스에 ReactNativeWebView 추가
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface LoginButtonsProps {
  className?: string;
}

// 네이티브 앱 환경 체크
const isInApp = (): boolean => {
  return typeof window !== 'undefined' && window.ReactNativeWebView !== undefined;
};

// 네이티브 앱으로 메시지 전송
const sendToApp = (message: OAuthMessage): boolean => {
  if (isInApp() && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    return true;
  }
  return false;
};

const LoginButtons: React.FC<LoginButtonsProps> = ({ className }) => {
  const { isLoading, error } = useAuth();

  const handleOAuthLogin = (provider: OAuthProvider) => {
    try {
      // 네이티브 앱인 경우
      if (isInApp()) {
        sendToApp({
          type: 'oauth_login',
          provider,
        });
        return;
      }

      // 웹에서 OAuth 페이지로 리디렉션
      const loginUrl = provider === 'google' ? OAUTH_ENDPOINTS.GOOGLE : OAUTH_ENDPOINTS.APPLE;
      window.location.href = loginUrl;
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);
    }
  };

  const handleGoogleLogin = () => handleOAuthLogin('google');
  const handleAppleLogin = () => handleOAuthLogin('apple');

  return (
    <ButtonContainer className={className}>
      <AppleButton onClick={handleAppleLogin} disabled={isLoading}>
        {isLoading ? '로그인 중...' : 'Apple로 시작하기'}
      </AppleButton>
      <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
        {isLoading ? '로그인 중...' : 'Google로 시작하기'}
      </GoogleButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ButtonContainer>
  );
};

export default LoginButtons;
