"use client";

import { HeartIcon, SparklesIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { polarCheckoutUrl } from "@/lib/polar";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "jolyui:donation-banner:dismissed-at";
const HIDE_FOR_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

type Variant = "card" | "pill";

interface DonationBannerProps {
  /** `card` renders the full callout (right rail / inline), `pill` renders a compact row (sidebar top). */
  variant?: Variant;
  className?: string;
}

function readDismissedAt(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : null;
}

function writeDismissedAt(timestamp: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(timestamp));
}

function shouldHide(dismissedAt: number | null, now: number): boolean {
  if (dismissedAt == null) return false;
  return now - dismissedAt < HIDE_FOR_MS;
}

// Tiny presentational building blocks so both variants stay consistent and
// the JSX stays readable.
function HeartBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-7" : "size-10";
  const icon = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 via-rose-500/10 to-transparent ring-1 ring-rose-500/30",
        dim,
      )}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(244,63,94,0.35),transparent_60%)]" />
      <HeartIcon
        className={cn(
          "relative fill-rose-500 text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.45)]",
          icon,
        )}
      />
    </span>
  );
}

function DismissButton({
  onDismiss,
  className,
}: {
  onDismiss: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Dismiss donation banner"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground/70 transition-all",
        "hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
    >
      <XIcon className="size-3.5" />
    </button>
  );
}

export function DonationBanner({
  variant = "card",
  className,
}: DonationBannerProps) {
  const mounted = useMounted();
  const [hidden, setHidden] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  // On mount, read the persisted dismissal state and decide whether to show.
  React.useEffect(() => {
    if (!mounted) return;
    setHidden(shouldHide(readDismissedAt(), Date.now()));
  }, [mounted]);

  const handleDismiss = React.useCallback(() => {
    const now = Date.now();
    writeDismissedAt(now);
    setDismissed(true);
    setHidden(true);
  }, []);

  // Avoid hydration mismatch: render placeholder until mounted.
  if (!mounted) {
    return variant === "card" ? (
      <div
        aria-hidden
        className={cn(
          "h-[180px] rounded-xl border bg-card/60 backdrop-blur",
          className,
        )}
      />
    ) : (
      <div
        aria-hidden
        className={cn("h-10 rounded-lg border bg-card/60 backdrop-blur", className)}
      />
    );
  }

  if (hidden || dismissed) return null;

  if (variant === "pill") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "group relative isolate flex items-center gap-2 overflow-hidden rounded-lg border bg-card/70 px-2 py-1.5 text-card-foreground text-sm shadow-sm backdrop-blur",
          "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-rose-500/5 before:via-transparent before:to-transparent",
          className,
        )}
      >
        <HeartBadge size="sm" />
        <Link
          href="/donate"
          className="flex-1 truncate font-medium tracking-tight transition-colors hover:text-foreground/80"
        >
          Support Joly UI
        </Link>
        <Button
          asChild
          size="sm"
          className="h-7 gap-1 rounded-md bg-gradient-to-b from-rose-500 to-rose-600 px-2.5 text-xs text-white shadow-sm shadow-rose-500/20 hover:from-rose-500/90 hover:to-rose-600/90"
        >
          <Link href={polarCheckoutUrl()}>
            <HeartIcon className="size-3 fill-current" />
            Donate
          </Link>
        </Button>
        <DismissButton onDismiss={handleDismiss} />
      </motion.div>
    );
  }

  // variant === "card" — right rail / inline callout
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group/donation relative isolate overflow-hidden rounded-xl border bg-card p-3.5 text-card-foreground shadow-sm",
        // ambient color washes
        "before:pointer-events-none before:absolute before:-top-12 before:-right-12 before:size-40 before:rounded-full before:bg-rose-500/15 before:blur-2xl",
        "after:pointer-events-none after:absolute after:-bottom-16 after:-left-10 after:size-40 after:rounded-full after:bg-orange-400/10 after:blur-2xl",
        className,
      )}
    >
      {/* subtle grid overlay for texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="relative flex items-start justify-between gap-2">
        <HeartBadge size="md" />
        <DismissButton
          onDismiss={handleDismiss}
          className="-mt-0.5 -mr-0.5"
        />
      </div>

      <div className="relative mt-2.5 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold text-sm tracking-tight">
            Support Joly UI
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wider backdrop-blur">
            <SparklesIcon className="size-2.5" />
            Open source
          </span>
        </div>
        <p className="text-muted-foreground text-xs leading-snug">
          Donations fund new components, accessibility audits, and keep the
          registry free for everyone.
        </p>
      </div>

      {/* tiny stats row — purely decorative, makes the card feel alive */}
      <div className="relative mt-2 flex items-center gap-2.5 text-xs">
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-foreground">50+</span>
          <span className="text-muted-foreground">components</span>
        </div>
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-foreground">MIT</span>
          <span className="text-muted-foreground">licensed</span>
        </div>
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-foreground">Free</span>
          <span className="text-muted-foreground">forever</span>
        </div>
      </div>

      <Button
        asChild
        className="relative mt-2.5 h-8 w-full overflow-hidden rounded-md bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/25 transition-all hover:from-rose-500/95 hover:to-rose-600/95 hover:shadow-rose-500/30"
      >
        <Link href={polarCheckoutUrl()}>
          <HeartIcon className="size-4 fill-current" />
          Donate now
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/donation:translate-x-full"
          />
        </Link>
      </Button>
    </motion.div>
  );
}
