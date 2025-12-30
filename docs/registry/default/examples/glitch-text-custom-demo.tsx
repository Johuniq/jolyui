"use client";

import { GlitchText } from "@/registry/default/ui/glitch-text";

export default function GlitchTextCustomDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Fast Glitch</h3>
        <GlitchText
          words={["Code", "Hack", "Debug", "Fix"]}
          interval={1500}
          glitchDuration={200}
          className="font-mono text-2xl text-primary"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Slow Glitch</h3>
        <GlitchText
          words={["Design", "Create", "Build", "Deploy"]}
          interval={5000}
          glitchDuration={500}
          className="font-bold text-3xl text-destructive"
        />
      </div>
    </div>
  );
}
