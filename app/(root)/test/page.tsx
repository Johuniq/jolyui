"use client";

import { ShadowWave } from "@/components/jolyui/shadow-wave";

export default function Test() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div style={{ width: 480, height: 320 }}>
        <ShadowWave
          sizing="fill"
          color="#111827"
          style={{ WebkitMaskImage: "url(#myMask)", maskImage: "url(#myMask)" }}
          content={<div style={{ color: "white" }}>Masked</div>}
        />
      </div>
    </div>
  );
}
