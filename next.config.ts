import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is Next's default; 100 is used for the hero portrait so it isn't visibly recompressed.
    qualities: [75, 100],
  },
};

export default nextConfig;
