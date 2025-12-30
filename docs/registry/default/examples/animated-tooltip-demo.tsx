"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function AnimatedTooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <AnimatedTooltip
          key={placement}
          content={`Tooltip on ${placement}`}
          placement={placement}
          animation="slide"
        >
          <button className="rounded-lg border bg-card px-4 py-2 font-medium text-sm capitalize transition-colors hover:bg-accent">
            {placement}
          </button>
        </AnimatedTooltip>
      ))}
    </div>
  );
}
