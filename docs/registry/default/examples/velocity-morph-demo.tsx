"use client";

import { VelocityMorph } from "@/registry/default/ui/velocity-morph";

export default function VelocityMorphDemo() {
  return (
    <div className="flex items-center justify-center">
      <VelocityMorph
        texts={["Hello", "World", "Velocity", "Morph"]}
        className="font-bold text-4xl text-foreground"
      />
    </div>
  );
}
