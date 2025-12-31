import {
  Database,
  Layout,
  Lock,
  Package,
  Server,
  Smartphone,
} from "lucide-react";
import React from "react";
import {
  AnimatedBeam,
  BeamContainer,
  BeamNode,
} from "@/registry/default/ui/animated-beam";

export default function AnimatedBeamMultipleDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const clientRef = React.useRef<HTMLDivElement>(null);
  const gatewayRef = React.useRef<HTMLDivElement>(null);
  const authRef = React.useRef<HTMLDivElement>(null);
  const ordersRef = React.useRef<HTMLDivElement>(null);
  const inventoryRef = React.useRef<HTMLDivElement>(null);
  const dbRef = React.useRef<HTMLDivElement>(null);

  return (
    <BeamContainer
      ref={containerRef}
      className="mx-auto flex w-full items-center justify-center gap-12 rounded-xl border bg-background p-10 shadow-sm"
    >
      {/* Client Layer */}
      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={clientRef}
          className="h-14 w-14 border-2 border-blue-500/20 bg-blue-500/10"
        >
          <Smartphone className="h-6 w-6 text-blue-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          Client
        </span>
      </div>

      {/* Gateway Layer */}
      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={gatewayRef}
          className="h-16 w-16 border-2 border-purple-500/20 bg-purple-500/10"
        >
          <Server className="h-8 w-8 text-purple-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          Gateway
        </span>
      </div>

      {/* Services Layer */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <BeamNode
            ref={authRef}
            className="h-12 w-12 border-2 border-emerald-500/20 bg-emerald-500/10"
          >
            <Lock className="h-5 w-5 text-emerald-600" />
          </BeamNode>
          <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Auth
          </span>
        </div>

        <div className="flex items-center gap-3">
          <BeamNode
            ref={ordersRef}
            className="h-12 w-12 border-2 border-amber-500/20 bg-amber-500/10"
          >
            <Package className="h-5 w-5 text-amber-600" />
          </BeamNode>
          <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Orders
          </span>
        </div>

        <div className="flex items-center gap-3">
          <BeamNode
            ref={inventoryRef}
            className="h-12 w-12 border-2 border-rose-500/20 bg-rose-500/10"
          >
            <Layout className="h-5 w-5 text-rose-600" />
          </BeamNode>
          <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
            Stock
          </span>
        </div>
      </div>

      {/* Database Layer */}
      <div className="flex flex-col items-center gap-2">
        <BeamNode
          ref={dbRef}
          className="h-14 w-14 border-2 border-slate-500/20 bg-slate-500/10"
        >
          <Database className="h-6 w-6 text-slate-600" />
        </BeamNode>
        <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          DB
        </span>
      </div>

      {/* Connections */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={clientRef}
        toRef={gatewayRef}
        duration={3}
        curvature={0}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
      />

      {/* Gateway to Services */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gatewayRef}
        toRef={authRef}
        duration={3}
        delay={0.2}
        curvature={-0.3}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gatewayRef}
        toRef={ordersRef}
        duration={3}
        delay={0.4}
        curvature={0}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#f59e0b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gatewayRef}
        toRef={inventoryRef}
        duration={3}
        delay={0.6}
        curvature={0.3}
        gradientStartColor="#8b5cf6"
        gradientStopColor="#f43f5e"
      />

      {/* Services to DB */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={authRef}
        toRef={dbRef}
        duration={3}
        delay={1}
        curvature={0.3}
        gradientStartColor="#10b981"
        gradientStopColor="#64748b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={ordersRef}
        toRef={dbRef}
        duration={3}
        delay={1.2}
        curvature={0}
        gradientStartColor="#f59e0b"
        gradientStopColor="#64748b"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={inventoryRef}
        toRef={dbRef}
        duration={3}
        delay={1.4}
        curvature={-0.3}
        gradientStartColor="#f43f5e"
        gradientStopColor="#64748b"
      />
    </BeamContainer>
  );
}
