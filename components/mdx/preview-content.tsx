"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { OpenInV0Button } from "../open-in-v0-button";

export default function PreviewContent({
  link,
  prePath,
}: {
  link: string;
  prePath: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const openInV0 = () => {
    const [folder, filename] = link.split("/");
    return filename ? filename : folder;
  };

  return (
    <>
      <div
        className={cn("relative mt-4", "rounded-xl p-3")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`${prePath}/preview/${link}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "flex items-center gap-2",
              "text-sm font-medium",
              "text-zinc-800 dark:text-zinc-200",
              "hover:text-zinc-600 dark:hover:text-zinc-400",
              "transition-all duration-200 no-underline group"
            )}
          >
            Live Preview
            <ArrowUpRight
              className={cn(
                "h-4 w-4",
                "transition-transform duration-200 group-hover:rotate-12"
              )}
            />
          </a>

          <div className="flex items-center gap-2">
            <OpenInV0Button name={openInV0()} />
          </div>
        </div>
      </div>
    </>
  );
}
