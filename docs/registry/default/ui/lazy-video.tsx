"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

export interface LazyVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallback?: string;
  threshold?: number;
  rootMargin?: string;
}

export function LazyVideo({
  src,
  className = "",
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  playsInline = true,
  "aria-label": ariaLabel,
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const saveData = (navigator as any)?.connection?.saveData === true;
    const shouldAutoplay = autoPlay && !prefersReducedMotion && !saveData;

    let observer: IntersectionObserver | null = null;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !loaded) {
          el.src = src;
          el.load();

          if (shouldAutoplay) {
            const playVideo = async () => {
              try {
                await el.play();
              } catch (error) {
                // Autoplay might be blocked
                // console.log("[v0] Autoplay blocked:", error)
              }
            };
            if (el.readyState >= 3) {
              playVideo();
            } else {
              el.addEventListener("canplay", playVideo, { once: true });
            }
          }

          setLoaded(true);
        } else if (!entry.isIntersecting && loaded && shouldAutoplay) {
          try {
            el.pause();
          } catch {}
        } else if (entry.isIntersecting && loaded && shouldAutoplay) {
          try {
            await el.play();
          } catch {}
        }
      });
    };

    observer = new IntersectionObserver(onIntersect, {
      rootMargin: "80px",
      threshold: 0.15,
    });
    observer.observe(el);

    const onVisibility = () => {
      if (!el) return;
      const hidden = document.visibilityState === "hidden";
      if (hidden) {
        try {
          el.pause();
        } catch {}
      } else if (shouldAutoplay && loaded) {
        // resume only if we were auto-playing
        el.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [src, loaded, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
      disableRemotePlayback
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  );
}
