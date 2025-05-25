// src/app/home/page.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isLoggedIn, isLoading, user, logout } = useAuth();
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log('로그인되지 않음, 로그인 페이지로 이동');
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인되지 않은 경우 (리디렉션 전까지 표시)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">로그인 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const success = await logout();
    if (!success) {
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">올림 다이어리</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">안녕하세요! 👋</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">환영합니다! 🎉</h2>
            <p className="text-gray-600 text-lg">로그인이 성공적으로 완료되었습니다.</p>
          </div>

          {/* 사용자 정보 */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">로그인 정보</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Provider:</strong> {user?.provider || 'OAuth'}
              </p>
              <p>
                <strong>상태:</strong> 로그인됨 ✅
              </p>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="font-semibold mb-1">다이어리 작성</h3>
              <p className="text-sm opacity-90">오늘의 감정을 기록해보세요</p>
            </button>

            <button className="p-6 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">감정 분석</h3>
              <p className="text-sm opacity-90">감정 패턴을 확인해보세요</p>
            </button>

            <button className="p-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="font-semibold mb-1">프로필 설정</h3>
              <p className="text-sm opacity-90">개인 정보를 관리하세요</p>
            </button>
          </div>

          {/* 개발자 도구 */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">개발자 정보</h3>
            <div className="text-xs text-gray-600 font-mono">
              <p>✅ OAuth 로그인 성공</p>
              <p>✅ 토큰 저장 완료</p>
              <p>✅ 인증 상태 관리 활성화</p>
              <p>✅ 자동 리디렉션 완료</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
