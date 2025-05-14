// src/app/oauth-result/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState, AuthState, User } from '@/atoms/authAtoms';

export default function OAuthResult() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [processingStarted, setProcessingStarted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    // 이미 처리 중인지 확인 (중복 실행 방지)
    if (processingStarted) return;
    setProcessingStarted(true);

    // JSON 응답 처리 함수
    const handleAuth = () => {
      try {
        // 페이지 본문 가져오기
        const bodyText = document.body.innerText || document.body.textContent || '';

        // 디버깅 정보 저장
        setDebugInfo(`페이지 본문(${bodyText.length} 글자): ${bodyText.substring(0, 100)}...`);
        console.log('페이지 본문 길이:', bodyText.length);
        console.log('페이지 본문 앞부분:', bodyText.substring(0, 200));

        // JSON 형식 확인 및 추출 - 정규식 수정: /s 플래그 제거
        const jsonMatch = bodyText.match(/(\{.*\})/);
        if (jsonMatch) {
          try {
            // 추출된 JSON 문자열 파싱
            const jsonStr = jsonMatch[0];
            console.log('추출된 JSON 문자열:', jsonStr);

            const authData = JSON.parse(jsonStr);
            console.log('인증 데이터 파싱 성공:', authData);

            // 토큰 정보 확인
            if (authData && authData.accessToken && authData.refreshToken) {
              // 1. 토큰 정보 로컬 스토리지에 개별적으로 저장
              try {
                window.localStorage.setItem('accessToken', authData.accessToken);
                console.log('accessToken 저장 성공');

                window.localStorage.setItem('refreshToken', authData.refreshToken);
                console.log('refreshToken 저장 성공');

                window.localStorage.setItem('auth_status', authData.status || 'ACTIVE');
                console.log('auth_status 저장 성공');
              } catch (storageError) {
                console.error('로컬 스토리지 저장 오류:', storageError);
                const errorMessage =
                  storageError instanceof Error ? storageError.message : String(storageError);
                setDebugInfo((prev) => `${prev}\n로컬 스토리지 오류: ${errorMessage}`);
              }

              // 2. Recoil 상태 업데이트
              // 사용자 정보 생성
              const user: User = {
                id: '',
                name: '',
                email: '',
                provider: 'google',
              };

              // 새 상태 객체 생성
              const newAuthState: AuthState = {
                isLoggedIn: true,
                isLoading: false,
                error: null,
                user,
              };

              setAuth(newAuthState);

              // 3. 쿠키에도 백업 저장 (로컬 스토리지 문제 대비)
              document.cookie = `accessToken=${authData.accessToken}; path=/; max-age=3600`;
              document.cookie = `refreshToken=${authData.refreshToken}; path=/; max-age=2592000`;
              document.cookie = `auth_status=${authData.status || 'ACTIVE'}; path=/; max-age=2592000`;

              // 4. 상태에 따라 페이지 이동 (지연 추가)
              setTimeout(() => {
                if (authData.status === 'PENDING') {
                  console.log('PENDING 상태: /onboarding/step1로 이동');
                  router.push('/onboarding/step1');
                } else {
                  console.log('ACTIVE 상태: /home으로 이동');
                  router.push('/home');
                }
              }, 500);

              return;
            } else {
              setDebugInfo((prev) => `${prev}\n토큰 정보 누락: ${JSON.stringify(authData)}`);
            }
          } catch (jsonError) {
            console.error('JSON 파싱 오류:', jsonError);
            const errorMessage = jsonError instanceof Error ? jsonError.message : String(jsonError);
            setDebugInfo((prev) => `${prev}\nJSON 파싱 실패: ${errorMessage}`);
          }
        } else {
          setDebugInfo((prev) => `${prev}\nJSON 형식 찾지 못함`);
        }

        throw new Error('유효한 인증 정보를 찾을 수 없습니다.');
      } catch (error) {
        console.error('인증 처리 오류:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setDebugInfo((prev) => `${prev}\n최종 오류: ${errorMessage}`);

        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          error: '로그인 처리 중 오류가 발생했습니다.',
        }));

        // 오류 발생 시 지연 후 로그인 페이지로 이동
        setTimeout(() => {
          router.push('/login?error=auth_failed');
        }, 2000);
      }
    };

    // 첫 번째 시도: 즉시 실행
    handleAuth();

    // 두 번째 시도: 약간의 지연 후 실행 (DOM이 완전히 로드될 시간 확보)
    const timer1 = setTimeout(handleAuth, 300);

    // 세 번째 시도: 더 긴 지연 후 실행 (네트워크 지연 등 고려)
    const timer2 = setTimeout(handleAuth, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router, setAuth, processingStarted]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">인증 처리 중...</h1>
      <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
      <p>잠시만 기다려주세요.</p>

      {/* 디버깅 정보 표시 (개발 모드에서만) */}
      {process.env.NODE_ENV !== 'production' && debugInfo && (
        <div className="mt-8 p-4 bg-gray-100 text-xs text-gray-700 max-w-lg overflow-auto whitespace-pre-wrap rounded">
          <p className="font-bold mb-2">디버깅 정보:</p>
          <pre>{debugInfo}</pre>
        </div>
      )}
    </div>
  );
}
