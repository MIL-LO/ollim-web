'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import MobileLayout from '@/components/layout/MobileLayout';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 2초 후에 로그인 페이지로 자동 이동
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <MobileLayout fullScreen={true}>
      <SplashContainer>
        {/* 스플래시 화면 콘텐츠 */}
      </SplashContainer>
    </MobileLayout>
  );
}

const SplashContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    background-image: url('/images/splash.png');
    background-size: cover;
    background-position: center;
`;