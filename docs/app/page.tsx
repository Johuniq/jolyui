"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Spotlight } from "@/components/landing/spotlight";
import { cn } from "@/lib/utils";

const CONTENT_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 30 },
  },
} as const;

export default function HomePage() {
  const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 1250);
    const timer2 = setTimeout(() => setIsLoaded(true), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className={cn("relative h-dvh", !isLoaded && "overflow-y-hidden")}>
      <Spotlight
        className="-top-40 md:-top-20 left-0 md:left-60"
        fill="white"
      />
      <Header />

      <div className="flex h-dvh w-full flex-col justify-between">
        {transition && (
          <>
            <div>
              <motion.div
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate={transition ? "visible" : "hidden"}
                className="w-full"
              >
                <Hero key={String(transition)} />
              </motion.div>

              {/* <Features /> */}
            </div>

            <Footer />
          </>
        )}
      </div>
    </main>
  );
}
