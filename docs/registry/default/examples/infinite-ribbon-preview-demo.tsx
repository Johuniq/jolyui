"use client";

import { InfiniteRibbon } from "@/registry/default/ui/infinite-ribbon";

export function InfiniteRibbonPreview() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-md border bg-background">
      <InfiniteRibbon
        className="absolute bg-foreground text-background"
        duration={42}
        rotation={5}
      >
        Craft crisp dashboards, lively landing pages, and polished product
        flows with components that feel ready from the first click.
      </InfiniteRibbon>
      <InfiniteRibbon
        className="absolute bg-foreground text-background"
        duration={42}
        reverse
        rotation={-5}
      >
        Craft crisp dashboards, lively landing pages, and polished product
        flows with components that feel ready from the first click.
      </InfiniteRibbon>
    </div>
  );
}

export default InfiniteRibbonPreview;
