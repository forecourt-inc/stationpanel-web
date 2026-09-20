import { ImageResponse } from "next/og";
import { hero } from "@/content/copy";

export const alt = "Station Panel — Fuel-site compliance, without the binder.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#FFFFFF",
          background: "linear-gradient(150deg, #142D24 0%, #1B3A2F 55%, #2C4F41 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#6FBF8A" />
            <path d="M10.2 22.1C8.6 14.6 13.6 9.4 23.2 9.2c.4 9.6-4.6 14.8-13 12.9Z" fill="#FBFDFB" />
            <path d="M10.6 21.8 17.2 15.2" fill="none" stroke="#6FBF8A" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M8.9 23.5 11 21.4" fill="none" stroke="#FBFDFB" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            <span>Station</span>
            <span style={{ color: "#6FBF8A" }}>Panel</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 30, color: "#6FBF8A", letterSpacing: 1 }}>{hero.eyebrow}</div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{hero.headline}</div>
        </div>
      </div>
    ),
    size,
  );
}
