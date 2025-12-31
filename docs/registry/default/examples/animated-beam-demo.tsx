import { Bot, Search, User, Zap } from "lucide-react";
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
  const searchRef = React.useRef<HTMLDivElement>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  return (
    <BeamContainer
      ref={containerRef}
      className="mx-auto flex w-full items-center justify-between rounded-xl border bg-background p-10 shadow-sm"
    >
      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={userRef}
          className="h-12 w-12 border-2 border-blue-500/20 bg-blue-500/10"
        >
          <User className="h-6 w-6 text-blue-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          User
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={aiRef}
          className="h-16 w-16 border-2 border-purple-500/20 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <Bot className="h-8 w-8 text-purple-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          AI Agent
        </span>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <BeamNode
            ref={searchRef}
            className="h-12 w-12 border-2 border-amber-500/20 bg-amber-500/10"
          >
            <Search className="h-5 w-5 text-amber-600" />
          </BeamNode>
          <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Search
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BeamNode
            ref={resultRef}
            className="h-12 w-12 border-2 border-emerald-500/20 bg-emerald-500/10"
          >
            <Zap className="h-5 w-5 text-emerald-600" />
          </BeamNode>
          <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Result
          </span>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={aiRef}
        duration={3}
        curvature={0.2}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={searchRef}
        duration={3}
        delay={0.5}
        curvature={-0.3}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#f59e0b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={searchRef}
        toRef={aiRef}
        duration={3}
        delay={1.5}
        curvature={-0.3}
        reverse
        gradientStartColor="#f59e0b"
        gradientStopColor="#8b5cf6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={aiRef}
        toRef={resultRef}
        duration={3}
        delay={2.5}
        curvature={0.3}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#10b981"
      />
    </BeamContainer>
  );
}
