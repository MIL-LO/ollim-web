// src/app/oauth/callback/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState, AuthState, User } from '@/atoms/authAtoms';

// SearchParams를 사용하는 컴포넌트를 별도로 분리
const OAuthCallbackContent = () => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  React.useEffect(() => {
    // URL 파라미터는 window.location.search에서 직접 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const status = searchParams.get('status');
    const provider = searchParams.get('provider');

    if (accessToken && refreshToken) {
      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('auth_status', status || 'ACTIVE');

      // 사용자 정보 생성
      const user: User = {
        id: 'user-from-oauth',
        name: 'OAuth User',
        email: '',
        provider: provider === 'apple' || provider === 'google' ? provider : 'unknown',
      };

      // Recoil 상태 업데이트
      const newAuthState: AuthState = {
        isLoggedIn: true,
        isLoading: false,
        error: null,
        user,
      };

      setAuth(newAuthState);

      // 상태에 따른 리디렉션
      if (status === 'PENDING') {
        router.push('/onboarding/step1');
      } else {
        router.push('/home');
      }
    } else {
      // 오류 처리
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '인증에 실패했습니다. 다시 시도해주세요.',
      }));
      router.push('/login');
    }
  }, [router, setAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">인증 처리 중...</h1>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

// 로딩 중 표시할 컴포넌트
const CallbackLoading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
    <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

// 메인 컴포넌트
export default function OAuthCallback() {
  return (
    <Suspense fallback={<CallbackLoading />}>
      <OAuthCallbackContent />
    </Suspense>
  );
}
