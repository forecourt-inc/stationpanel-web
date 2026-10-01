import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects() {
    return [{ source: "/request-demo", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;
