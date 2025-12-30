"use client";

import { GradientBorderButton } from "@/registry/default/ui/gradient-border";

export default function GradientBorderButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GradientBorderButton>Get Started</GradientBorderButton>
      <GradientBorderButton
        colors={["#22c55e", "#10b981", "#14b8a6", "#22c55e"]}
      >
        Subscribe
      </GradientBorderButton>
      <GradientBorderButton
        colors={["#f59e0b", "#f97316", "#ef4444", "#f59e0b"]}
        duration={1.5}
      >
        Upgrade Now
      </GradientBorderButton>
    </div>
  );
}
