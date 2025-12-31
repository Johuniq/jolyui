"use client";

import { GooeyText } from "@/registry/default/ui/gooey-text-morphing";

export default function GooeyTextMorphingDemo() {
  const texts = ["Why", "is", "it", "so", "satisfying", "to", "watch?"];

  return (
    <div className="flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
      <GooeyText
        texts={texts}
        morphTime={1}
        cooldownTime={0.5}
        textClassName="font-bold tracking-tighter"
      />
    </div>
  );
}
