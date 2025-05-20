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
        const user: User = {
          id: '',
          name: '',
          email: '',
          provider: status === 'APPLE' ? 'apple' : 'google',
        };

        // 새 상태 객체 생성
        const newAuthState: AuthState = {
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

      // 팝업 창으로 OAuth 인증 처리
      const width = 600;
      const height = 800;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      // OAuth 요청 시작 기록
      localStorage.setItem('oauth_in_progress', 'true');

      // 인증 URL로 팝업 열기
      const oauthWindow = window.open(
        `${API_URL}/oauth2/authorization/google`,
        'oauth_google',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
      );

      if (!oauthWindow) {
        // 팝업 차단된 경우
        alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
        setAuth((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // 팝업 상태 확인
      const checkPopupInterval = setInterval(() => {
        if (oauthWindow.closed) {
          clearInterval(checkPopupInterval);
          setAuth((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        try {
          // 팝업 페이지의 URL 확인
          const popupUrl = oauthWindow.location.href;

          // OAuth 콜백 URL로 이동했는지 확인
          if (popupUrl.includes('/login/oauth2/code/google')) {
            try {
              // 페이지 내용 가져오기
              const content = oauthWindow.document.body.innerText;

              // JSON 형식인지 확인
              if (
                content &&
                (content.includes('accessToken') || content.includes('refreshToken'))
              ) {
                try {
                  // JSON 파싱
                  const jsonData = JSON.parse(content);

                  // 토큰 저장
                  localStorage.setItem('accessToken', jsonData.accessToken);
                  localStorage.setItem('refreshToken', jsonData.refreshToken || '');
                  localStorage.setItem('auth_status', jsonData.status || 'ACTIVE');

                  // 팝업 창 닫기
                  oauthWindow.close();
                  clearInterval(checkPopupInterval);

                  // 인증 상태 업데이트
                  setAuth({
                    isLoggedIn: true,
                    isLoading: false,
                    error: null,
                    user: {
                      id: '',
                      name: '',
                      email: '',
                      provider: 'google',
                    },
                  });

                  // 상태에 따라 리다이렉트
                  if (jsonData.status === 'PENDING') {
                    router.push('/onboarding/step1');
                  } else {
                    router.push('/home');
                  }
                } catch (error) {
                  console.error('JSON 파싱 오류:', error);

                  // JSON 파싱 실패 시 auth-handler.html로 리다이렉트
                  oauthWindow.location.href = `${window.location.origin}/auth-handler.html`;
                }
              }
            } catch (error) {
              // CORS 오류 발생 시 auth-handler.html로 리다이렉트
              try {
                oauthWindow.location.href = `${window.location.origin}/auth-handler.html`;
              } catch (redirectError) {
                // 추가 오류 무시
              }
            }
          }
        } catch (error) {
          // CORS 오류 무시
        }
      }, 500);

      // 30초 타임아웃
      setTimeout(() => {
        if (!oauthWindow.closed) {
          oauthWindow.close();
        }
        clearInterval(checkPopupInterval);
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          error: '로그인 시간이 초과되었습니다. 다시 시도해주세요.',
        }));
      }, 30000);
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
