"use client";

import ShutterText from "@/registry/default/ui/shutter-text";

export default function ShutterTextHoverDemo() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        Hover to trigger the shutter effect
      </p>
      <ShutterText
        text="HOVER"
        trigger="hover"
        className="cursor-pointer text-8xl"
      />
    </div>
  );
}
