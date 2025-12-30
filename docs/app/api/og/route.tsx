import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Use edge runtime for better performance
export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") ?? siteConfig.name;

    return new ImageResponse(
      <div
        tw="flex flex-col w-full h-full items-center justify-center relative"
        style={{
          background: "#000000",
        }}
      >
        {/* SVG Gradient Background */}
        <svg
          width="1280"
          height="720"
          viewBox="0 0 1280 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <radialGradient
              id="grad1"
              cx="20%"
              cy="30%"
              r="50%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffad0a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffad0a" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="grad2"
              cx="80%"
              cy="20%"
              r="45%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6200ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6200ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="grad3"
              cx="70%"
              cy="80%"
              r="50%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#e2a3ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#e2a3ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="grad4"
              cx="30%"
              cy="70%"
              r="40%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ff99fd" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff99fd" stopOpacity="0" />
            </radialGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
            </filter>
          </defs>
          <rect width="1280" height="720" fill="#000000" />
          <g filter="url(#blur)">
            <ellipse cx="256" cy="216" rx="400" ry="400" fill="url(#grad1)" />
            <ellipse cx="1024" cy="144" rx="360" ry="360" fill="url(#grad2)" />
            <ellipse cx="896" cy="576" rx="400" ry="400" fill="url(#grad3)" />
            <ellipse cx="384" cy="504" rx="320" ry="320" fill="url(#grad4)" />
          </g>
        </svg>

        <div tw="flex flex-col w-full h-full items-center justify-center absolute inset-0">
          <h1
            tw="flex items-center font-extrabold text-7xl text-white justify-center"
            style={{
              textWrap: "balance",
              fontWeight: 800,
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: "-0.05em",
            }}
          >
            {title}
          </h1>
          <p
            tw="text-3xl text-zinc-300 text-center mt-4"
            style={{
              textWrap: "balance",
              fontWeight: 500,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {siteConfig.description}
          </p>
        </div>
      </div>,
      {
        width: 1280,
        height: 720,
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
