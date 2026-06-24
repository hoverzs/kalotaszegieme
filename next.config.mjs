/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/hirek",
        destination: "/tudositasok",
        permanent: true,
      },
      {
        source: "/hirek/:slug",
        destination: "/tudositasok",
        permanent: true,
      },
      {
        source: "/gyulekezetek/nyarszo-sarvasar",
        destination: "/gyulekezetek/nyarszo",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
