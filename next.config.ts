// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bake a real API URL into the client bundle when env is missing.
  // Do not set this to portal.shagundirect.com — that is the FE only.
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://adminapis.shagundirect.com/api",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminapis.shagundirect.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.shagundirect.somee.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "44382",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
