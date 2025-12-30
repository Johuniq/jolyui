"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function AnimatedTooltipAnimationDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {(["fade", "scale", "slide", "spring"] as const).map((animation) => (
        <AnimatedTooltip
          key={animation}
          content={`${animation} animation`}
          animation={animation}
        >
          <button className="rounded-lg border bg-card px-4 py-2 font-medium text-sm capitalize transition-colors hover:bg-accent">
            {animation}
          </button>
        </AnimatedTooltip>
      ))}
    </div>
  );
}
