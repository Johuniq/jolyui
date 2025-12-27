"use client";

import { VelocityMorph } from "@/registry/default/ui/velocity-morph";

export default function VelocityMorphCustomDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="mb-4 text-lg font-semibold">Fast Morphing</h3>
        <VelocityMorph
          texts={["CODE", "BUILD", "DEPLOY", "SCALE"]}
          interval={1500}
          className="text-2xl font-mono text-primary"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-4 text-lg font-semibold">Slow Morphing</h3>
        <VelocityMorph
          texts={["DESIGN", "CREATE", "INNOVATE", "INSPIRE"]}
          interval={5000}
          className="text-3xl font-bold text-destructive"
        />
      </div>
    </div>
  );
}