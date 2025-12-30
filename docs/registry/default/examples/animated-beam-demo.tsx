import { Bot, FileText, User } from "lucide-react";
import React from "react";
import {
  AnimatedBeam,
  BeamContainer,
  BeamNode,
} from "@/registry/default/ui/animated-beam";

export default function AnimatedBeamDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const userRef = React.useRef<HTMLDivElement>(null);
  const aiRef = React.useRef<HTMLDivElement>(null);
  const outputRef = React.useRef<HTMLDivElement>(null);

  return (
    <BeamContainer
      ref={containerRef}
      className="mx-auto flex w-full items-center justify-between rounded-xl border p-8"
    >
      <BeamNode ref={userRef} className="h-14 w-14">
        <User className="h-6 w-6 text-muted-foreground" />
      </BeamNode>

      <BeamNode ref={aiRef} className="h-16 w-16">
        <Bot className="h-8 w-8 text-foreground" />
      </BeamNode>

      <BeamNode ref={outputRef} className="h-14 w-14">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </BeamNode>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={aiRef}
        duration={3}
        curvature={0.2}
        gradientStartColor="#3b82f6"
        gradientStopColor="#1d4ed8"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={outputRef}
        duration={3}
        delay={0.5}
        curvature={-0.2}
        gradientStartColor="#10b981"
        gradientStopColor="#059669"
      />
    </BeamContainer>
  );
}
