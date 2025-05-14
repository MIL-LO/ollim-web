// src/lib/apiClient.ts
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// _retry 속성을 추가한 확장 타입 정의
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// API 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL, // 환경 변수 사용
  timeout: 10000, // 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정 - 모든 요청에 자동으로 토큰 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // localStorage에서 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');

    // 토큰이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      // 'Bearer ' 접두사가 이미 있는지 확인
      const token = accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;

      // headers가 AxiosHeaders 타입인지 확인하고 적절히 설정
      if (config.headers && config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', token);
      } else {
        // 최후의 수단으로 타입 단언 사용
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
    // originalRequest를 확장된 타입으로 캐스팅
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 이제 _retry 속성에 대한 타입 오류 없음
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 요청
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          // 리프레시 토큰 API 호출 시에도 환경 변수 사용
          const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;

          // 새 토큰 저장
          localStorage.setItem('accessToken', accessToken);

          // 헤더 업데이트 - AxiosHeaders 인스턴스 확인
          if (originalRequest.headers && originalRequest.headers instanceof AxiosHeaders) {
            originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
          } else {
            // 최후의 수단으로 타입 단언 사용
            (originalRequest.headers as any).Authorization = `Bearer ${accessToken}`;
          }

          // 원래 요청 재시도
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('auth_status');

        // 로그인 페이지로 리다이렉트
        window.location.href = '/login?error=session_expired';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
