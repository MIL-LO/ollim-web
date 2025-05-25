'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';
import type { User } from '@/types/auth.types';

export default function OAuthCallback() {
  const router = useRouter();
  const [, setAuth] = useRecoilState(authState);

  useEffect(() => {
    // 쿠키에서 토큰 가져오기 (미들웨어에서 설정함)
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    const status = getCookie('auth_status') as 'PENDING' | 'ACTIVE' | 'WITHDRAWN' | null;

    if (accessToken && refreshToken) {
      // localStorage에도 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('auth_status', status || 'ACTIVE');
      localStorage.setItem(
        'auth_tokens',
        JSON.stringify({
          accessToken,
          refreshToken,
        })
      );

      // 상태 업데이트
      const user: User = {
        id: '',
        name: '',
        email: '',
        provider: 'oauth',
        status: status || 'ACTIVE',
      };

      setAuth({
        isLoggedIn: true,
        isLoading: false,
        error: null,
        user,
        tokens: { accessToken, refreshToken },
      });
    }

    // 이 페이지는 미들웨어에서 이미 리다이렉트되므로 여기까지 오면 안 됨
    // 혹시 모르니 홈으로 리다이렉트
    router.replace('/home');
  }, [router, setAuth]);

  // 아무것도 렌더링하지 않음
  return null;
}
