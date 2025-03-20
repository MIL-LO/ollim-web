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
};

module.exports = withPWA(nextConfig);
