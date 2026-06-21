"use client";

import { HeartIcon, XIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "jolyui:donation-banner:dismissed-at";
const HIDE_FOR_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

type Variant = "card" | "pill";

interface DonationBannerProps {
  /** `card` renders the full callout (right rail), `pill` renders a compact row (sidebar top). */
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

export function DonationBanner({ variant = "card", className }: DonationBannerProps) {
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
          "flex h-[164px] flex-col gap-2 rounded-lg border bg-card p-4",
          className,
        )}
      />
    ) : (
      <div
        aria-hidden
        className={cn(
          "flex h-9 items-center gap-2 rounded-md border bg-card px-3",
          className,
        )}
      />
    );
  }

  if (hidden || dismissed) return null;

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "group flex items-center gap-2 rounded-md border bg-card p-2.5 text-card-foreground text-sm",
          className,
        )}
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/10">
          <HeartIcon className="size-3.5 fill-red-500 text-red-500" />
        </span>
        <Link
          href="/donate"
          className="flex-1 truncate font-medium hover:underline"
        >
          Support Joly UI
        </Link>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs"
        >
          <Link href="/api/polar/checkout">Donate</Link>
        </Button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss donation banner"
          className="flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <XIcon className="size-3" />
        </button>
      </div>
    );
  }

  // variant === "card" — right rail
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss donation banner"
        className="absolute top-2 right-2 flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <XIcon className="size-3.5" />
      </button>

      <span className="flex size-9 items-center justify-center rounded-md bg-red-500/10">
        <HeartIcon className="size-5 fill-red-500 text-red-500" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="font-medium text-sm">Support Joly UI</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Donations fund new components, accessibility audits, and keep the
          registry free for everyone.
        </p>
      </div>

      <Button
        asChild
        size="sm"
        className="w-full !pr-3.5"
      >
        <Link href="/api/polar/checkout">
          Donate
          <HeartIcon className="!size-4 fill-current" />
        </Link>
      </Button>
    </div>
  );
}
