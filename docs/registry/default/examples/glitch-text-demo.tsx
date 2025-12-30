"use client";

import { GlitchText } from "@/registry/default/ui/glitch-text";

export default function GlitchTextDemo() {
  return (
    <div className="flex items-center justify-center">
      <GlitchText
        words={["Hello", "World", "Glitch", "Effect"]}
        className="font-bold text-4xl text-foreground"
      />
    </div>
  );
}
