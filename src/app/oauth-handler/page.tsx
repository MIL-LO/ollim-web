// src/app/oauth-result/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';

export default function OAuthResult() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    // 페이지 내용에서 JSON 데이터 추출 시도
    try {
      // 현재 화면에 표시된 텍스트에서 JSON 추출
      const pageText = document.body.innerText;

      // JSON 형식인지 확인
      if (pageText.trim().startsWith('{') && pageText.trim().endsWith('}')) {
        const authData = JSON.parse(pageText);

        console.log('인증 데이터 파싱 성공:', authData);

        if (authData.accessToken && authData.refreshToken) {
          // 로컬 스토리지에 토큰 저장
          localStorage.setItem('accessToken', authData.accessToken);
          localStorage.setItem('refreshToken', authData.refreshToken);
          localStorage.setItem('auth_status', authData.status);

          // Recoil 상태 업데이트
          setAuth({
            isLoggedIn: true,
            isLoading: false,
            error: null,
            user: {
              id: '', // 토큰 디코딩으로 가져올 수 있음
              name: '',
              email: '',
              provider: 'google', // 또는 'apple'
            },
          });

          // 상태에 따른 페이지 이동
          if (authData.status === 'PENDING') {
            router.push('/onboarding/step1');
          } else {
            router.push('/home');
          }
          return;
        }
      }

      // JSON 형식이 아니거나 토큰이 없는 경우
      throw new Error('유효한 인증 데이터를 찾을 수 없습니다.');
    } catch (error) {
      console.error('인증 데이터 처리 오류:', error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '로그인 처리 중 오류가 발생했습니다.',
      }));
      router.push('/login?error=parse_error');
    }
  }, [router, setAuth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">인증 처리 중...</h1>
      <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}
