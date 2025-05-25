const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.millo-ollim.com';

    return [
      {
        source: '/oauth/google',
        destination: `${API_URL}/oauth2/authorization/google`,
        permanent: false,
      },
      {
        source: '/oauth/apple',
        destination: `${API_URL}/oauth2/authorization/apple`,
        permanent: false,
      },
      // OAuth2 콜백 처리를 위한 경로 설정 - Next.js 라우트로 변경
      {
        source: '/login/oauth2/code/:provider',
        destination: '/auth/callback',
        permanent: false,
      },
    ];
  },

  // 404 에러를 줄이기 위한 rewrites 추가
  async rewrites() {
    return [
      // Chrome DevTools 관련 파일들을 무시
      {
        source: '/.well-known/:path*',
        destination: '/api/not-found',
      },
    ];
  },

  // 개발 환경에서의 로깅 개선
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

// PWA 구성으로 Next.js 구성 래핑
const configWithPWA = withPWA(nextConfig);

// Sentry 구성으로 Next.js 구성 래핑
module.exports = withSentryConfig(configWithPWA, {
  // Sentry 웹팩 플러그인 옵션
  org: 'millo-j0',
  project: 'ollim-web-dev',

  // 소스맵 업로드 설정
  widenClientFileUpload: true,

  // 광고 차단기 우회를 위한 라우트 설정
  tunnelRoute: '/monitoring',

  // Sentry 로그 설정
  silent: !process.env.CI,

  // 그 외 옵션들
  disableLogger: true,
  automaticVercelMonitors: true,
});
