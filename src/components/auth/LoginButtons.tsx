// src/components/auth/LoginButtons.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';
import { ButtonContainer, AppleButton, GoogleButton, ErrorMessage } from './styles';

interface LoginButtonsProps {
  className?: string;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({ className }) => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  const handleAppleLogin = async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

      // 애플 로그인 로직 구현
      // 여기서는 로그인 성공을 가정
      console.log('Apple 로그인 시도');

      // 로그인 성공 시 상태 업데이트
      setAuth({
        isLoggedIn: true,
        user: {
          id: 'apple-user-id',
          name: 'Apple User',
          provider: 'apple',
        },
        isLoading: false,
        error: null,
      });

      // 홈 화면으로 이동
      router.push('/home');
    } catch (error) {
      console.error('Apple 로그인 에러:', error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '애플 로그인에 실패했습니다.',
      }));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

      // 구글 로그인 로직 구현
      // 여기서는 로그인 성공을 가정
      console.log('Google 로그인 시도');

      // 로그인 성공 시 상태 업데이트
      setAuth({
        isLoggedIn: true,
        user: {
          id: 'google-user-id',
          name: 'Google User',
          provider: 'google',
        },
        isLoading: false,
        error: null,
      });

      // 홈 화면으로 이동
      router.push('/home');
    } catch (error) {
      console.error('Google 로그인 에러:', error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '구글 로그인에 실패했습니다.',
      }));
    }
  };

  return (
    <ButtonContainer className={className}>
      <AppleButton onClick={handleAppleLogin} disabled={auth.isLoading}>
        Apple로 시작하기
      </AppleButton>
      <GoogleButton onClick={handleGoogleLogin} disabled={auth.isLoading}>
        Google로 시작하기
      </GoogleButton>

      {auth.error && <ErrorMessage>{auth.error}</ErrorMessage>}
    </ButtonContainer>
  );
};

export default LoginButtons;
