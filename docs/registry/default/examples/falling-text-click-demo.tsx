"use client";

import FallingText from "@/registry/default/ui/falling-text";

export default function FallingTextClickDemo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        Click to trigger the falling effect
      </p>
      <FallingText
        text="Click anywhere to watch the words fall and bounce"
        highlightWords={["Click", "fall", "bounce"]}
        trigger="click"
        fontSize="1.75rem"
        physicsOptions={{
          restitution: 0.9,
          frictionAir: 0.005,
        }}
      />
    </div>
  );
}
