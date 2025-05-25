// src/components/auth/LoginButtons.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState, AuthState, User } from '@/atoms/authAtoms';
import { ButtonContainer, AppleButton, GoogleButton, ErrorMessage } from './styles';

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
const sendToApp = (message: any): boolean => {
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
      const status = localStorage.getItem('auth_status');

      if (accessToken) {
        // 사용자 정보 생성
        const user: { provider: string; name: string; id: string; email: string } = {
          id: '',
          name: '',
          email: '',
          provider: status === 'APPLE' ? 'apple' : 'google',
        };

        // 새 상태 객체 생성
        const newAuthState: {
          isLoading: boolean;
          isLoggedIn: boolean;
          error: null;
          user: { provider: string; name: string; id: string; email: string };
        } = {
          isLoggedIn: true,
          isLoading: false,
          error: null,
          user,
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

  const handleGoogleLogin = () => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // 네이티브 앱인 경우
      if (isInApp()) {
        sendToApp({
          type: 'oauth_login',
          provider: 'google',
        });
        setAuth((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // API URL 설정
      const API_URL = 'https://api.millo-ollim.com';

      // 구글 로그인 페이지로 리디렉션
      window.location.href = `${API_URL}/oauth2/authorization/google`;
    } catch (error) {
      console.error('구글 로그인 오류:', error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '구글 로그인 중 오류가 발생했습니다.',
      }));
    }
  };

  const handleAppleLogin = async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

      if (isInApp()) {
        // 네이티브 앱에서는 앱에 메시지 전송
        sendToApp({
          type: 'oauth_login',
          provider: 'apple',
        });
      } else {
        // 구글 로그인과 유사한 방식으로 처리
        // API URL 설정
        const API_URL = 'https://api.millo-ollim.com';

        // 팝업 창으로 OAuth 인증 처리
        const width = 600;
        const height = 800;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        // OAuth 요청 시작 기록
        localStorage.setItem('oauth_in_progress', 'true');

        // 인증 URL로 팝업 열기
        const oauthWindow = window.open(
          `${API_URL}/oauth2/authorization/apple`,
          'oauth_apple',
          `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
        );

        // 구글 로그인과 동일한 로직으로 처리
        // ...
      }
    } catch (error) {
      console.error('Apple 로그인 에러:', error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '애플 로그인에 실패했습니다.',
      }));
    }
  };

  return (
    <ButtonContainer className={className}>
      <AppleButton onClick={handleAppleLogin} disabled={auth.isLoading}>
        Apple로 시작하기
      </AppleButton>
      <GoogleButton onClick={handleGoogleLogin} disabled={auth.isLoading}>
        Google로 시작하기
      </GoogleButton>

      {auth.error && <ErrorMessage>{auth.error}</ErrorMessage>}
    </ButtonContainer>
  );
};

export default LoginButtons;
