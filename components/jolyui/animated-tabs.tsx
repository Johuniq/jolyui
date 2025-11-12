"use client";

import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useTabs, type Tab } from "@/hooks/useTabs";
import { cn } from "@/lib/utils";

interface AnimatedTabsProps {
  tabs: Tab[];
}

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
};

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
  x: hoveredRect.left - navRect.left - 10,
  y: hoveredRect.top - navRect.top - 4,
  width: hoveredRect.width + 20,
  height: hoveredRect.height + 10,
});

const TabContent = ({ tab }: { tab: Tab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
      className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg mt-4 h-[55vh]"
    >
      {tab.value === "home" && (
        <div className="space-y-6">
          <div className="border-b pb-6 dark:border-zinc-800">
            <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Discover a new way to manage your projects and collaborate with
              your team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">Quick Start</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Get started with our platform in minutes
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">Latest Updates</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  See what&apos;s new in our latest release
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">Resources</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Access guides and documentation
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">
                  Project &quot;Marketing Campaign&quot; was updated 2 hours ago
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">
                  New team member John Doe joined the platform
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab.value === "about" && (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              We&apos;re a team of passionate individuals working together to
              create amazing solutions for our clients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  To empower businesses with innovative tools and solutions that
                  drive growth and success in the digital age.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  To become the leading platform for business transformation and
                  digital innovation worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab.value === "contact" && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    123 Business Street
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    San Francisco, CA 94105
                  </p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    contact@example.com
                  </p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-md border dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 rounded-md border dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
              <button className="w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded-md font-medium">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
      {tab.value === "danger-zone" && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-red-500">Caution!</h2>
          <div className="space-y-6">
            <div className="border border-red-200 dark:border-red-900 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                Delete Account
              </h3>
              <p className="text-red-600/80 dark:text-red-400/80 mb-4">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Type 'delete' to confirm"
                  className="flex-1 p-2 rounded-md border border-red-200 dark:border-red-800 dark:bg-red-900/30"
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: {
  tabs: Tab[];
  selectedTabIndex: number;
  setSelectedTab: (input: [number, number]) => void;
}) => {
  const [buttonRefs, setButtonRefs] = React.useState<
    Array<HTMLButtonElement | null>
  >([]);

  React.useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const navRef = React.useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(
    null
  );
  const hoveredRect =
    buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={() => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i;

        return (
          <button
            key={item.value}
            className="text-sm relative rounded-md flex items-center h-8 px-4 z-20 bg-transparent cursor-pointer select-none transition-colors"
            onPointerEnter={() => setHoveredTabIndex(i)}
            onFocus={() => setHoveredTabIndex(i)}
            onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
          >
            <motion.span
              ref={(el) => {
                buttonRefs[i] = el as HTMLButtonElement;
              }}
              className={cn("block", {
                "text-zinc-500": !isActive,
                "text-black dark:text-white font-semibold": isActive,
              })}
            >
              <small
                className={item.value === "danger-zone" ? "text-red-500" : ""}
              >
                {item.label}
              </small>
            </motion.span>
          </button>
        );
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={`absolute z-10 top-0 left-0 rounded-md ${
              hoveredTabIndex ===
              tabs.findIndex(({ value }) => value === "danger-zone")
                ? "bg-red-100 dark:bg-red-500/30"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
            initial={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            animate={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 1,
            }}
            exit={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={`absolute z-10 bottom-0 left-0 h-[2px] ${
              selectedTabIndex ===
              tabs.findIndex(({ value }) => value === "danger-zone")
                ? "bg-red-500"
                : "bg-black dark:bg-white"
            }`}
            initial={false}
            animate={{
              width: selectedRect.width + 18,
              x: `calc(${selectedRect.left - navRect.left - 9}px)`,
              opacity: 1,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const [hookProps] = React.useState(() => {
    const initialTabId =
      tabs.find((tab) => tab.value === "home")?.value || tabs[0].value;

    return {
      tabs: tabs.map(({ label, value, subRoutes }) => ({
        label,
        value,
        subRoutes,
      })),
      initialTabId,
    };
  });

  const framer = useTabs(hookProps);

  return (
    <div className="w-full">
      <div className="relative flex w-full items-center justify-between border-b dark:border-dark-4 overflow-x-auto overflow-y-hidden">
        <Tabs {...framer.tabProps} />
      </div>
      <AnimatePresence mode="wait">
        <TabContent tab={framer.selectedTab} />
      </AnimatePresence>
    </div>
  );
}
