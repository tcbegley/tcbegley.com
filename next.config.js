/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['live.staticflickr.com'] },
  async redirects() {
    return [
      'election-modelling-1',
      'election-modelling-2',
      'election-modelling-3',
      'bayesian-billiards',
      'mcmc-part-1',
      'mcmc-part-2',
    ].map((id) => ({
      source: `/blog/${id}`,
      destination: `/blog/posts/${id}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
