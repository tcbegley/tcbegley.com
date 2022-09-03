/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['live.staticflickr.com'] },
}

module.exports = nextConfig
