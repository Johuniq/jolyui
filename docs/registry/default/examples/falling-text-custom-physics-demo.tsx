"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import FallingText from "@/registry/default/ui/falling-text";

export default function FallingTextCustomPhysicsDemo() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-4">
      <Button variant="outline" onClick={() => setResetKey((k) => k + 1)}>
        Reset Animation
      </Button>
      <FallingText
        text="Custom physics with high bounce and low gravity"
        highlightWords={["Custom", "physics", "bounce", "gravity"]}
        trigger="auto"
        fontSize="1.5rem"
        gravity={0.5}
        resetKey={resetKey}
        highlightClassName="text-purple-500 font-bold"
        physicsOptions={{
          restitution: 0.95,
          frictionAir: 0.001,
          friction: 0.1,
          density: 0.0005,
        }}
        initialVelocity={{
          x: 10,
          y: 5,
          angular: 0.1,
        }}
      />
    </div>
  );
}
