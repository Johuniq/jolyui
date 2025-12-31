import { Server, User } from "lucide-react";
import React from "react";
import {
  AnimatedBeam,
  BeamContainer,
  BeamNode,
} from "@/registry/default/ui/animated-beam";

export default function AnimatedBeamBidirectionalDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const userARef = React.useRef<HTMLDivElement>(null);
  const userBRef = React.useRef<HTMLDivElement>(null);
  const serverRef = React.useRef<HTMLDivElement>(null);

  return (
    <BeamContainer
      ref={containerRef}
      className="mx-auto flex w-full items-center justify-between rounded-xl border bg-background p-10 shadow-sm"
    >
      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={userARef}
          className="h-12 w-12 border-2 border-blue-500/20 bg-blue-500/10"
        >
          <User className="h-6 w-6 text-blue-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          User A
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={serverRef}
          className="h-16 w-16 border-2 border-purple-500/20 bg-purple-500/10"
        >
          <Server className="h-8 w-8 text-purple-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          Relay Server
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={userBRef}
          className="h-12 w-12 border-2 border-amber-500/20 bg-amber-500/10"
        >
          <User className="h-6 w-6 text-amber-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          User B
        </span>
      </div>

      {/* User A <-> Server */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userARef}
        toRef={serverRef}
        duration={3}
        curvature={0.3}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={serverRef}
        toRef={userARef}
        duration={3}
        delay={1.5}
        curvature={0.3}
        reverse
        gradientStartColor="#8b5cf6"
        gradientStopColor="#3b82f6"
      />

      {/* User B <-> Server */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userBRef}
        toRef={serverRef}
        duration={3}
        curvature={-0.3}
        gradientStartColor="#f59e0b"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={serverRef}
        toRef={userBRef}
        duration={3}
        delay={1.5}
        curvature={-0.3}
        reverse
        gradientStartColor="#8b5cf6"
        gradientStopColor="#f59e0b"
      />
    </BeamContainer>
  );
}
