import type { NextConfig } from "next";
const cdn = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, "");
const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  assetPrefix: cdn || undefined,
  images: cdn ? { path: `${cdn}/_next/image` } : undefined,
};
export default nextConfig;
