'use client';

import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { authState } from '@/atoms/authAtoms';
import { JWTUtils } from '@/utils/jwt';
import type { User, AuthTokens, AuthResult } from '@/types/auth.types';

// 환경변수 검증
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다.');
}

const TOKEN_STORAGE_KEY = 'auth_tokens';
const REFRESH_THRESHOLD = 5 * 60; // 5분 전에 refresh

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  // 토큰 저장
  const saveTokens = useCallback((accessToken: string, refreshToken: string): boolean => {
    const tokens: AuthTokens = { accessToken, refreshToken };

    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));

      document.cookie = `${TOKEN_STORAGE_KEY}=${JSON.stringify(tokens)}; path=/; max-age=2592000; SameSite=Lax`;

      return true;
    } catch (error) {
      console.error('토큰 저장 실패:', error);
      return false;
    }
  }, []);

  const getStoredTokens = useCallback((): AuthTokens | null => {
    try {
      let stored = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) return JSON.parse(stored);

      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        return { accessToken, refreshToken };
      }

      stored = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      if (stored) return JSON.parse(stored);

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

  const clearTokens = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('auth_status');
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      document.cookie = `${TOKEN_STORAGE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (error) {
      console.error('토큰 제거 실패:', error);
    }
  }, []);

  // 토큰 갱신
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const tokens = getStoredTokens();
      if (!tokens?.refreshToken) {
        throw new Error('Refresh token이 없습니다');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
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
      saveTokens(data.accessToken, data.refreshToken);

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
      await logout();
      return null;
    }
  }, [getStoredTokens, saveTokens, setAuth]);

  const getValidAccessToken = useCallback(async (): Promise<string | null> => {
    const tokens = getStoredTokens();
    if (!tokens?.accessToken) return null;

    if (
      JWTUtils.isExpired(tokens.accessToken) ||
      JWTUtils.getTimeUntilExpiry(tokens.accessToken) < REFRESH_THRESHOLD
    ) {
      console.log('토큰 만료 임박, 자동 갱신 시도');
      return await refreshAccessToken();
    }

    return tokens.accessToken;
  }, [getStoredTokens, refreshAccessToken]);

  const login = useCallback(
    async (accessToken: string, refreshToken: string): Promise<AuthResult> => {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

        const userInfo = JWTUtils.extractUserInfo(accessToken);
        if (!userInfo) {
          throw new Error('유효하지 않은 JWT 토큰');
        }

        const saveSuccess = saveTokens(accessToken, refreshToken);
        if (!saveSuccess) {
          console.warn('토큰 저장 실패, 메모리에서만 사용');
        }

        const user: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.nickname,
          provider: 'oauth',
          status: userInfo.status,
        };

        setAuth({
          isLoggedIn: true,
          isLoading: false,
          user,
          error: null,
          tokens: {
            accessToken,
            refreshToken,
          },
        });

        // 여기서 리디렉션을 하지 않음 - GlobalAuthGuard에서 처리
        console.log('로그인 성공, 상태:', userInfo.status);

        return { success: true, status: userInfo.status };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '로그인 실패';
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        return { success: false, error: errorMessage };
      }
    },
    [setAuth, saveTokens]
  );

  const logout = useCallback(async (): Promise<boolean> => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));

      const accessToken = await getValidAccessToken();
      if (accessToken) {
        try {
          await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
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

      clearTokens();

      setAuth({
        isLoggedIn: false,
        isLoading: false,
        user: null,
        error: null,
        tokens: null,
      });

      router.replace('/login');
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

  const authenticatedFetch = useCallback(
    async (url: string, options: RequestInit = {}): Promise<Response> => {
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
        const urlParams = new URLSearchParams(window.location.search);
        const urlAccessToken = urlParams.get('accessToken');
        const urlRefreshToken = urlParams.get('refreshToken');

        if (urlAccessToken && urlRefreshToken) {
          console.log('URL 파라미터에서 토큰 발견');
          const result = await login(urlAccessToken, urlRefreshToken);
          if (result.success) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('accessToken');
            currentUrl.searchParams.delete('refreshToken');
            currentUrl.searchParams.delete('status');
            window.history.replaceState({}, document.title, currentUrl.toString());
          }
          return;
        }

        const tokens = getStoredTokens();
        if (tokens?.accessToken && tokens?.refreshToken) {
          console.log('저장된 토큰 발견');

          if (!JWTUtils.isExpired(tokens.accessToken)) {
            await login(tokens.accessToken, tokens.refreshToken);
          } else if (tokens.refreshToken) {
            console.log('만료된 토큰 감지, 자동 갱신 시도');
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
              setAuth((prev) => ({ ...prev, isLoading: false }));
            }
          } else {
            setAuth((prev) => ({ ...prev, isLoading: false }));
          }
        } else {
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

    if (auth.isLoggedIn || (!auth.isLoading && !getStoredTokens())) {
      return;
    }

    initializeAuth();
  }, []);

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
