'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';
import type { User, AuthState, OAuthMessage, OAuthProvider } from '@/types/auth.types';
import { ButtonContainer, AppleButton, GoogleButton, ErrorMessage } from './styles';

// 환경변수에서 API URL 가져오기
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다.');
}

// OAuth 엔드포인트들 - 환경변수 기반으로 동적 생성
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
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  // 인증 상태 체크 및 토큰 저장 리스너
  useEffect(() => {
    // 로컬 스토리지에서 토큰 체크
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken');
      const status = localStorage.getItem('auth_status') as
        | 'PENDING'
        | 'ACTIVE'
        | 'WITHDRAWN'
        | null;

      if (accessToken) {
        // 사용자 정보 생성
        const user: User = {
          id: '',
          name: '',
          email: '',
          provider: status === 'APPLE' ? 'apple' : 'google',
          status: status || 'ACTIVE',
        };

        // 새 상태 객체 생성
        const newAuthState: AuthState = {
          isLoggedIn: true,
          isLoading: false,
          error: null,
          user,
          tokens: {
            accessToken,
            refreshToken: localStorage.getItem('refreshToken') || '',
          },
        };

        setAuth(newAuthState);

        // 인증 상태에 따른 리디렉션
        if (status === 'PENDING') {
          router.push('/onboarding/step1');
        } else if (status === 'ACTIVE') {
          router.push('/home');
        }
      }
    };

    // 초기 로딩 시 체크
    checkAuth();

    // 스토리지 이벤트 리스너 (다른 탭이나 창에서 로그인한 경우)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    // OAuth 메시지 이벤트 리스너
    const handleOAuthMessage = (event: MessageEvent) => {
      if (typeof event.data === 'string' && event.data.includes('accessToken')) {
        try {
          const data = JSON.parse(event.data);
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken || '');
            localStorage.setItem('auth_status', data.status || 'ACTIVE');
            checkAuth();
          }
        } catch (err) {
          console.error('OAuth 메시지 처리 오류:', err);
        }
      }
    };

    window.addEventListener('message', handleOAuthMessage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleOAuthMessage);
    };
  }, [router, setAuth]);

  const handleOAuthLogin = (provider: OAuthProvider) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // 네이티브 앱인 경우
      if (isInApp()) {
        sendToApp({
          type: 'oauth_login',
          provider,
        });
        setAuth((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // 웹에서 OAuth 페이지로 리디렉션 - 환경변수 기반 URL 사용
      const loginUrl = provider === 'google' ? OAUTH_ENDPOINTS.GOOGLE : OAUTH_ENDPOINTS.APPLE;

      window.location.href = loginUrl;
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: `${provider === 'google' ? '구글' : '애플'} 로그인 중 오류가 발생했습니다.`,
      }));
    }
  };

  const handleGoogleLogin = () => handleOAuthLogin('google');
  const handleAppleLogin = () => handleOAuthLogin('apple');

  return (
    <ButtonContainer className={className}>
      <AppleButton onClick={handleAppleLogin} disabled={auth.isLoading}>
        {auth.isLoading ? '로그인 중...' : 'Apple로 시작하기'}
      </AppleButton>
      <GoogleButton onClick={handleGoogleLogin} disabled={auth.isLoading}>
        {auth.isLoading ? '로그인 중...' : 'Google로 시작하기'}
      </GoogleButton>

      {auth.error && <ErrorMessage>{auth.error}</ErrorMessage>}
    </ButtonContainer>
  );
};

export default LoginButtons;
