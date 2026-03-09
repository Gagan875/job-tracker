/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable file watching for Docker on Windows
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

module.exports = nextConfig
