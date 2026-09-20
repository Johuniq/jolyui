"use client";

import { Github, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "whisprtypr-popup-dismissed";
const WHISPRTYPR_URL = "https://whisprtypr.app?ref=jolyui";
const WHISPRTYPR_LOGO_URL =
  "https://whisprtypr.app?ref=jolyui/logo.png";

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
          {/* Logo */}
          <div className="mb-5 relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500 opacity-20 blur-xl filter" />
            <img
              src={WHISPRTYPR_LOGO_URL}
              alt="Whisprtypr"
              className="h-20 w-20 rounded-full border-2 border-border object-cover shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 font-medium text-purple-600 text-xs dark:text-purple-400">
            <Github className="size-3" />
            Made by Johuniq
          </span>

          {/* Title */}
          <h2 className="mb-2 font-semibold text-2xl tracking-tight">
            Whisprtypr — Voice to Text
          </h2>

          <p className="mb-6 text-muted-foreground text-base leading-relaxed">
            Whisprtypr is a local-first desktop dictation app for Windows, macOS, and
            Linux. Hold a hotkey, speak naturally, and Whisprtypr turns your voice
            into polished text that can be inserted right where your cursor is.
          </p>

          {/* CTA */}
          <Link
            href={WHISPRTYPR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="group inline-flex items-center gap-2 rounded-lg bg-purple-500 px-5 py-2.5 font-medium text-white text-sm transition-all hover:brightness-110"
          >
            Visit Whisprtypr
            <Github className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
