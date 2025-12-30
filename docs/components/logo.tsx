"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: 28,
        height: 28,
      }}
    >
      <Image
        src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Site Icon"
        width={24}
        height={24}
      />
      <span
        style={{
          position: "absolute",
          top: -4,
          right: -24,
          background: "linear-gradient(90deg, #f59e42, #f43f5e)",
          color: "white",
          fontSize: 7,
          fontWeight: 700,
          padding: "1px 4px",
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          zIndex: 2,
          letterSpacing: 1,
        }}
      >
        Beta
      </span>
    </div>
  );
}
