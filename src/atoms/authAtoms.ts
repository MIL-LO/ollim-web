import { atom } from 'recoil';

export interface AuthState {
  isLoggedIn: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    provider?: 'apple' | 'google' | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
    isLoading: false,
    error: null,
  },
});
