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
};

// PWA 구성으로 Next.js 구성 래핑
const configWithPWA = withPWA(nextConfig);

// Sentry 구성으로 Next.js 구성 래핑
module.exports = withSentryConfig(
  configWithPWA,
  {
    // Sentry 웹팩 플러그인 옵션
    org: "millo-j0",
    project: "ollim-web-dev",

    // 소스맵 업로드 설정
    widenClientFileUpload: true,

    // 광고 차단기 우회를 위한 라우트 설정
    tunnelRoute: "/monitoring",

    // Sentry 로그 설정
    silent: !process.env.CI,

    // 그 외 옵션들
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);
