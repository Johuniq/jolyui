"use client";
import { UserPlus, XIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
  type SpringOptions,
  type UseInViewOptions,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type FormatNumberResult = { number: string[]; unit: string };

function formatNumber(num: number, formatted: boolean): FormatNumberResult {
  if (formatted) {
    if (num < 1000) {
      return { number: [num.toString()], unit: "" };
    }
    const units = ["k", "M", "B", "T"];
    let unitIndex = 0;
    let n = num;
    while (n >= 1000 && unitIndex < units.length) {
      n /= 1000;
      unitIndex++;
    }
    const finalNumber = Math.floor(n).toString();
    return { number: [finalNumber], unit: units[unitIndex - 1] ?? "" };
  } else {
    return { number: num.toLocaleString("en-US").split(","), unit: "" };
  }
}

type XFollowButtonAnimatedProps = HTMLMotionProps<"a"> & {
  username: string;
  followers?: number;
  transition?: SpringOptions;
  formatted?: boolean;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
};

function XFollowButtonAnimated({
  ref,
  username = "johuniq",
  followers = 0,
  transition = { stiffness: 90, damping: 50 },
  formatted = false,
  inView = false,
  inViewOnce = true,
  inViewMargin = "0px",
  className,
  ...props
}: XFollowButtonAnimatedProps) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, transition);
  const motionNumberRef = React.useRef(0);
  const isCompletedRef = React.useRef(false);
  const [currentNumber, setCurrentNumber] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [displayParticles, setDisplayParticles] = React.useState(false);

  const xUrl = React.useMemo(() => `https://x.com/${username}`, [username]);

  const handleDisplayParticles = React.useCallback(() => {
    setDisplayParticles(true);
    setTimeout(() => setDisplayParticles(false), 1500);
  }, []);

  const localRef = React.useRef<HTMLAnchorElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLAnchorElement);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isComponentInView = !inView || inViewResult;

  React.useEffect(() => {
    const unsubscribe = springVal.on("change", (latest: number) => {
      const newValue = Math.round(latest);
      if (motionNumberRef.current !== newValue) {
        motionNumberRef.current = newValue;
        setCurrentNumber(newValue);
      }
      if (followers !== 0 && newValue >= followers && !isCompletedRef.current) {
        isCompletedRef.current = true;
        setIsCompleted(true);
        handleDisplayParticles();
      }
    });
    return () => unsubscribe();
  }, [springVal, followers, handleDisplayParticles]);

  React.useEffect(() => {
    if (followers > 0 && isComponentInView) motionVal.set(followers);
  }, [motionVal, followers, isComponentInView]);

  const fillPercentage = Math.min(100, (currentNumber / followers) * 100);
  const formattedResult = formatNumber(currentNumber, formatted);
  const ghostFormattedNumber = formatNumber(followers, formatted);

  const renderNumberSegments = (
    segments: string[],
    unit: string,
    isGhost: boolean
  ) => (
    <span
      className={cn(
        "flex items-center gap-px",
        isGhost ? "invisible" : "absolute top-0 left-0"
      )}
    >
      {segments.map((segment, index) => (
        <span key={index} className="tabular-nums">
          {segment}
        </span>
      ))}
      {formatted && unit && <span className="leading-none">{unit}</span>}
    </span>
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      handleDisplayParticles();
      setTimeout(() => window.open(xUrl, "_blank"), 500);
    },
    [handleDisplayParticles, xUrl]
  );

  return (
    <motion.a
      ref={localRef}
      href={xUrl}
      rel="noopener noreferrer"
      target="_blank"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 text-sm font-bold bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-2 h-10 cursor-pointer whitespace-nowrap transition-colors [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        className
      )}
      {...props}
    >
      {/* X logo SVG */}
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.1-6.694-5.867 6.694h-3.306l7.73-8.835L.424 2.25h6.7l4.581 6.056 5.339-6.056zM17.534 20.766h1.832L6.322 3.98H4.457l13.077 16.786z" />
      </svg>

      <div className="relative inline-flex size-[18px] shrink-0">
        <UserPlus
          className="text-muted-foreground"
          size={18}
          aria-hidden="true"
        />
        {/* Blue accent fills as counter animates */}
        <div
          className="absolute top-0 left-0 text-blue-500"
          aria-hidden="true"
          style={{
            overflow: "hidden",
            width: `${fillPercentage}%`,
          }}
        >
          <UserPlus size={18} fill="currentColor" className="text-blue-500" />
        </div>
        <AnimatePresence>
          {displayParticles && (
            <>
              {/* Blue pulse ripple */}
              <motion.div
                className="absolute inset-0 rounded-full border border-blue-500"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Blue particle burst */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-blue-500"
                  initial={{ x: "50%", y: "50%", scale: 0, opacity: 0 }}
                  animate={{
                    x: `calc(50% + ${Math.cos((i * Math.PI) / 4) * 35}px)`,
                    y: `calc(50% + ${Math.sin((i * Math.PI) / 4) * 35}px)`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.04,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <span className="relative inline-flex">
        {renderNumberSegments(
          ghostFormattedNumber.number,
          ghostFormattedNumber.unit,
          true
        )}
        {renderNumberSegments(
          formattedResult.number,
          formattedResult.unit,
          false
        )}
      </span>
    </motion.a>
  );
}

export { XFollowButtonAnimated, type XFollowButtonAnimatedProps };

type XFollowButtonStandardProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    username: string;
    size?: "large" | "small";
    showScreenName?: boolean;
    /** If true, load X's widgets.js and allow the widget to transform the anchor. Default: false (uses intent link so styling is preserved) */
    useWidget?: boolean;
  };

// Ensure the X (Twitter) widgets script is loaded only once.
function ensureXWidgets() {
  if (typeof window === "undefined") return;

  const w = window as any;
  if (w.twttr && w.twttr.widgets) return;
  if (w.__twttr_loading) return;

  w.__twttr_loading = true;
  const script = document.createElement("script");
  script.src = "https://platform.twitter.com/widgets.js";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    try {
      w.__twttr_loading = false;
      if (
        w.twttr &&
        w.twttr.widgets &&
        typeof w.twttr.widgets.load === "function"
      ) {
        w.twttr.widgets.load();
      }
    } catch (e) {
      // ignore
    }
  };
  document.head.appendChild(script);
}

function XFollowButtonStandard({
  username = "johuniq",
  size = "small",
  showScreenName = true,
  className,
  rel = "noopener noreferrer",
  target = "_blank",
  children,
  onClick,
  ...props
}: XFollowButtonStandardProps) {
  const ref = React.useRef<HTMLAnchorElement | null>(null);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    // Only load/initialize the official X widgets if requested via the `useWidget` prop.
    if (!((props as any)?.useWidget === true)) return;

    ensureXWidgets();

    const w = (window as any)?.twttr;
    if (w && w.widgets && typeof w.widgets.load === "function") {
      try {
        w.widgets.load(ref.current ?? document);
      } catch (e) {
        try {
          if (typeof w.widgets.load === "function") w.widgets.load();
        } catch {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, size, showScreenName]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      setClicked(true);
      window.setTimeout(() => setClicked(false), 600);
      if (onClick) onClick(e as any);
      // Let the anchor's default behavior handle navigation (target/rel). Do not call window.open here.
    },
    [onClick]
  );

  const useWidget = (props as any)?.useWidget === true;

  // If useWidget is true we point to the profile URL (widgets may transform it),
  // otherwise use the intent link so we keep our custom styling intact.
  const href = useWidget
    ? `https://twitter.com/${username.replace(/^@/, "")}`
    : `https://twitter.com/intent/follow?screen_name=${username.replace(/^@/, "")}`;

  const isLarge = size === "large";
  const iconSize = isLarge ? 18 : 14;

  const baseClasses = cn(
    "relative inline-flex items-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    // light / dark backgrounds
    "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50",
    "dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800",
    isLarge ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-sm",
    className
  );

  const ariaLabel = `Follow @${username.replace(/^@/, "")}`;

  // data attrs for the canonical widget (kept for compatibility) — only when using widget
  const dataAttrs: Record<string, string | undefined> = {};
  if (useWidget) {
    dataAttrs["data-show-screen-name"] = showScreenName ? "true" : "false";
    if (isLarge) dataAttrs["data-size"] = "large";
  }

  return (
    <motion.a
      ref={ref}
      className={cn(useWidget ? "twitter-follow-button" : "", baseClasses)}
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      aria-label={ariaLabel}
      {...dataAttrs}
      {...(props as any)}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          isLarge ? "w-7 h-7" : "w-6 h-6",
          "bg-transparent"
        )}
        aria-hidden={true}
      >
        <span
          style={{ width: iconSize, height: iconSize }}
          className="inline-block"
        >
          <XIcon className="w-full h-full text-current" />
        </span>
      </span>

      {showScreenName && (
        <span className="whitespace-nowrap">
          {children ?? `Follow @${username.replace(/^@/, "")}`}
        </span>
      )}

      {/* small click/pulse indicator */}
      {clicked && (
        <span
          className={cn(
            "absolute -translate-y-1/2 translate-x-1/2 rounded-full",
            "bg-primary/20"
          )}
          style={{
            right: -6,
            top: "50%",
            width: isLarge ? 28 : 20,
            height: isLarge ? 28 : 20,
          }}
        />
      )}
    </motion.a>
  );
}

export { XFollowButtonStandard, type XFollowButtonStandardProps };
