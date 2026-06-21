"use client";

import { InfiniteRibbon } from "@/registry/default/ui/infinite-ribbon";

export default function InfiniteRibbonCustomDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-stretch gap-6">
      <div className="space-y-2">
        <p className="font-medium text-sm">Slow forward ribbon</p>
        <div className="relative overflow-hidden rounded-md border bg-background">
          <InfiniteRibbon repeat={4} duration={20}>
            🚀 Launch faster · Ship more · Sleep better 🚀
          </InfiniteRibbon>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-sm">Fast reverse ribbon</p>
        <div className="relative overflow-hidden rounded-md border bg-background">
          <InfiniteRibbon
            repeat={6}
            duration={6}
            reverse
            className="bg-pink-500 text-white dark:bg-pink-600"
          >
            ⚡ Fast · Furious · Animated ⚡ Fast · Furious · Animated ⚡
          </InfiniteRibbon>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-sm">Tilted marquee</p>
        <div className="relative h-20 overflow-hidden rounded-md border bg-muted/30">
          <div className="absolute inset-0 flex items-center">
            <InfiniteRibbon
              repeat={3}
              duration={12}
              rotation={-3}
              className="w-full bg-emerald-400 text-black dark:bg-emerald-500"
            >
              🎉 JolyUI · Hand-crafted components for React 🎉
            </InfiniteRibbon>
          </div>
        </div>
      </div>
    </div>
  );
}
