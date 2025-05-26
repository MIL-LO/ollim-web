import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import type { AuthTokens } from '@/types/auth.types';

// 환경변수 검증
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다.');
}

// _retry 속성을 추가한 확장 타입 정의
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// API 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 가져오기 헬퍼 함수
const getStoredTokens = (): AuthTokens | null => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    // 통합 토큰 객체에서 가져오기 (fallback)
    const storedTokens = localStorage.getItem('auth_tokens');
    if (storedTokens) {
      return JSON.parse(storedTokens);
    }

    return null;
  } catch (error) {
    console.error('토큰 가져오기 실패:', error);
    return null;
  }
};

// 토큰 저장 헬퍼 함수
const saveTokens = (tokens: AuthTokens): void => {
  try {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  } catch (error) {
    console.error('토큰 저장 실패:', error);
  }
};

// 토큰 제거 헬퍼 함수
const clearTokens = (): void => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('auth_tokens');
    localStorage.removeItem('auth_status');
  } catch (error) {
    console.error('토큰 제거 실패:', error);
  }
};

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getStoredTokens();
    const accessToken = tokens?.accessToken;

    if (accessToken) {
      const token = accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;

      if (config.headers && config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', token);
      } else {
        (config.headers as any).Authorization = token;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 오류(토큰 만료) 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = getStoredTokens();
        const refreshToken = tokens?.refreshToken;

        if (refreshToken) {
          // 환경변수에서 직접 refresh URL 구성
          const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
            refreshToken,
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

          saveTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });

          if (originalRequest.headers && originalRequest.headers instanceof AxiosHeaders) {
            originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
          } else {
            (originalRequest.headers as any).Authorization = `Bearer ${newAccessToken}`;
          }

          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        clearTokens();

        if (typeof window !== 'undefined') {
          window.location.href = '/login?error=session_expired';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
