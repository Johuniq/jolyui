"use client";

import { RichTooltip } from "@/components/ui/animated-tooltip";

export default function AnimatedTooltipRichDemo() {
  return (
    <div className="flex justify-center">
      <RichTooltip
        title="Mountain Vista"
        description="A beautiful landscape view from the top of the mountain during golden hour."
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop"
        placement="bottom"
      >
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Hover for Rich Tooltip
        </button>
      </RichTooltip>
    </div>
  );
}
