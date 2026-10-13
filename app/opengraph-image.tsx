import { ImageResponse } from "next/og";
import { LOGO } from "@/components/brand/logo-paths";

export const alt = "UPEDGE, a pinnacle of premium construction";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card: the full logo on the brand accent. Page-specific cards use Cloudinary covers. */
export default function OpengraphImage() {
  const l = LOGO.full;
  const w = 760;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F99F1C" }}>
        <svg width={w} height={(w * l.height) / l.width} viewBox={l.viewBox}>
          {l.paths.map((p, i) => (
            <path key={i} d={p.d} fill="#0D0D0D" />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
