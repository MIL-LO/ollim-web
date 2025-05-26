'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { JWTUtils } from '@/utils/jwt';

export default function OAuthCallback() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // 쿠키에서 토큰 가져오기 (미들웨어에서 설정함)
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        if (accessToken && refreshToken) {
          console.log('OAuth 콜백: 토큰 발견');

          // JWT에서 사용자 정보 추출
          const userInfo = JWTUtils.extractUserInfo(accessToken);

          if (userInfo) {
            console.log('사용자 상태:', userInfo.status);

            // useAuth의 login 함수 사용 (상태 관리 일원화)
            const result = await login(accessToken, refreshToken);

            if (result.success) {
              // 쿠키 정리 (선택사항)
              document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              document.cookie = 'auth_status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

              // 사용자 상태에 따른 리디렉션
              if (userInfo.status === 'PENDING') {
                console.log('PENDING 사용자 - 온보딩으로 이동');
                router.replace('/onboarding/step1');
              } else if (userInfo.status === 'ACTIVE') {
                console.log('ACTIVE 사용자 - 홈으로 이동');
                router.replace('/home');
              } else {
                console.log('알 수 없는 상태 - 로그인으로 이동');
                router.replace('/login');
              }
            } else {
              console.error('로그인 실패:', result.error);
              router.replace('/login?error=auth_failed');
            }
          } else {
            console.error('JWT 파싱 실패');
            router.replace('/login?error=invalid_token');
          }
        } else {
          console.error('토큰이 없음');
          router.replace('/login?error=no_token');
        }
      } catch (error) {
        console.error('OAuth 콜백 처리 오류:', error);
        router.replace('/login?error=callback_failed');
      }
    };

    handleOAuthCallback();
  }, [router, login]);

  // 로딩 화면 표시
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
