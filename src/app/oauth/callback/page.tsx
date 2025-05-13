// src/app/oauth/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState, AuthState } from '@/atoms/authAtoms';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    // URL에서 토큰과 상태 정보 추출
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const status = searchParams.get('status');
    const provider = searchParams.get('provider') as 'apple' | 'google' | null;

    if (accessToken && refreshToken) {
      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('auth_status', status || 'ACTIVE');

      // Recoil 상태 업데이트 - AuthState 타입에 맞게 구성
      const newAuthState: AuthState = {
        isLoggedIn: true,
        isLoading: false,
        error: null,
        user: {
          id: 'user-from-oauth',
          name: 'OAuth User',
          email: '',
          provider: provider === 'apple' || provider === 'google' ? provider : null,
        },
      };

      setAuth(newAuthState);

      // 상태에 따른 리디렉션
      if (status === 'PENDING') {
        router.push('/signup/additional');
      } else {
        router.push('/home');
      }
    } else {
      // 오류 처리
      setAuth((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        error: '인증에 실패했습니다. 다시 시도해주세요.',
      }));
      router.push('/login');
    }
  }, [searchParams, router, setAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">인증 처리 중...</h1>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}
