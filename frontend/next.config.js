/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['placehold.co'],
    unoptimized: true
  },
  experimental: {
    appDocumentPreloading: true,
    serverActions: true
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
