"use client";

import FallingText from "@/registry/default/ui/falling-text";

export default function FallingTextScrollDemo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        Scroll down to trigger the animation
      </p>
      <FallingText
        text="Physics based text animation triggered on scroll"
        highlightWords={["Physics", "animation", "scroll"]}
        trigger="scroll"
        fontSize="1.5rem"
        gravity={1.5}
      />
    </div>
  );
}
