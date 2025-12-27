import { cn } from "@/lib/utils";
import * as React from "react";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid auto-rows-[minmax(180px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoGrid.displayName = "BentoGrid";

export { BentoGrid };
