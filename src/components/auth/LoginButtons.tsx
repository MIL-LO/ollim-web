// src/components/auth/LoginButtons.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';
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
        setAuth({
          isLoggedIn: true,
          user: {
            id: '', // 토큰에서 디코딩하거나 API 호출로 가져와야 할 수 있음
            name: '',
            email: '',
            provider: status === 'APPLE' ? 'apple' : 'google',
          },
          isLoading: false,
          error: null,
        });

        // 인증 상태에 따른 리디렉션
        if (status === 'PENDING') {
          router.push('/signup/additional');
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

    // 네이티브 앱에서 메시지 리스너
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.type === 'auth_token') {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('auth_status', data.status);
            checkAuth();
          }
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
    };
  }, [router, setAuth]);

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
        // 웹 환경에서는 직접 OAuth URL로 리다이렉트
        // API URI를 직접 사용하지 않고 비워둠 (백엔드에서 설정하도록)
        window.location.href = '/oauth/apple';
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

  const handleGoogleLogin = () => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    // OAuth URL - API URI를 직접 사용하지 않고 비워둠 (백엔드에서 설정하도록)
    const googleOAuthURL = '/oauth/google';

    try {
      if (isInApp()) {
        // 네이티브 앱에서는 앱에 메시지 전송
        sendToApp({
          type: 'oauth_login',
          provider: 'google',
        });
        return;
      }

      // 팝업 창으로 OAuth 인증 처리
      const width = 600;
      const height = 800;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const authPopup = window.open(
        googleOAuthURL,
        'oauth_google',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
      );

      if (!authPopup) {
        // 팝업 차단된 경우
        alert('팝업이 차단되었습니다. 로그인 후 인증 정보를 확인해주세요.');
        window.location.href = googleOAuthURL;
        return;
      }

      // 메인 창에서 메시지 수신 이벤트 리스너 설정
      const messageHandler = (event: MessageEvent) => {
        try {
          // 메시지 데이터 확인
          if (typeof event.data === 'string' && event.data.startsWith('{')) {
            const data = JSON.parse(event.data);

            // 인증 메시지인지 확인
            if (data.type === 'AUTH_SUCCESS' && data.payload) {
              // 리스너 제거
              window.removeEventListener('message', messageHandler);

              // 토큰 저장
              localStorage.setItem('accessToken', data.payload.accessToken);
              localStorage.setItem('refreshToken', data.payload.refreshToken);
              localStorage.setItem('auth_status', data.payload.status || 'ACTIVE');

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

              // 페이지 이동
              if (data.payload.status === 'PENDING') {
                router.push('/onboarding/step1');
              } else {
                router.push('/home');
              }
            }
          }
        } catch (error) {
          console.error('메시지 처리 중 오류:', error);
        }
      };

      // 메시지 이벤트 리스너 등록
      window.addEventListener('message', messageHandler);

      // 팝업 상태 확인 인터벌 (fallback 메커니즘)
      const checkPopup = setInterval(() => {
        try {
          if (authPopup.closed) {
            clearInterval(checkPopup);
            window.removeEventListener('message', messageHandler);
            setAuth((prev) => ({ ...prev, isLoading: false }));
            console.log('팝업 창이 닫혔습니다');
            return;
          }

          // 팝업 창의 URL이 변경되었는지 확인
          const popupUrl = authPopup.location.href;

          // 응답이 반환된 것으로 보이는 경우
          if (popupUrl.includes('/oauth/callback') || popupUrl.includes('/oauth-result')) {
            try {
              const popupContent = authPopup.document.body.innerText || '';

              if (
                popupContent &&
                popupContent.trim().startsWith('{') &&
                popupContent.trim().endsWith('}')
              ) {
                try {
                  // JSON 내용 추출 및 파싱
                  const authData = JSON.parse(popupContent);

                  if (authData.accessToken && authData.refreshToken) {
                    // 팝업 창 닫기
                    authPopup.close();
                    clearInterval(checkPopup);
                    window.removeEventListener('message', messageHandler);

                    // 토큰 저장
                    localStorage.setItem('accessToken', authData.accessToken);
                    localStorage.setItem('refreshToken', authData.refreshToken);
                    localStorage.setItem('auth_status', authData.status || 'ACTIVE');

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

                    // 상태에 따라 페이지 이동
                    if (authData.status === 'PENDING') {
                      router.push('/onboarding/step1');
                    } else {
                      router.push('/home');
                    }
                  }
                } catch (jsonError) {
                  console.error('팝업 내용 파싱 오류:', jsonError);
                }
              }
            } catch (accessError) {
              // 크로스 오리진 오류는 무시 - 대안 메커니즘을 통해 처리
              console.log('팝업 접근 제한 (크로스 오리진)');
            }
          }
        } catch (error) {
          // 크로스 오리진 접근 오류는 무시
        }
      }, 500);

      // 타임아웃 설정 (30초)
      setTimeout(() => {
        clearInterval(checkPopup);
        window.removeEventListener('message', messageHandler);

        if (authPopup && !authPopup.closed) {
          authPopup.close();
        }

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
