"use client";

import ShutterText from "@/registry/default/ui/shutter-text";

export default function ShutterTextScrollDemo() {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        Scroll down to trigger the animation
      </p>
      <ShutterText text="SHUTTER" trigger="scroll" className="text-7xl" />
    </div>
  );
}
