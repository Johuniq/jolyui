"use client";

import { ArrowUpRight, PartyPopper, Rocket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ConfettiOutline } from "../icons/conffeti";
import XIcon from "../icons/x-icon";
import { GitHubStarsButton } from "./github-star-button";

interface HeaderContent {
  text: string;
  productName: string;
  link: string;
}

export function HeaderPro() {
  const [content, setContent] = useState<HeaderContent>({
    text: "",
    productName: "",
    link: "",
  });

  useEffect(() => {
    const random = Math.random();
    if (random < 0.75) {
      setContent({
        text: "Built app fast",
        productName: "Joly UI Pro",
        link: "#",
      });
    } else {
      setContent({
        text: "Explore new components",
        productName: "Joly UI Pro",
        link: "#",
      });
    }
  }, []);

  return (
    <div className="flex flex-1 items-center justify-end gap-1">
      <div className="flex flex-1 items-center justify-start gap-1 md:justify-end">
        <Link
          href={content.link}
          target="_blank"
          className="group flex items-center justify-end gap-2 rounded-xl border-2 border-fuchsia-500/20 py-1 pr-0.5 pl-2 font-medium text-sm text-zinc-800 transition-all duration-300 hover:border-fuchsia-500/60 hover:shadow-md dark:text-zinc-200"
        >
          <span className="hidden items-center gap-2 md:flex">
            {content.productName === "Joly UI Pro" ? (
              <ConfettiOutline className="h-4 w-4 text-fuchsia-500" />
            ) : (
              <Rocket className="h-4 w-4 text-fuchsia-500" />
            )}
            <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-600 bg-clip-text font-semibold text-transparent tracking-tighter">
              {content.text}
            </span>
          </span>

          <span className="flex items-center gap-2 md:hidden">
            {content.productName === "Joly UI Pro" ? (
              <PartyPopper className="h-4 w-4 text-fuchsia-500" />
            ) : (
              <Rocket className="h-4 w-4 text-fuchsia-500" />
            )}
            <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-fuchsia-600 bg-clip-text font-semibold text-transparent">
              {content.text.split(" ")[0]}
            </span>
          </span>

          <div className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-800 px-1.5 py-0.5 text-sm dark:from-zinc-100/90 dark:to-zinc-200/90">
            <div className="flex items-center gap-1">
              <span className="text-white tracking-tighter group-hover:text-white dark:text-zinc-900 dark:group-hover:text-zinc-900">
                {content.productName}
              </span>
              <ArrowUpRight className="group-hover:-translate-y-[1px] h-3.5 w-3.5 text-white/90 transition-transform group-hover:translate-x-[1px] group-hover:text-white dark:text-zinc-900/90 dark:group-hover:text-zinc-900" />
            </div>
          </div>
        </Link>
        <Link
          href="#"
          target="_blank"
          className="group relative hidden items-center gap-2 rounded-lg px-1.5 py-1.5 text-sm md:inline-flex"
        >
          <div className="relative flex w-full items-center gap-2">
            <GitHubStarsButton username="johuniq" repo="jolyui" />
          </div>
        </Link>
        <Link
          href="#"
          target="_blank"
          className="group relative hidden items-center gap-2 rounded-lg bg-zinc-900 px-1.5 py-1.5 text-sm transition-colors hover:bg-zinc-800 md:inline-flex dark:bg-zinc-100 dark:hover:bg-zinc-200"
        >
          <XIcon className="h-4 w-4 text-white dark:text-zinc-900" />
        </Link>
      </div>
    </div>
  );
}
