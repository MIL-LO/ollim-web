'use client';

import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { authState } from '@/atoms/authAtoms';
import { JWTUtils } from '@/utils/jwt';

const TOKEN_STORAGE_KEY = 'auth_tokens';
const REFRESH_THRESHOLD = 5 * 60; // 5분 전에 refresh

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  // 토큰 저장
  const saveTokens = useCallback((accessToken: string, refreshToken: string) => {
    const tokens = { accessToken, refreshToken };

    try {
      // 여러 저장소에 저장
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));

      // httpOnly 쿠키는 백엔드에서 설정하므로 여기서는 fallback용만
      document.cookie = `${TOKEN_STORAGE_KEY}=${JSON.stringify(tokens)}; path=/; max-age=2592000; SameSite=Lax`;

      return true;
    } catch (error) {
      console.error('토큰 저장 실패:', error);
      return false;
    }
  }, []);

  // 토큰 가져오기
  const getStoredTokens = useCallback(() => {
    try {
      // localStorage 우선 확인
      let stored = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) return JSON.parse(stored);

      // sessionStorage 확인
      stored = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) return JSON.parse(stored);

      // 쿠키 확인 (fallback)
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find((c) => c.startsWith(`${TOKEN_STORAGE_KEY}=`));
      if (tokenCookie) {
        return JSON.parse(tokenCookie.split('=')[1]);
      }

      return null;
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
      return null;
    }
  }, []);

  // 토큰 제거
  const clearTokens = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (error) {
      console.error('토큰 제거 실패:', error);
    }
  }, []);

  // 토큰 갱신
  const refreshAccessToken = useCallback(async () => {
    try {
      const tokens = getStoredTokens();
      if (!tokens?.refreshToken) {
        throw new Error('Refresh token이 없습니다');
      }

      const response = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: tokens.refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      const data = await response.json();

      // 새 토큰 저장
      saveTokens(data.accessToken, data.refreshToken);

      // 사용자 정보 업데이트
      const userInfo = JWTUtils.extractUserInfo(data.accessToken);
      if (userInfo) {
        setAuth((prev) => ({
          ...prev,
          user: {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.nickname,
            provider: 'oauth',
            status: userInfo.status,
          },
          tokens: {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          },
        }));
      }

      return data.accessToken;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      // 갱신 실패 시 로그아웃
      await logout();
      return null;
    }
  }, [getStoredTokens, saveTokens, setAuth]);

  // 유효한 액세스 토큰 가져오기 (자동 갱신 포함)
  const getValidAccessToken = useCallback(async () => {
    const tokens = getStoredTokens();
    if (!tokens?.accessToken) return null;

    // 토큰이 만료되었거나 곧 만료될 예정이면 갱신
    if (
      JWTUtils.isExpired(tokens.accessToken) ||
      JWTUtils.getTimeUntilExpiry(tokens.accessToken) < REFRESH_THRESHOLD
    ) {
      console.log('토큰 만료 임박, 자동 갱신 시도');
      return await refreshAccessToken();
    }

    return tokens.accessToken;
  }, [getStoredTokens, refreshAccessToken]);

  // 로그인 처리
  const login = useCallback(
    async (accessToken: string, refreshToken: string) => {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

        // JWT에서 사용자 정보 추출
        const userInfo = JWTUtils.extractUserInfo(accessToken);
        if (!userInfo) {
          throw new Error('유효하지 않은 JWT 토큰');
        }

        // 토큰 저장
        const saveSuccess = saveTokens(accessToken, refreshToken);
        if (!saveSuccess) {
          console.warn('토큰 저장 실패, 메모리에서만 사용');
        }

        // 상태 업데이트
        setAuth({
          isLoggedIn: true,
          isLoading: false,
          user: {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.nickname,
            provider: 'oauth',
            status: userInfo.status,
          },
          error: null,
          tokens: {
            accessToken,
            refreshToken,
          },
        });

        return { success: true, status: userInfo.status };
      } catch (error) {
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : '로그인 실패',
        }));
        return { success: false, error: error instanceof Error ? error.message : '로그인 실패' };
      }
    },
    [setAuth, saveTokens]
  );

  // 로그아웃
  const logout = useCallback(async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));

      // 백엔드 로그아웃 API 호출
      const accessToken = await getValidAccessToken();
      if (accessToken) {
        try {
          await fetch('/api/v1/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (e) {
          console.warn('로그아웃 API 호출 실패:', e);
        }
      }

      // 토큰 제거
      clearTokens();

      // 상태 초기화
      setAuth({
        isLoggedIn: false,
        isLoading: false,
        user: null,
        error: null,
        tokens: null,
      });

      // 로그인 페이지로 이동
      router.push('/login');

      return true;
    } catch (error) {
      console.error('로그아웃 오류:', error);
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: '로그아웃 처리 중 오류가 발생했습니다.',
      }));
      return false;
    }
  }, [setAuth, clearTokens, getValidAccessToken, router]);

  // 인증된 API 호출
  const authenticatedFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const accessToken = await getValidAccessToken();
      if (!accessToken) {
        throw new Error('유효한 액세스 토큰이 없습니다');
      }

      return fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
    },
    [getValidAccessToken]
  );

  // 앱 시작 시 토큰 확인 및 자동 로그인
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // URL 파라미터 확인 (OAuth 콜백)
        const urlParams = new URLSearchParams(window.location.search);
        const urlAccessToken = urlParams.get('accessToken');
        const urlRefreshToken = urlParams.get('refreshToken');

        if (urlAccessToken && urlRefreshToken) {
          console.log('URL 파라미터에서 토큰 발견');

          const result = await login(urlAccessToken, urlRefreshToken);
          if (result.success) {
            // URL 파라미터 정리
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('accessToken');
            currentUrl.searchParams.delete('refreshToken');
            currentUrl.searchParams.delete('status');
            window.history.replaceState({}, document.title, currentUrl.toString());
          }
          return;
        }

        // 저장된 토큰 확인
        const tokens = getStoredTokens();
        if (tokens?.accessToken && tokens?.refreshToken) {
          console.log('저장된 토큰 발견');

          // 토큰이 유효한지 확인
          if (!JWTUtils.isExpired(tokens.accessToken)) {
            // 유효한 토큰으로 자동 로그인
            await login(tokens.accessToken, tokens.refreshToken);
          } else if (tokens.refreshToken) {
            // 액세스 토큰은 만료되었지만 리프레시 토큰으로 갱신 시도
            console.log('만료된 토큰 감지, 자동 갱신 시도');
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
              // 갱신 실패 시 로그아웃 상태로
              setAuth((prev) => ({ ...prev, isLoading: false }));
            }
          } else {
            setAuth((prev) => ({ ...prev, isLoading: false }));
          }
        } else {
          // 토큰 없음
          setAuth((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('인증 초기화 실패:', error);
        setAuth({
          isLoggedIn: false,
          isLoading: false,
          user: null,
          error: '인증 초기화 실패',
          tokens: null,
        });
      }
    };

    // 이미 처리된 경우 스킵
    if (auth.isLoggedIn || (!auth.isLoading && !getStoredTokens())) {
      return;
    }

    initializeAuth();
  }, []); // 빈 의존성 배열로 한 번만 실행

  // 토큰 자동 갱신 타이머 설정
  useEffect(() => {
    if (!auth.isLoggedIn || !auth.tokens?.accessToken) return;

    const timeUntilExpiry = JWTUtils.getTimeUntilExpiry(auth.tokens.accessToken);
    const refreshTime = Math.max(0, (timeUntilExpiry - REFRESH_THRESHOLD) * 1000);

    if (refreshTime > 0) {
      console.log(`${Math.floor(refreshTime / 1000)}초 후 토큰 자동 갱신 예정`);

      const timer = setTimeout(() => {
        console.log('토큰 자동 갱신 시작');
        refreshAccessToken();
      }, refreshTime);

      return () => clearTimeout(timer);
    }
  }, [auth.isLoggedIn, auth.tokens?.accessToken, refreshAccessToken]);

  return {
    ...auth,
    login,
    logout,
    authenticatedFetch,
    getValidAccessToken,
    refreshAccessToken,
  };
};
