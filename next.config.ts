import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is Next's default. 85 is used on the hero portrait: that source is already a
    // compressed photo, so re-encoding it at 75 on top would compound two lossy passes.
    qualities: [75, 85],
    // No source is wider than 1920, so larger variants would only repeat work.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Keep each resized image for 31 days, so visitors are not waiting for it to be made
    // again. When replacing a photo, give the new file a new name.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
