import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#283B0C",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#6FA02A",
            fontSize: 56,
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: 48,
          }}
        >
          d
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, color: "#FFFFFF" }}>
          Disalp Distribuidora
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#C7DFA5", marginTop: 20 }}>
          {SITE_TAGLINE} — da Ceasa pra sua gôndola
        </div>
      </div>
    ),
    { ...size }
  );
}
