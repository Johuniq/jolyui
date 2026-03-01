"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "formkitcn-popup-dismissed";

export function FormKitCNPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={-1}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
      />

      {/* Modal */}
      <div className="fade-in zoom-in-95 relative z-10 w-full max-w-md animate-in rounded-2xl border border-border/50 bg-background p-8 shadow-2xl duration-300">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close popup"
        >
          <X className="size-4" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 font-medium text-green-600 text-xs dark:text-green-400">
            <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
            New Product
          </span>

          {/* Title */}
          <h2 className="mb-3 font-semibold text-2xl tracking-tight">
            FormKit
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              CN
            </span>
          </h2>

          {/* Description */}
          <p className="mb-2 text-muted-foreground text-sm leading-relaxed">
            Drag-and-drop form builder powered by{" "}
            <span className="font-medium text-foreground">shadcn/ui</span>.
          </p>
          <p className="mb-6 text-muted-foreground text-sm leading-relaxed">
            Build, preview, and export production-ready React forms with Zod
            validation — instantly.
          </p>

          {/* CTA */}
          <Link
            href="https://formkitcn.jolyui.dev?ref=jolyui-popup"
            target="_blank"
            onClick={handleClose}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground text-sm transition-all hover:opacity-90"
          >
            Try FormKitCN
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <p className="mt-4 text-muted-foreground/60 text-xs">
            Free &amp; open-source
          </p>
        </div>
      </div>
    </div>
  );
}
