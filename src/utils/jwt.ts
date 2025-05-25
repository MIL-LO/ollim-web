export interface JWTPayload {
  sub: string; // userId
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'WITHDRAWN';
  nickname?: string;
  iat: number;
  exp: number;
}

export class JWTUtils {
  // JWT 디코딩 (서명 검증은 백엔드에서 처리)
  static decode(token: string): JWTPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
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
  static extractUserInfo(token: string) {
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
}
