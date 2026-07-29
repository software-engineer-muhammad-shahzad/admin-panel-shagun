// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [

      // ✅ Production API Images (uploads, wishing-card content, etc.)
      {
        protocol: "https",
        hostname: "adminapis.shagundirect.com",
        pathname: "/**",
      },

      // Old backend host, kept for images uploaded before the migration
      {
        protocol: "http",
        hostname: "www.shagundirect.somee.com",
        pathname: "/uploads/**",
      },

      // ✅ Localhost Images (optional)
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