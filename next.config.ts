import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is Next's default. 85 is used on the hero portrait: that source is already a
    // compressed photo, so re-encoding it at 75 on top would compound two lossy passes.
    qualities: [75, 85],
  },
};

export default nextConfig;
