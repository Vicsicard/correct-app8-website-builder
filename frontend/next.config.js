/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
    unoptimized: true
  },
  // output: 'standalone',  // Commenting out for Vercel deployment
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
