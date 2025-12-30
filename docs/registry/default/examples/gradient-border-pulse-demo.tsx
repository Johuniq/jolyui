"use client";

import { PulseBorder } from "@/registry/default/ui/gradient-border";

export default function GradientBorderPulseDemo() {
  return (
    <div className="h-full">
      <PulseBorder color="hsl(var(--primary))">
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-2 font-semibold">Pulse Border</h3>
          <p className="text-muted-foreground text-sm">
            Pulsing border with outer glow effect
          </p>
        </div>
      </PulseBorder>
    </div>
  );
}
