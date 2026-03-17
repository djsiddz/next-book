import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@next-book/services", "@next-book/types"],
};

export default nextConfig;
