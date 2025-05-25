'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface GlobalAuthGuardProps {
  children: React.ReactNode;
}

// 인증이 필요하지 않은 공개 페이지들
const PUBLIC_ROUTES = ['/login', '/auth/callback'];

// 특정 사용자 상태만 접근 가능한 페이지들
const ROUTE_PERMISSIONS = {
  '/onboarding': ['PENDING'],
  '/onboarding/step1': ['PENDING'],
  '/onboarding/step2': ['PENDING'],
  '/onboarding/step3': ['PENDING'],
};

export const GlobalAuthGuard: React.FC<GlobalAuthGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // useAuth 훅에서 초기화가 완료되면 isInitialized를 true로 설정
    if (!auth.isLoading) {
      setIsInitialized(true);
    }
  }, [auth.isLoading]);

  // 페이지 접근 권한 확인
  useEffect(() => {
    if (!isInitialized) return;

    console.log(
      `페이지 접근 확인: ${pathname}, 로그인: ${auth.isLoggedIn}, 상태: ${auth.user?.status}`
    );

    // 공개 페이지는 접근 허용
    if (PUBLIC_ROUTES.includes(pathname)) {
      // 로그인된 사용자가 로그인 페이지에 접근하면 리디렉션
      if (pathname === '/login' && auth.isLoggedIn) {
        if (auth.user?.status === 'PENDING') {
          router.push('/onboarding/step1');
        } else if (auth.user?.status === 'ACTIVE') {
          router.push('/home');
        }
      }
      return;
    }

    // 로그인되지 않은 사용자는 로그인 페이지로
    if (!auth.isLoggedIn) {
      console.log('로그인 필요 - 로그인 페이지로 이동');
      router.push('/login');
      return;
    }

    // 페이지별 권한 확인
    const allowedStatuses = ROUTE_PERMISSIONS[pathname as keyof typeof ROUTE_PERMISSIONS];

    if (allowedStatuses) {
      // 특정 권한이 필요한 페이지
      if (!allowedStatuses.includes(auth.user?.status || '')) {
        console.log(`권한 없음: ${pathname}, 필요: ${allowedStatuses}, 현재: ${auth.user?.status}`);

        if (auth.user?.status === 'PENDING') {
          router.push('/onboarding/step1');
        } else if (auth.user?.status === 'ACTIVE') {
          router.push('/home');
        } else {
          // WITHDRAWN 사용자는 로그아웃
          auth.logout();
        }
        return;
      }
    } else {
      // 기본적으로 ACTIVE 상태만 접근 가능
      if (auth.user?.status !== 'ACTIVE') {
        console.log(`기본 권한 필요: ACTIVE, 현재: ${auth.user?.status}`);

        if (auth.user?.status === 'PENDING') {
          router.push('/onboarding/step1');
        } else {
          router.push('/login');
        }
        return;
      }
    }
  }, [pathname, auth.isLoggedIn, auth.user?.status, isInitialized, router, auth]);

  // 초기화 중 로딩 화면
  if (!isInitialized || auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">인증 상태 확인 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
