import { atom, selector } from 'recoil';

export interface User {
  id: string;
  email: string;
  name: string;
  provider: string;
  status: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

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
