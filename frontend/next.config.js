/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
    unoptimized: true
  },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
