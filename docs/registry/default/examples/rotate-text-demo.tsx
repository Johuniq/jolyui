"use client";

import { RotatingText } from "@/registry/default/ui/rotate-text";

export default function RotateTextDemo() {
  return (
    <div className="flex items-center justify-center">
      <RotatingText
        words={["Hello", "World", "Rotate", "Text"]}
        className="font-bold text-4xl text-foreground"
      />
    </div>
  );
}
