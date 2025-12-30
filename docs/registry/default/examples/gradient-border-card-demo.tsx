"use client";

import { Shield, Sparkles, Zap } from "lucide-react";
import { GradientBorderCard } from "@/registry/default/ui/gradient-border";

export default function GradientBorderCardDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <GradientBorderCard
        colors={["#f43f5e", "#ec4899", "#8b5cf6", "#f43f5e"]}
        duration={4}
        glowEffect
      >
        <div className="p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-2 font-semibold">Gradient Glow</h3>
          <p className="text-muted-foreground text-sm">
            Card with rotating gradient border and glow effect
          </p>
        </div>
      </GradientBorderCard>

      <GradientBorderCard
        colors={["#22c55e", "#10b981", "#14b8a6", "#22c55e"]}
        duration={3}
        borderWidth={3}
      >
        <div className="p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
            <Zap className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="mb-2 font-semibold">Thick Border</h3>
          <p className="text-muted-foreground text-sm">
            Thicker gradient border for emphasis
          </p>
        </div>
      </GradientBorderCard>

      <GradientBorderCard
        colors={["#3b82f6", "#6366f1", "#8b5cf6", "#3b82f6"]}
        duration={5}
        glowEffect
        glowOpacity={0.5}
      >
        <div className="p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <h3 className="mb-2 font-semibold">Strong Glow</h3>
          <p className="text-muted-foreground text-sm">
            Higher opacity glow for dramatic effect
          </p>
        </div>
      </GradientBorderCard>
    </div>
  );
}
