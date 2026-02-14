"use client";

import ShutterText from "@/registry/default/ui/shutter-text";

export default function ShutterTextClickDemo() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        Click to trigger the shutter effect
      </p>
      <ShutterText
        text="CLICK ME"
        trigger="click"
        className="cursor-pointer text-7xl"
      />
    </div>
  );
}
