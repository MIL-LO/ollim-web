// src/atoms/authAtoms.ts
import { atom } from 'recoil';

// 제공자 타입을 문자열 리터럴 타입으로 정의
export type AuthProvider = 'google' | 'apple' | 'unknown' | null;

// 사용자 정보 타입
export interface User {
  id: string;
  name: string;
  email: string;
  provider: AuthProvider;
}

// 인증 상태 타입
export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

// 초기 상태
const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  user: null,
};

// 인증 상태 아톰
export const authState = atom<AuthState>({
  key: 'authState',
  default: initialState,
});
