"use client";

import { MorphingText } from "@/registry/default/ui/text-morphing";

export default function TextMorphingVariantsDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="mb-2 font-semibold text-2xl">Fast Animation</h2>
        <p className="text-lg">
          Experience{" "}
          <MorphingText
            words={["speed", "velocity", "rapidity", "quickness"]}
            interval={1500}
            animationDuration={0.3}
            className="font-bold text-red-500"
          />{" "}
          like never before
        </p>
      </div>

      <div className="text-center">
        <h2 className="mb-2 font-semibold text-2xl">Slow & Elegant</h2>
        <p className="text-lg">
          Enjoy{" "}
          <MorphingText
            words={["grace", "elegance", "beauty", "poetry"]}
            interval={4000}
            animationDuration={1.2}
            className="font-bold text-purple-500"
          />{" "}
          in motion
        </p>
      </div>

      <div className="text-center">
        <h2 className="mb-2 font-semibold text-2xl">Tech Terms</h2>
        <p className="text-lg">
          Powered by{" "}
          <MorphingText
            words={["React", "TypeScript", "Next.js", "Tailwind"]}
            interval={2500}
            className="font-mono text-cyan-500"
          />
        </p>
      </div>
    </div>
  );
}
