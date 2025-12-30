import {
  AlarmClockIcon,
  ArrowRightIcon,
  AudioLinesIcon,
  BatteryFullIcon,
  BellRingIcon,
  ClockIcon,
  Disc3Icon,
  LoaderIcon,
  MessageSquareMoreIcon,
  SettingsIcon,
  UserIcon,
  WifiIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Blocks } from "../icons/blocks";
import { Components } from "../icons/components";
import { Primitives } from "../icons/primitives";
import { MotionEffect } from "./motion-effect";

const COMPONENTS = [
  {
    name: "Primitives",
    href: "/docs/primitives",
    icon: <Primitives />,
  },
  {
    name: "Components",
    href: "/docs/components",
    icon: <Components />,
  },
  {
    name: "Icons",
    href: "/docs/icons",
    icon: (
      <div className="flex aspect-[350/259.17] h-full w-full flex-col items-center justify-center gap-6 pt-7 text-neutral-400 dark:text-neutral-500">
        <div className="flex flex-row gap-6">
          <WifiIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <ClockIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <AudioLinesIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <LoaderIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
        </div>
        <div className="flex flex-row gap-6">
          <SettingsIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <Disc3Icon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <BatteryFullIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <UserIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
        </div>
        <div className="flex flex-row gap-6">
          <MessageSquareMoreIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <BellRingIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <AlarmClockIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
          <ArrowRightIcon className="size-6.5 xs:size-5.5 sm:size-6.5" />
        </div>
      </div>
    ),
  },
  {
    name: "Soon...",
    icon: (
      <div className="relative">
        <Blocks />
      </div>
    ),
  },
];

const dancing = Dancing_Script({ subsets: ["latin"] });

export const Features = () => {
  return (
    <div className="relative mt-auto flex flex-col items-center justify-center px-5 pt-16 pb-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 sm:max-lg:max-w-2xl lg:grid-cols-4">
        {COMPONENTS.map((component, index) => {
          const Component = component.href ? Link : "div";
          return (
            <MotionEffect
              slide={{
                direction: "down",
              }}
              fade
              zoom
              delay={1 + 0.15 * index}
              key={index}
            >
              {/* @ts-ignore */}
              <Component {...(component.href ? { href: component.href } : {})}>
                <motion.div
                  whileHover={{
                    scale: component.href ? 1.025 : 1,
                  }}
                  whileTap={{
                    scale: component.href ? 0.925 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className={cn(
                    "relative w-full rounded-2xl bg-neutral-100 pt-1 dark:bg-neutral-800",
                    !component?.href && "cursor-not-allowed opacity-50",
                  )}
                >
                  <p
                    className={cn(
                      dancing.className,
                      "-translate-x-1/2 absolute top-3 xs:top-2 left-1/2 font-black text-[22px] text-muted-foreground",
                    )}
                  >
                    {component.name}
                  </p>

                  {component.icon}
                </motion.div>
              </Component>
            </MotionEffect>
          );
        })}
      </div>
    </div>
  );
};
