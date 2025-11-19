import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, type Variants } from "motion/react";
import * as React from "react";

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    dir: {
      ltr: "",
      rtl: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      dir: "ltr",
      className: "-space-x-1",
    },
    {
      orientation: "horizontal",
      dir: "rtl",
      className: "-space-x-1 flex-row-reverse space-x-reverse",
    },
    {
      orientation: "vertical",
      dir: "ltr",
      className: "-space-y-1",
    },
    {
      orientation: "vertical",
      dir: "rtl",
      className: "-space-y-1 flex-col-reverse space-y-reverse",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    dir: "ltr",
  },
});

export interface AvatarGroupProps
  extends Omit<React.ComponentProps<"div">, "dir">,
    VariantProps<typeof avatarGroupVariants> {
  size?: number;
  max?: number;
  asChild?: boolean;
  reverse?: boolean;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

export function AvatarGroup(props: AvatarGroupProps) {
  const {
    orientation = "horizontal",
    dir = "ltr",
    size = 40,
    max,
    asChild,
    reverse = false,
    tooltipPlacement = "top",
    className,
    children,
    ...rootProps
  } = props;

  const childrenArray = React.Children.toArray(children).filter(
    React.isValidElement,
  );
  const itemCount = childrenArray.length;
  const shouldTruncate = max && itemCount > max;
  const visibleItems = shouldTruncate
    ? childrenArray.slice(0, max - 1)
    : childrenArray;
  const overflowCount = shouldTruncate ? itemCount - (max - 1) : 0;
  const totalRenderedItems = shouldTruncate ? max : itemCount;

  // Generate unique IDs for each avatar to ensure complete isolation
  const uniqueIds = React.useMemo(
    () => visibleItems.map((_, i) => `avatar-${Math.random().toString(36).substr(2, 9)}-${i}`),
    [visibleItems.length],
  );

  const RootPrimitive = asChild ? Slot : "div";

  return (
    <RootPrimitive
      data-orientation={orientation}
      data-slot="avatar-group"
      {...rootProps}
      className={cn(avatarGroupVariants({ orientation, dir }), className)}
    >
      {visibleItems.map((child, index) => {
        const uniqueId = uniqueIds[index] || `avatar-fallback-${index}`;
        return (
          <AvatarGroupItem
            key={uniqueId}
            uniqueId={uniqueId}
            child={child}
            index={index}
            itemCount={totalRenderedItems}
            orientation={orientation}
            dir={dir}
            size={size}
            reverse={reverse}
            tooltipPlacement={tooltipPlacement || "top"}
          />
        );
      })}
      {shouldTruncate && (
        <AvatarGroupItem
          key="overflow-item"
          uniqueId="overflow-item"
          child={
            <div className="flex size-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs">
              +{overflowCount}
            </div>
          }
          index={visibleItems.length}
          itemCount={totalRenderedItems}
          orientation={orientation}
          dir={dir}
          size={size}
          reverse={reverse}
          tooltipPlacement={tooltipPlacement || "top"}
        />
      )}
    </RootPrimitive>
  );
}

interface AvatarGroupItemProps
  extends Omit<React.ComponentProps<typeof Slot>, "dir">,
    VariantProps<typeof avatarGroupVariants> {
  uniqueId: string;
  child: React.ReactElement;
  index: number;
  itemCount: number;
  size: number;
  reverse: boolean;
  tooltipPlacement: "top" | "bottom" | "left" | "right";
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: -20,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: index * 0.08,
    },
  }),
};

const AvatarGroupItem = React.memo(function AvatarGroupItem(props: AvatarGroupItemProps) {
  const {
    uniqueId,
    child,
    index,
    size,
    orientation,
    dir = "ltr",
    reverse = false,
    itemCount,
    tooltipPlacement = "top",
    className,
    style,
    ...itemProps
  } = props;

  const [isHovered, setIsHovered] = React.useState(false);
  const [tooltipName, setTooltipName] = React.useState<string>("");
  const [isAnimating, setIsAnimating] = React.useState(false);

  const tooltipPositionClasses = {
    top: "-top-12 left-1/2 -translate-x-1/2",
    bottom: "-bottom-12 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-2 -translate-y-1/2 -translate-x-full",
    right: "top-1/2 -right-2 -translate-y-1/2 translate-x-full",
  };

  const tooltipArrowClasses = {
    top: "-bottom-1 left-1/2 -translate-x-1/2 rotate-45",
    bottom: "-top-1 left-1/2 -translate-x-1/2 rotate-45",
    left: "top-1/2 -right-1 -translate-y-1/2 rotate-45",
    right: "top-1/2 -left-1 -translate-y-1/2 rotate-45",
  };

  const tooltipAnimations = {
    top: { initial: { y: -10 }, animate: { y: 0 }, exit: { y: -10 } },
    bottom: { initial: { y: 10 }, animate: { y: 0 }, exit: { y: 10 } },
    left: { initial: { x: -10 }, animate: { x: 0 }, exit: { x: -10 } },
    right: { initial: { x: 10 }, animate: { x: 0 }, exit: { x: 10 } },
  };

  React.useEffect(() => {
    // Recursive function to find img elements and extract alt/title
    const extractName = (element: any): string => {
      if (!React.isValidElement(element)) return "";

      const props = element.props as any;

      // Check if this is an img element with alt
      if (element.type === "img" && props?.alt) {
        return props.alt;
      }

      // Check direct props
      if (props?.alt) return props.alt;
      if (props?.title) return props.title;

      // Recursively check children
      if (props?.children) {
        if (React.isValidElement(props.children)) {
          const childName = extractName(props.children);
          if (childName) return childName;
        } else if (Array.isArray(props.children)) {
          for (const child of props.children) {
            const childName = extractName(child);
            if (childName) return childName;
          }
        }
      }

      return "";
    };

    const name = extractName(child);
    setTooltipName(name);
  }, [child]);

  const maskStyle = React.useMemo<React.CSSProperties>(() => {
    let maskImage = "";

    let shouldMask = false;

    if (orientation === "vertical" && dir === "rtl" && reverse) {
      shouldMask = index !== itemCount - 1;
    } else {
      shouldMask = reverse ? index < itemCount - 1 : index > 0;
    }

    if (shouldMask) {
      const maskRadius = size / 2;
      const maskOffset = size / 4 + size / 10;

      if (orientation === "vertical") {
        if (dir === "ltr") {
          if (reverse) {
            maskImage = `radial-gradient(circle ${maskRadius}px at 50% ${size + maskOffset}px, transparent 99%, white 100%)`;
          } else {
            maskImage = `radial-gradient(circle ${maskRadius}px at 50% -${maskOffset}px, transparent 99%, white 100%)`;
          }
        } else {
          if (reverse) {
            maskImage = `radial-gradient(circle ${maskRadius}px at 50% -${maskOffset}px, transparent 99%, white 100%)`;
          } else {
            maskImage = `radial-gradient(circle ${maskRadius}px at 50% ${size + maskOffset}px, transparent 99%, white 100%)`;
          }
        }
      } else {
        if (dir === "ltr") {
          if (reverse) {
            maskImage = `radial-gradient(circle ${maskRadius}px at ${size + maskOffset}px 50%, transparent 99%, white 100%)`;
          } else {
            maskImage = `radial-gradient(circle ${maskRadius}px at -${maskOffset}px 50%, transparent 99%, white 100%)`;
          }
        } else {
          if (reverse) {
            maskImage = `radial-gradient(circle ${maskRadius}px at -${maskOffset}px 50%, transparent 99%, white 100%)`;
          } else {
            maskImage = `radial-gradient(circle ${maskRadius}px at ${size + maskOffset}px 50%, transparent 99%, white 100%)`;
          }
        }
      }
    }

    return {
      width: size,
      height: size,
      maskImage,
    };
  }, [size, index, orientation, dir, reverse, itemCount]);

  const MotionSlot = motion.create(Slot as any);

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
    setIsAnimating(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
    setIsAnimating(false);
  }, []);

  return (
    <motion.div
      className="relative inline-block"
      initial="hidden"
      animate="visible"
      custom={index}
      variants={itemVariants}
      style={{ zIndex: isAnimating ? 50 : "auto" }}
    >
      <motion.div
        animate={
          isHovered
            ? {
                scale: 1.15,
                y: -8,
              }
            : {
                scale: 1,
                y: 0,
              }
        }
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
      >
        <MotionSlot
          data-slot="avatar-group-item"
          className={cn(
            "relative size-full shrink-0 overflow-hidden rounded-full [&_img]:size-full cursor-pointer",
            "before:absolute before:inset-0 before:rounded-full before:border-2 before:border-transparent",
            isHovered && "before:border-primary/50",
            "before:transition-colors before:duration-300",
            "after:absolute after:inset-0 after:rounded-full after:shadow-lg",
            isHovered ? "after:shadow-primary/40" : "after:shadow-primary/0",
            "after:transition-shadow after:duration-300",
            className,
          )}
          style={{
            ...maskStyle,
            ...style,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...itemProps}
        >
          {child}
        </MotionSlot>
      </motion.div>
      <AnimatePresence mode="wait">
        {tooltipName && isHovered && (
          <motion.div
            key={`tooltip-${uniqueId}`}
            initial={{
              opacity: 0,
              scale: 0.8,
              ...tooltipAnimations[tooltipPlacement].initial,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              ...tooltipAnimations[tooltipPlacement].animate,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              ...tooltipAnimations[tooltipPlacement].exit,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className={`pointer-events-none absolute z-[100] whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-100 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-900 shadow-xl ${tooltipPositionClasses[tooltipPlacement]}`}
          >
            {tooltipName}
            <div
              className={`absolute size-2 bg-gray-900 dark:bg-gray-100 ${tooltipArrowClasses[tooltipPlacement]}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Utility function - users need to provide this or we bundle it
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}
