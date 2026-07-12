import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "shagundirect.somee.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shagundirect.somee.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
