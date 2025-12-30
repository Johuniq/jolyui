import { Circle, Square } from "lucide-react";
import React from "react";
import {
  AnimatedBeam,
  BeamContainer,
  BeamNode,
} from "@/registry/default/ui/animated-beam";

export default function AnimatedBeamCurvedDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const fromRef = React.useRef<HTMLDivElement>(null);
  const toRef = React.useRef<HTMLDivElement>(null);

  return (
    <BeamContainer
      ref={containerRef}
      className="mx-auto flex min-h-screen w-full items-center justify-between rounded-xl p-8"
    >
      <BeamNode ref={fromRef} className="h-14 w-14">
        <Circle className="h-6 w-6 text-muted-foreground" />
      </BeamNode>

      <BeamNode ref={toRef} className="h-14 w-14">
        <Square className="h-6 w-6 text-muted-foreground" />
      </BeamNode>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        curvature={0.5}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
      />
    </BeamContainer>
  );
}
