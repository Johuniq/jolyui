"use client";

import { MorphingText } from "@/registry/default/ui/text-morphing";

export default function TextMorphingDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-4xl">
          Build{" "}
          <MorphingText
            words={["beautiful", "amazing", "stunning", "incredible"]}
            className="text-blue-600"
          />{" "}
          interfaces
        </h1>
        <p className="text-lg text-muted-foreground">
          Create{" "}
          <MorphingText
            words={["responsive", "accessible", "performant", "modern"]}
            interval={2000}
            className="text-green-600"
          />{" "}
          web experiences
        </p>
      </div>
    </div>
  );
}
