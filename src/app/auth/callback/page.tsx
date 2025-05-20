'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const status = searchParams.get('status');

    if (accessToken) {
      // 토큰 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken || '');
      localStorage.setItem('auth_status', status || 'ACTIVE');

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

      // 상태에 따른 페이지 이동
      switch (status) {
        case 'PENDING':
          // 최초 가입 시 온보딩으로 이동
          router.push('/onboarding/step1');
          break;
        case 'ACTIVE':
          // 정상 활성화된 계정은 홈으로 이동
          router.push('/home');
          break;
        case 'WITHDRAWN':
          // 탈퇴한 계정은 로그인 페이지로 이동
          console.error('Withdrawn account attempted login');
          router.push('/login');
          break;
        default:
          // 알 수 없는 상태는 로그인 페이지로
          console.error('Unknown account status:', status);
          router.push('/login');
      }
    } else {
      // 토큰이 없는 경우 로그인 페이지로
      router.push('/login');
    }
  }, [searchParams, router, setAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">로그인 처리 중...</h1>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
} 