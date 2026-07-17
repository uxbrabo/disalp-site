import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6FA02A",
          borderRadius: 36,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ fontSize: 104, fontWeight: 800, color: "#FFFFFF" }}>d</span>
      </div>
    ),
    { ...size }
  );
}
