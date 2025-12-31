import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Placement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";
type Animation = "fade" | "scale" | "slide" | "spring";

// Animated Tooltip
interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: Placement;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  offset?: number;
  disabled?: boolean;
}

export function AnimatedTooltip({
  children,
  content,
  placement = "top",
  animation = "fade",
  delay = 0,
  duration = 0.15,
  className,
  contentClassName,
  arrow = true,
  offset = 8,
  disabled = false,
}: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (placement) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "top-start":
        x = triggerRect.left;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "top-end":
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
        break;
      case "bottom-start":
        x = triggerRect.left;
        y = triggerRect.bottom + offset;
        break;
      case "bottom-end":
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.bottom + offset;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right":
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Keep tooltip within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));

    setPosition({ x, y });
  }, [offset, placement]);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition);
      window.addEventListener("resize", calculatePosition);
    }
    return () => {
      window.removeEventListener("scroll", calculatePosition);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isVisible, calculatePosition]);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getAnimationVariants = () => {
    const baseDirection = placement.split("-")[0];

    switch (animation) {
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case "slide": {
        const slideOffset = 10;
        const slideVariants = {
          top: {
            hidden: { opacity: 0, y: slideOffset },
            visible: { opacity: 1, y: 0 },
          },
          bottom: {
            hidden: { opacity: 0, y: -slideOffset },
            visible: { opacity: 1, y: 0 },
          },
          left: {
            hidden: { opacity: 0, x: slideOffset },
            visible: { opacity: 1, x: 0 },
          },
          right: {
            hidden: { opacity: 0, x: -slideOffset },
            visible: { opacity: 1, x: 0 },
          },
        };
        return (
          slideVariants[baseDirection as keyof typeof slideVariants] ||
          slideVariants.top
        );
      }
      case "spring":
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const getArrowPosition = () => {
    const baseDirection = placement.split("-")[0];
    const alignment = placement.split("-")[1];

    const arrowClasses = {
      top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-foreground border-x-transparent border-b-transparent",
      bottom:
        "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-foreground border-x-transparent border-t-transparent",
      left: "right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-foreground border-y-transparent border-r-transparent",
      right:
        "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-foreground border-y-transparent border-l-transparent",
    };

    let alignmentClass = "";
    if (alignment === "start") {
      alignmentClass =
        baseDirection === "top" || baseDirection === "bottom"
          ? "left-4 -translate-x-0"
          : "";
    } else if (alignment === "end") {
      alignmentClass =
        baseDirection === "top" || baseDirection === "bottom"
          ? "left-auto right-4 translate-x-0"
          : "";
    }

    return cn(
      arrowClasses[baseDirection as keyof typeof arrowClasses],
      alignmentClass,
    );
  };

  return (
    <>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        className={cn("inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleMouseEnter();
          }
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={cn(
              "fixed z-50 max-w-xs rounded-md bg-foreground px-3 py-1.5 text-background text-sm shadow-lg",
              contentClassName,
            )}
            style={{ left: position.x, top: position.y }}
            variants={getAnimationVariants()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={
              animation === "spring"
                ? { type: "spring", stiffness: 500, damping: 25 }
                : { duration }
            }
          >
            {content}
            {arrow && (
              <div
                className={cn("absolute h-0 w-0 border-4", getArrowPosition())}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Tooltip with Rich Content
interface RichTooltipProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  placement?: Placement;
  className?: string;
}

export function RichTooltip({
  children,
  title,
  description,
  image,
  placement = "top",
  className,
}: RichTooltipProps) {
  return (
    <AnimatedTooltip
      placement={placement}
      animation="scale"
      arrow={false}
      className={className}
      contentClassName="p-0 overflow-hidden max-w-[280px]"
      content={
        <div className="rounded-lg border bg-card text-card-foreground shadow-xl">
          {image && (
            <div className="h-32 w-full overflow-hidden">
              {/* biome-ignore lint/a11y/useAltText: alt is provided via title */}
              {/* biome-ignore lint/performance/noImgElement: next/image causes ESM issues with fumadocs-mdx */}
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="p-3">
            <p className="font-semibold text-foreground">{title}</p>
            {description && (
              <p className="mt-1 text-muted-foreground text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      }
    >
      {children}
    </AnimatedTooltip>
  );
}

// Icon Tooltip (compact)
interface IconTooltipProps {
  children: React.ReactNode;
  label: string;
  placement?: Placement;
  shortcut?: string;
}

export function IconTooltip({
  children,
  label,
  placement = "top",
  shortcut,
}: IconTooltipProps) {
  return (
    <AnimatedTooltip
      placement={placement}
      animation="fade"
      delay={200}
      content={
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {shortcut && (
            <kbd className="rounded bg-background/20 px-1.5 py-0.5 font-mono text-xs">
              {shortcut}
            </kbd>
          )}
        </div>
      }
    >
      {children}
    </AnimatedTooltip>
  );
}

// Hover Card (larger tooltip with delay)
interface HoverCardTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: Placement;
  className?: string;
}

export function HoverCardTooltip({
  children,
  content,
  placement = "bottom",
  className,
}: HoverCardTooltipProps) {
  return (
    <AnimatedTooltip
      placement={placement}
      animation="spring"
      delay={300}
      arrow={false}
      contentClassName={cn(
        "p-0 bg-card text-card-foreground border rounded-xl shadow-2xl max-w-sm",
        className,
      )}
      content={content}
    >
      {children}
    </AnimatedTooltip>
  );
}

// Confirmation Tooltip
interface ConfirmTooltipProps {
  children: React.ReactNode;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  placement?: Placement;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmTooltip({
  children,
  message,
  onConfirm,
  onCancel,
  placement: _placement = "top",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
        role="button"
        tabIndex={0}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
            />

            {/* Tooltip */}
            <motion.div
              className="fixed z-50 w-64 rounded-lg border bg-card p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <p className="mb-3 text-sm">{message}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="rounded-md px-3 py-1.5 text-muted-foreground text-sm hover:bg-accent"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-sm hover:bg-primary/90"
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Tooltip Group (for toolbar-style tooltips)
interface TooltipItem {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick?: () => void;
}

interface TooltipGroupProps {
  items: TooltipItem[];
  className?: string;
}

export function TooltipGroup({ items, className }: TooltipGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border bg-card p-1",
        className,
      )}
    >
      {items.map((item, index) => (
        <IconTooltip key={index} label={item.label} shortcut={item.shortcut}>
          <button
            onClick={item.onClick}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {item.icon}
          </button>
        </IconTooltip>
      ))}
    </div>
  );
}

// Floating Label (tooltip that stays visible on focus)
interface FloatingLabelProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

export function FloatingLabel({
  children,
  label,
  className,
}: FloatingLabelProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            className="-top-6 absolute left-0 font-medium text-primary text-xs"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}

// Status Tooltip (with colored indicator)
interface StatusTooltipProps {
  children: React.ReactNode;
  status: "online" | "offline" | "away" | "busy";
  label?: string;
  placement?: Placement;
}

export function StatusTooltip({
  children,
  status,
  label,
  placement = "top",
}: StatusTooltipProps) {
  const statusConfig = {
    online: { color: "bg-green-500", text: "Online" },
    offline: { color: "bg-gray-400", text: "Offline" },
    away: { color: "bg-yellow-500", text: "Away" },
    busy: { color: "bg-red-500", text: "Busy" },
  };

  const config = statusConfig[status];

  return (
    <AnimatedTooltip
      placement={placement}
      animation="fade"
      content={
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", config.color)} />
          <span>{label || config.text}</span>
        </div>
      }
    >
      {children}
    </AnimatedTooltip>
  );
}

export type {
    AnimatedTooltipProps,
    Animation,
    ConfirmTooltipProps,
    FloatingLabelProps,
    HoverCardTooltipProps,
    IconTooltipProps,
    Placement,
    RichTooltipProps,
    StatusTooltipProps,
    TooltipGroupProps
};

