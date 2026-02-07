import { ArrowRightIcon, PartyPopper } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import MotionIcon from "@/components/icons/motion";
import NextJsIcon from "@/components/icons/nextjs";
import ReactIcon from "@/components/icons/react";
import ShadcnIcon from "@/components/icons/shadcn";
import TailwindIcon from "@/components/icons/tailwindcss";
import TSIcon from "@/components/icons/typescript";
import { Button } from "@/components/ui/button";
import { MotionEffect } from "./motion-effect";
import { SplittingText } from "./splitting";

const ICONS = [
  ReactIcon,
  TSIcon,
  TailwindIcon,
  MotionIcon,
  ShadcnIcon,
  NextJsIcon,
];
const TITLE = " By developers, for developers. ";

export const Hero = () => {
  return (
    <div className="relative flex flex-col items-center overflow-x-hidden px-5">
      <div className="relative z-10 flex flex-col items-center justify-center space-y-5 pt-30">
        <MotionEffect
          slide={{
            direction: "down",
          }}
          fade
          zoom
          inView
        >
          <div className="mb-8 flex items-center gap-2 rounded-full bg-accent py-1 pr-3 pl-1 text-sm">
            <Link
              href="/docs/components/buttons/liquid-metal-button"
              className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
            >
              <span className="flex h-6 items-center justify-center gap-1 rounded-full bg-primary px-2 text-primary-foreground text-xs">
                New
                <PartyPopper className="size-4" />
              </span>{" "}
              <span>Liquid Metal Button</span>
            </Link>
          </div>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: "down",
          }}
          fade
          zoom
          inView
          delay={0.15}
        >
          <div className="relative z-10">
            <h1 className="max-w-[320px] md:max-w-[800px]">
              <SplittingText
                text={TITLE}
                aria-hidden="true"
                className="block text-center font-medium text-4xl text-neutral-200 md:text-5xl dark:text-neutral-800"
                disableAnimation
              />
            </h1>
            <div className="absolute inset-0 flex max-w-[320px] items-center justify-center md:max-w-[800px]">
              <SplittingText
                text={TITLE}
                className="block text-center font-medium text-4xl md:text-5xl"
                type="chars"
                delay={400}
                initial={{ y: 0, opacity: 0, x: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: "down",
          }}
          fade
          zoom
          inView
          delay={0.3}
        >
          <p className="mt-3 block text-balance text-center font-normal text-muted-foreground text-sm sm:max-w-[450px] sm:text-base md:max-w-[660px] md:text-lg">
            50+ free, open-source React components built on shadcn/ui & Radix.
            Copy-paste ready for Next.js, TypeScript & Tailwind CSS. No npm
            install needed.
          </p>
        </MotionEffect>

        <div className="mt-5 mb-8 flex flex-col gap-3 max-sm:w-full sm:flex-row sm:gap-4">
          <MotionEffect
            slide={{
              direction: "down",
            }}
            fade
            zoom
            delay={0.45}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="!pr-5 w-full"
                variant="default"
                asChild
              >
                <Link href="/docs/introduction">
                  Get Started <ArrowRightIcon className="!size-5" />
                </Link>
              </Button>
            </motion.div>
          </MotionEffect>

          <MotionEffect
            slide={{
              direction: "down",
            }}
            fade
            zoom
            delay={0.6}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="w-full" asChild>
                <Link href="/docs/components">
                  Browse Components
                </Link>
              </Button>
            </motion.div>
          </MotionEffect>
        </div>

        <div className="flex items-center justify-center gap-4 sm:justify-start">
          {ICONS.map((Icon, index) => (
            <MotionEffect
              key={index}
              slide={{
                direction: "down",
              }}
              fade
              zoom
              delay={0.75 + index * 0.1}
            >
              <Icon className="size-8" />
            </MotionEffect>
          ))}
        </div>
      </div>
    </div>
  );
};
