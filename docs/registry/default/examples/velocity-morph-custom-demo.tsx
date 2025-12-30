"use client";

import { VelocityMorph } from "@/registry/default/ui/velocity-morph";

export default function VelocityMorphCustomDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Fast Morphing</h3>
        <VelocityMorph
          texts={["CODE", "BUILD", "DEPLOY", "SCALE"]}
          interval={1500}
          className="font-mono text-2xl text-primary"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Slow Morphing</h3>
        <VelocityMorph
          texts={["DESIGN", "CREATE", "INNOVATE", "INSPIRE"]}
          interval={5000}
          className="font-bold text-3xl text-destructive"
        />
      </div>
    </div>
  );
}
