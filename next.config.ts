import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isVercel ? "" : "/planoeterra",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
