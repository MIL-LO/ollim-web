// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SplashContainer } from './styles';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // 2초 후에 로그인 페이지로 자동 이동
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashContainer>{/* 스플래시 화면 내용 */}</SplashContainer>;
}
