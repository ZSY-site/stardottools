import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // distDir: "dist", // 注释掉自定义输出目录，使用Vercel默认配置
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
