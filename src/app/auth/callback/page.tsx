'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtoms';

export default function OAuthCallback() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    if (isProcessing) return;
    setIsProcessing(true);

    const processTokens = () => {
      try {
        addDebugInfo('OAuth 콜백 처리 시작');

        // URL 파라미터에서 토큰 추출
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const status = urlParams.get('status');

        addDebugInfo(
          `토큰 추출 결과: accessToken=${accessToken ? '있음' : '없음'}, refreshToken=${refreshToken ? '있음' : '없음'}, status=${status}`
        );

        if (!accessToken || !refreshToken) {
          addDebugInfo('토큰이 URL 파라미터에 없음 - 로그인 페이지로 이동');
          setTimeout(() => router.push('/login?error=no_tokens'), 2000);
          return;
        }

        // 토큰 저장 (여러 방식으로 시도)
        const saveSuccess = saveTokensMultipleWays({
          accessToken,
          refreshToken,
          status: status || 'ACTIVE',
        });

        if (saveSuccess) {
          addDebugInfo('토큰 저장 성공');

          // Recoil 상태 업데이트
          setAuth({
            isLoggedIn: true,
            isLoading: false,
            error: null,
            user: {
              id: '',
              name: '',
              email: '',
              provider: 'oauth',
            },
          });

          addDebugInfo(`사용자 상태: ${status}`);

          // 상태에 따라 페이지 이동
          setTimeout(() => {
            if (status === 'PENDING') {
              addDebugInfo('온보딩 페이지로 이동');
              router.push('/onboarding/step1');
            } else {
              addDebugInfo('홈 페이지로 이동');
              router.push('/home');
            }
          }, 1000);
        } else {
          addDebugInfo('토큰 저장 실패 - 로그인 페이지로 이동');
          setTimeout(() => router.push('/login?error=token_save_failed'), 2000);
        }
      } catch (error) {
        addDebugInfo(`오류 발생: ${error instanceof Error ? error.message : String(error)}`);
        setTimeout(() => router.push('/login?error=callback_error'), 2000);
      }
    };

    processTokens();
  }, [router, setAuth, isProcessing]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">로그인 처리 중...</h1>
          <p className="text-gray-600">잠시만 기다려주세요.</p>
        </div>

        {/* 디버깅 정보 */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg max-h-64 overflow-y-auto">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">처리 상태:</h3>
          <div className="text-xs text-gray-600 space-y-1">
            {debugInfo.map((info, index) => (
              <div key={index} className="font-mono">
                {info}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 토큰 저장 함수 (여러 방식으로 시도)
function saveTokensMultipleWays(tokens: {
  accessToken: string;
  refreshToken: string;
  status: string;
}): boolean {
  let success = false;

  // 1. localStorage 시도
  try {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('auth_status', tokens.status);
    console.log('✅ localStorage 저장 성공');
    success = true;
  } catch (e) {
    console.warn('❌ localStorage 저장 실패:', e);
  }

  // 2. sessionStorage 시도 (백업)
  try {
    sessionStorage.setItem('accessToken', tokens.accessToken);
    sessionStorage.setItem('refreshToken', tokens.refreshToken);
    sessionStorage.setItem('auth_status', tokens.status);
    console.log('✅ sessionStorage 저장 성공');
    success = true;
  } catch (e) {
    console.warn('❌ sessionStorage 저장 실패:', e);
  }

  // 3. 쿠키 저장 시도 (추가 백업)
  try {
    document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=3600; SameSite=Lax`;
    document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=2592000; SameSite=Lax`;
    document.cookie = `auth_status=${tokens.status}; path=/; max-age=2592000; SameSite=Lax`;
    console.log('✅ 쿠키 저장 성공');
    success = true;
  } catch (e) {
    console.warn('❌ 쿠키 저장 실패:', e);
  }

  // 4. 전역 변수에 저장 (최후의 수단)
  try {
    (window as any)._authTokens = tokens;
    console.log('✅ 전역 변수 저장 성공');
    success = true;
  } catch (e) {
    console.warn('❌ 전역 변수 저장 실패:', e);
  }

  return success;
}
