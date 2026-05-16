import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Texas Property Help — Storm Damage, Roofing, HVAC & Insurance Help";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo badge */}
        <div
          style={{
            backgroundColor: "#76b900",
            color: "#000000",
            fontWeight: 800,
            fontSize: "44px",
            padding: "10px 22px",
            borderRadius: "8px",
            marginBottom: "32px",
            letterSpacing: "0.04em",
          }}
        >
          TPH
        </div>

        {/* Site name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "58px",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: 1.15,
          }}
        >
          Texas Property Help
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "26px",
            textAlign: "center",
            maxWidth: "820px",
            lineHeight: 1.5,
          }}
        >
          Storm Damage · Roofing · HVAC · Insurance Claims · Repair Financing
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#76b900",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
