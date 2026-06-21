"use client";

import { InfiniteRibbon } from "@/registry/default/ui/infinite-ribbon";

export default function InfiniteRibbonCustomDemo() {
  return (
    <div className="flex flex-col items-stretch justify-center gap-8">
      <div className="space-y-2">
        <p className="font-medium text-sm">Slow forward ribbon</p>
        <InfiniteRibbon repeat={4} duration={20}>
          🚀 Launch faster · Ship more · Sleep better 🚀
        </InfiniteRibbon>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-sm">Fast reverse ribbon</p>
        <InfiniteRibbon repeat={6} duration={6} reverse className="bg-pink-500 text-white dark:bg-pink-600">
          ⚡ Fast · Furious · Animated ⚡ Fast · Furious · Animated ⚡
        </InfiniteRibbon>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-sm">Tilted marquee</p>
        <div className="rounded-md border bg-muted/30 py-6">
          <InfiniteRibbon repeat={3} duration={12} rotation={-3} className="bg-emerald-400 text-black dark:bg-emerald-500">
            🎉 JolyUI · Hand-crafted components for React 🎉
          </InfiniteRibbon>
        </div>
      </div>
    </div>
  );
}
