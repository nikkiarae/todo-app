import type { NextConfig } from "next";
import { BACKEND_URL, FRONTEND_URL } from "@/lib/config/variables";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    FRONTEND_URL: FRONTEND_URL,
    BACKEND_URL: BACKEND_URL
  },
};

export default nextConfig;
