"use client";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Spotlight } from "@/components/landing/spotlight";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

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
      {/* SEO-friendly content for search engine crawlers - visually hidden but accessible */}
      <div className="sr-only">
        <h1>Joly UI - Beautiful React Components Library</h1>
        <p>
          Joly UI is a free, open-source collection of beautifully designed,
          accessible React components built on top of shadcn/ui and Radix UI.
          Copy, paste, and customize high-quality UI components for your next
          React or Next.js project.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Built on shadcn/ui and Radix UI primitives</li>
          <li>Fully accessible with WCAG compliance</li>
          <li>TypeScript support out of the box</li>
          <li>Tailwind CSS styling</li>
          <li>Copy-paste ready components</li>
          <li>Dark mode support</li>
          <li>Keyboard navigation</li>
          <li>Free and open source</li>
        </ul>
        <h2>Available Components</h2>
        <p>
          Explore our collection of buttons, inputs, navigation components,
          feedback elements, text animations, and creative UI components.
        </p>
        <nav aria-label="Quick links">
          <a href="/docs/introduction">Get Started</a>
          <a href="/docs/components">Browse Components</a>
          <a href="https://github.com/johuniq/jolyui">GitHub Repository</a>
        </nav>
      </div>

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
