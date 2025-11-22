"use client";

import { LazyVideo } from "./lazy-video";

export interface PhoneCardProps {
  title?: string;
  sub?: string;
  tone?: string;
  gradient?: string;
  videoSrc?: string;
  imageSrc?: string;
  mediaType?: "video" | "image";
}

export function PhoneCard({
  title = "8°",
  sub = "Clear night. Great for render farm runs.",
  tone = "calm",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  videoSrc = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20new%20chapter%20in%20the%20story%20of%20success.__Introducing%20the%20new%20TAG%20Heuer%20Carrera%20Day-Date%20collection%2C%20reimagined%20with%20bold%20colors%2C%20refined%20finishes%2C%20and%20upgraded%20functionality%20to%20keep%20you%20focused%20on%20your%20goals.%20__Six%20-nDNoRQyFaZ8oaaoty4XaQz8W8E5bqA.mp4",
  imageSrc = "https://www.jakala.com/hs-fs/hubfs/Vercel%20header-1.jpg?width=800&height=800&name=Vercel%20header-1.jpg",
  mediaType = "video",
}: PhoneCardProps) {
  return (
    <div className="relative rounded-[28px] glass-border bg-neutral-900 p-2">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        {mediaType === "video" ? (
          <LazyVideo
            src={videoSrc!}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            aria-label={`${title} - ${sub}`}
          />
        ) : (
          <img
            src={imageSrc}
            alt={`${title} - ${sub}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-60 mix-blend-overlay`}
        />

        <div className="relative z-10 p-3">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          <div className="space-y-1 px-1">
            <div className="text-3xl font-bold leading-snug text-white/90">
              {title}
            </div>
            <p className="text-xs text-white/70">{sub}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lime-300">
              {tone === "calm" ? "Joly UI" : tone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}