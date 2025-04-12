'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 여부에 따라 리다이렉션
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      // 로그인된 경우 홈 화면으로 이동
      router.push('/home');
    } else {
      // 로그인되지 않은 경우 로그인 화면으로 리다이렉션
      router.push('/login');
    }
  }, [router]);

  return <SplashContainer>{/* 스플래시 화면 표시 (리다이렉션되기 전까지) */}</SplashContainer>;
}

const SplashContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-image: url('/images/splash.png');
  background-size: cover;
  background-position: center;
`;
