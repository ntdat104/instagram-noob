/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    if (!config.experiments) {
      config.experiments = {};
    }

    config.experiments.topLevelAwait = true;

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
