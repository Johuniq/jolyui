"use client";

import { RotatingText } from "@/registry/default/ui/rotate-text";

export default function RotateTextCustomDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Fast Rotation</h3>
        <RotatingText
          words={["Code", "Build", "Deploy", "Scale"]}
          interval={1000}
          className="font-mono text-2xl text-primary"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Slow Rotation</h3>
        <RotatingText
          words={["Design", "Create", "Innovate", "Inspire"]}
          interval={4000}
          className="font-bold text-3xl text-destructive"
        />
      </div>
    </div>
  );
}
