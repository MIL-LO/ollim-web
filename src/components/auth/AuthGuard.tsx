import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/authAtoms';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // 인증 필요 여부
  allowedStatus?: Array<'PENDING' | 'ACTIVE' | 'WITHDRAWN'>; // 허용된 사용자 상태
  redirectTo?: string; // 리디렉션 경로
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  allowedStatus = ['ACTIVE'],
  redirectTo = '/login',
}) => {
  const auth = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    // 로딩 중이면 대기
    if (auth.isLoading) return;

    // 인증이 필요한 페이지인데 로그인되지 않은 경우
    if (requireAuth && !auth.isLoggedIn) {
      console.log('인증 필요, 로그인 페이지로 이동');
      router.push(redirectTo);
      return;
    }

    // 로그인되어 있지만 허용되지 않은 상태인 경우
    if (auth.isLoggedIn && auth.user && !allowedStatus.includes(auth.user.status)) {
      console.log(`허용되지 않은 사용자 상태: ${auth.user.status}`);

      // PENDING 상태면 온보딩으로, 그 외는 에러 페이지로
      if (auth.user.status === 'PENDING') {
        router.push('/onboarding/step1');
      } else {
        router.push('/error?code=invalid_status');
      }
      return;
    }
  }, [auth.isLoading, auth.isLoggedIn, auth.user, requireAuth, allowedStatus, redirectTo, router]);

  // 로딩 중일 때 표시할 컴포넌트
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">인증 상태 확인 중...</p>
        </div>
      </div>
    );
  }

  // 인증이 필요한데 로그인되지 않은 경우
  if (requireAuth && !auth.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">로그인 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  // 상태가 맞지 않는 경우
  if (auth.isLoggedIn && auth.user && !allowedStatus.includes(auth.user.status)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">페이지 이동 중...</p>
        </div>
      </div>
    );
  }

  // 모든 조건을 만족하면 자식 컴포넌트 렌더링
  return <>{children}</>;
};

// ==========================================

// 4. src/app/layout.tsx - 전역 Recoil Provider 설정
('use client');

import React from 'react';
import { RecoilRoot } from 'recoil';
import { AuthInitializer } from '@/components/auth/AuthInitializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <RecoilRoot>
          <AuthInitializer />
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
