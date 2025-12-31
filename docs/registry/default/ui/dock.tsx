import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DockProps {
  /** Distance threshold for magnification effect */
  magnification?: number;
  /** Maximum scale factor when hovered */
  maxScale?: number;
  /** Base size of dock items in pixels */
  iconSize?: number;
  /** Distance from mouse to apply magnification */
  distance?: number;
  className?: string;
  children?: React.ReactNode;
}

const DockContext = React.createContext<{
  mouseX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  maxScale: number;
  iconSize: number;
  distance: number;
} | null>(null);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = 60,
      maxScale = 1.5,
      iconSize = 48,
      distance = 140,
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <DockContext.Provider
        value={{ mouseX, magnification, maxScale, iconSize, distance }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "dock mx-auto flex h-16 items-end gap-2 rounded-2xl border bg-background/80 px-3 pb-2 backdrop-blur-md",
            "shadow-foreground/5 shadow-lg",
            className,
          )}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  },
);
Dock.displayName = "Dock";

interface DockItemProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const DockItem = React.forwardRef<HTMLDivElement, DockItemProps>(
  ({ className, children, onClick }, _ref) => {
    const context = React.useContext(DockContext);
    const itemRef = React.useRef<HTMLDivElement>(null);

    if (!context) {
      throw new Error("DockItem must be used within a Dock");
    }

    const { mouseX, maxScale, iconSize, distance } = context;

    const distanceCalc = useTransform(mouseX, (val: number) => {
      const bounds = itemRef.current?.getBoundingClientRect() ?? {
        x: 0,
        width: 0,
      };
      return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [iconSize, iconSize * maxScale, iconSize],
    );

    const width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    return (
      <motion.div
        ref={itemRef}
        style={{ width, height: width }}
        onClick={onClick}
        className={cn(
          "dock-item group relative flex aspect-square cursor-pointer items-center justify-center rounded-xl bg-muted transition-colors hover:bg-muted/80",
          className,
        )}
      >
        {children}
      </motion.div>
    );
  },
);
DockItem.displayName = "DockItem";

interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "dock-icon flex h-full w-full items-center justify-center text-foreground",
          "[&>svg]:h-1/2 [&>svg]:w-1/2",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
DockIcon.displayName = "DockIcon";

interface DockLabelProps {
  className?: string;
  children?: React.ReactNode;
}

const DockLabel = React.forwardRef<HTMLDivElement, DockLabelProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "dock-label -top-9 -translate-x-1/2 pointer-events-none absolute left-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-background text-xs opacity-0 transition-opacity group-hover:opacity-100",
          className,
        )}
      >
        {children}
        {/* Tooltip arrow */}
        <div className="-bottom-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rotate-45 bg-foreground" />
      </div>
    );
  },
);
DockLabel.displayName = "DockLabel";

interface DockSeparatorProps {
  className?: string;
}

const DockSeparator = React.forwardRef<HTMLDivElement, DockSeparatorProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "dock-separator mx-1 h-10 w-px self-center bg-border",
          className,
        )}
      />
    );
  },
);
DockSeparator.displayName = "DockSeparator";

export {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
  DockSeparator,
  type DockIconProps,
  type DockItemProps,
  type DockLabelProps,
  type DockProps,
  type DockSeparatorProps,
};
