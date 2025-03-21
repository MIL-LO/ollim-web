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
    // 빌드 시 ESLint 오류 무시 설정 추가
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = withPWA(nextConfig);
