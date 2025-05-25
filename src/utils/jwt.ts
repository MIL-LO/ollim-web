import type { JWTPayload } from '@/types/auth.types';

export class JWTUtils {
  // JWT 디코딩 (서명 검증은 백엔드에서 처리)
  static decode(token: string): JWTPayload | null {
    try {
      if (!token || token.split('.').length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);

      // 필수 필드 검증
      if (!payload.sub || !payload.exp) {
        throw new Error('Invalid JWT payload');
      }

      return payload as JWTPayload;
    } catch (error) {
      console.error('JWT 디코딩 실패:', error);
      return null;
    }
  }

  // JWT 만료 확인
  static isExpired(token: string): boolean {
    const payload = this.decode(token);
    if (!payload) return true;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }

  // JWT 만료까지 남은 시간 (초)
  static getTimeUntilExpiry(token: string): number {
    const payload = this.decode(token);
    if (!payload) return 0;

    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, payload.exp - now);
  }

  // 사용자 정보 추출
  static extractUserInfo(token: string): {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
    status: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
    nickname: string;
  } | null {
    const payload = this.decode(token);
    if (!payload) return null;

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      status: payload.status,
      nickname: payload.nickname || '사용자',
    };
  }

  // JWT 토큰 유효성 검사 (형식 + 만료시간)
  static isValid(token: string): boolean {
    if (!token) return false;

    const payload = this.decode(token);
    if (!payload) return false;

    return !this.isExpired(token);
  }

  // 토큰이 곧 만료되는지 확인 (기본 5분)
  static isExpiringSoon(token: string, thresholdSeconds = 300): boolean {
    return this.getTimeUntilExpiry(token) < thresholdSeconds;
  }
}
