import { atom, selector } from 'recoil';
import type { User, AuthState, AuthTokens } from '@/types/auth.types';

// 재사용하기 위해 타입을 별도로 export
export type { User, AuthState, AuthTokens };

// 메인 인증 상태
export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    isLoading: true, // 앱 시작 시 토큰 확인 중
    user: null,
    error: null,
    tokens: null,
  },
});

// 토큰 존재 여부 selector
export const hasValidTokenSelector = selector({
  key: 'hasValidTokenSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.tokens !== null && auth.tokens.accessToken !== '';
  },
});

// 사용자 상태 selector
export const userStatusSelector = selector({
  key: 'userStatusSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.user?.status || null;
  },
});

// 로그인 상태 selector
export const isLoggedInSelector = selector({
  key: 'isLoggedInSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isLoggedIn && auth.user !== null;
  },
});
