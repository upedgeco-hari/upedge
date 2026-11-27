import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next's default quality, and the only one used.
    qualities: [75],
    // No source is wider than 1920, so larger variants would only repeat work.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Keep each resized image for 31 days, so visitors are not waiting for it to be made
    // again. When replacing a photo, give the new file a new name.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
