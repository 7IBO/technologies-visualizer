/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: [
    {
      source: "/",
      destination: "/search",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
