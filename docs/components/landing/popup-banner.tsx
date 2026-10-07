"use client";

import { Rocket, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "whisprtypr-launch-dismissed";
const WHISPRTYPR_URL = "https://whisprtypr.app";
const PRODUCTHUNT_URL = "https://www.producthunt.com/products/whisprtypr";

export function WhisprtyprPopup() {
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
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleClose}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
      />

      {/* Modal */}
      <div className="fade-in zoom-in-95 relative z-10 w-full max-w-2xl animate-in rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background to-purple-50/30 p-10 shadow-2xl duration-300 dark:to-purple-950/20">
        {/* Animated gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5" />
        
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground transition-all hover:rotate-90 hover:bg-accent hover:text-foreground"
          aria-label="Close popup"
        >
          <X className="size-5" />
        </button>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          {/* Launch Badge with Animation */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-30 blur-2xl" />
            <div className="relative inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 px-4 py-2 font-semibold text-purple-600 text-sm backdrop-blur-sm dark:text-purple-400">
              <Rocket className="size-4 animate-bounce" />
              We're Launching on Product Hunt!
              <Sparkles className="size-4" />
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-3 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-4xl text-transparent tracking-tight">
            Whisprtypr
          </h2>
          
          <p className="mb-2 font-medium text-lg text-muted-foreground">
            Speak at the speed of thought
          </p>

          <p className="mb-8 max-w-lg text-muted-foreground text-sm leading-relaxed">
            Transform your voice into polished text instantly. A local-first desktop dictation app 
            for Windows, macOS, and Linux. Hold a hotkey, speak naturally, and watch your words appear.
          </p>

          {/* Product Hunt Badge */}
          <div className="mb-8 rounded-xl border border-border/50 bg-background/50 p-4 backdrop-blur-sm">
            <p className="mb-4 font-semibold text-foreground text-sm">
              🎉 Support our launch and be part of our journey!
            </p>
            <a 
              href={PRODUCTHUNT_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img 
                alt="Whisprtypr - Speak at the speed of thought. | Product Hunt" 
                width="250" 
                height="54" 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1272315&theme=light&t=1791351848166"
                className="mx-auto"
              />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={PRODUCTHUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              <Rocket className="size-4 transition-transform group-hover:-translate-y-1" />
              Upvote on Product Hunt
            </Link>
            
            <Link
              href={WHISPRTYPR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-border bg-background px-6 py-3 font-semibold text-foreground transition-all hover:scale-105 hover:border-purple-500/50 hover:bg-accent"
            >
              Learn More
              <Sparkles className="size-4 transition-transform group-hover:rotate-12" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
