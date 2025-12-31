import { Cloud, Laptop, ShieldCheck } from "lucide-react";
import React from "react";
import {
  AnimatedBeam,
  BeamContainer,
  BeamNode,
} from "@/registry/default/ui/animated-beam";

export default function AnimatedBeamCurvedDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const laptopRef = React.useRef<HTMLDivElement>(null);
  const shieldRef = React.useRef<HTMLDivElement>(null);
  const cloudRef = React.useRef<HTMLDivElement>(null);

  return (
    <BeamContainer
      ref={containerRef}
      className="mx-auto flex w-full items-center justify-between rounded-xl border bg-background p-10 shadow-sm"
    >
      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={laptopRef}
          className="h-12 w-12 border-2 border-blue-500/20 bg-blue-500/10"
        >
          <Laptop className="h-6 w-6 text-blue-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          Local
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={shieldRef}
          className="h-14 w-14 border-2 border-emerald-500/20 bg-emerald-500/10"
        >
          <ShieldCheck className="h-7 w-7 text-emerald-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          Encrypt
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={cloudRef}
          className="h-12 w-12 border-2 border-sky-500/20 bg-sky-500/10"
        >
          <Cloud className="h-6 w-6 text-sky-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          Cloud
        </span>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={laptopRef}
        toRef={shieldRef}
        duration={3}
        curvature={0.4}
        gradientStartColor="#3b82f6"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={shieldRef}
        toRef={cloudRef}
        duration={3}
        delay={0.5}
        curvature={-0.4}
        gradientStartColor="#10b981"
        gradientStopColor="#0ea5e9"
      />
    </BeamContainer>
  );
}
