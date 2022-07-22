/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/toolkit',
  assetPrefix: '/toolkit/',

  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
