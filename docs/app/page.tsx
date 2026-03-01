"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/landing/footer";
import { FormKitCNPopup } from "@/components/landing/formkitcn-popup";
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
      <FormKitCNPopup />
      {/* SEO-friendly content for search engine crawlers - visually hidden but accessible */}
      <div className="sr-only">
        <h1>Joly UI - 50+ Free shadcn/ui Components for React & Next.js</h1>
        <p>
          Joly UI is an open-source library of 50+ beautifully crafted React
          components extending shadcn/ui. Build stunning interfaces faster with
          accessible, fully typed components. Just copy, paste, and customize.
          Works seamlessly with Next.js 14+, React 19, TypeScript, and Tailwind
          CSS v4.
        </p>
        <h2>Why Choose Joly UI?</h2>
        <ul>
          <li>50+ production-ready components</li>
          <li>Built on shadcn/ui and Radix UI primitives</li>
          <li>WCAG 2.1 AA compliant accessibility</li>
          <li>Full TypeScript support with strict types</li>
          <li>Tailwind CSS v4 ready</li>
          <li>Copy-paste installation - no npm packages needed</li>
          <li>Dark mode and theming out of the box</li>
          <li>MIT licensed - free for commercial use</li>
        </ul>
        <h2>Component Categories</h2>
        <p>
          Explore buttons, form inputs, navigation menus, modals, dialogs,
          dropdowns, text animations, creative effects, and more.
        </p>
        <nav aria-label="Quick links">
          <a href="/docs/introduction">Get Started in 2 Minutes</a>
          <a href="/docs/components">Browse All 50+ Components</a>
          <a href="https://github.com/johuniq/jolyui">Star on GitHub</a>
        </nav>
      </div>

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
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
