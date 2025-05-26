// 인증 관련 공통 타입 정의
export interface User {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'apple' | 'unknown' | 'oauth';
  status: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  tokens: AuthTokens | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  status: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
  user?: Partial<User>;
}

export interface AuthResult {
  success: boolean;
  status?: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
  error?: string;
}

// OAuth 관련 타입
export type OAuthProvider = 'google' | 'apple';

export interface OAuthMessage {
  type: 'oauth_login';
  provider: OAuthProvider;
}

// JWT 페이로드 타입
export interface JWTPayload {
  sub: string; // userId
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
  nickname?: string;
  iat: number;
  exp: number;
}
