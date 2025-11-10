import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/config/navigation";

interface DesktopNavProps {
  sections: NavSection[];
  pathname: string;
}

export function DesktopNav({ sections, pathname }: DesktopNavProps) {
  return (
    <div className="hidden md:block w-full z-40 space-y-4">
      <div
        className="bg-linear-to-b from-white/95 via-gray-50/95 to-white/95
                    dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
                    shadow-[0_2px_20px_-2px_rgba(0,0,0,0.15)]
                    backdrop-blur-md
                    border border-[rgba(200,200,200,0.8)] dark:border-[rgba(70,70,70,0.7)]
                    rounded-[28px] p-3"
      >
        {sections.map((section, index) => (
          <div key={section.title} className={cn(index > 0 && "mt-6")}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {section.title}
              </h2>
            </div>

            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/docs"
                    ? pathname === "/docs" || pathname === "/docs/introduction"
                    : item.href === "/docs/components/block/"
                      ? pathname.startsWith("/docs/components/block")
                      : pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.isComingSoon ? "#" : item.href}
                    className={cn(
                      "group flex items-center justify-between px-2.5 py-1.5 rounded-xl",
                      "transition-all duration-200",
                      item.isComingSoon
                        ? "opacity-70 cursor-not-allowed bg-transparent"
                        : isActive
                          ? item.isLab
                            ? "bg-purple-500/10 text-purple-700 dark:text-purple-300"
                            : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium flex items-center gap-2",
                        isActive
                          ? item.isLab
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-white dark:text-zinc-900"
                          : "text-zinc-600 dark:text-zinc-400"
                      )}
                    >
                      {isActive && (
                        <span className="text-[10px] opacity-70">→</span>
                      )}
                      {item.title}
                      {item.isNew && !isActive && (
                        <span className="rounded-lg inline-flex items-center px-2 py-0.5 text-[9px] tracking-wide font-medium uppercase bg-linear-to-r from-emerald-400/5 via-emerald-500/5 to-teal-500/5 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 dark:ring-emerald-400/20 shadow-[0_0_10px_-3px_rgba(16,185,129,0.15)] dark:shadow-[0_0_10px_-3px_rgba(16,185,129,0.2)]">
                          new
                        </span>
                      )}
                      {item.isLab && !isActive && (
                        <span className="rounded-lg inline-flex items-center px-2 py-0.5 text-[9px] tracking-wide font-medium uppercase bg-linear-to-r from-purple-400/5 via-purple-500/5 to-purple-500/5 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-400/20 shadow-[0_0_10px_-3px_rgba(147,51,234,0.15)] dark:shadow-[0_0_10px_-3px_rgba(147,51,234,0.2)]">
                          lab
                        </span>
                      )}
                    </span>
                    {item.count && (
                      <span
                        className={cn(
                          "text-xs",
                          isActive
                            ? "text-white/70 dark:text-zinc-900/70"
                            : "text-zinc-400 dark:text-zinc-500"
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}
