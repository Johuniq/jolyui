"use client";

import { StatusTooltip } from "@/components/ui/animated-tooltip";
import { cn } from "@/lib/utils";

export default function AnimatedTooltipStatusDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {(["online", "away", "busy", "offline"] as const).map((status) => (
        <StatusTooltip key={status} status={status}>
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <div
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                status === "online" && "bg-green-500",
                status === "away" && "bg-yellow-500",
                status === "busy" && "bg-red-500",
                status === "offline" && "bg-gray-400",
              )}
            />
            <span className="font-medium text-sm capitalize">{status}</span>
          </div>
        </StatusTooltip>
      ))}
    </div>
  );
}
