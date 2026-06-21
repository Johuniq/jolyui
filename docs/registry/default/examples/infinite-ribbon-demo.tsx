"use client";

import { InfiniteRibbon } from "@/registry/default/ui/infinite-ribbon";

export default function InfiniteRibbonDemo() {
  return (
    <div className="relative w-full overflow-hidden rounded-md border bg-background">
      <InfiniteRibbon className="bg-yellow-400 text-black dark:bg-yellow-500">
        ✦ JolyUI · Infinite Ribbon · Build beautiful interfaces ✦
      </InfiniteRibbon>
      <div className="h-32" />
    </div>
  );
}
