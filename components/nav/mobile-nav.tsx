import Link from "next/link";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { NavSection } from "@/config/navigation";

interface MobileNavProps {
  sections: NavSection[];
  pathname: string;
  isExpanded: boolean;
  currentPage?: { title: string };
  totalItems: number;
  onExpandToggle: () => void;
  onItemClick: () => void;
}

export function MobileNav({
  sections,
  pathname,
  isExpanded,
  currentPage,
  totalItems,
  onExpandToggle,
  onItemClick,
}: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-end px-4 pb-6">
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out"
          onClick={onExpandToggle}
        />
      )}

      <div
        className={cn(
          "max-w-lg transition-all duration-300 ease-in-out",
          "bg-linear-to-b from-white/95 via-gray-50/95 to-white/95",
          "dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90",
          "shadow-[0_2px_20px_-2px_rgba(0,0,0,0.15)]",
          "backdrop-blur-md cursor-pointer",
          "border border-[rgba(200,200,200,0.8)] dark:border-[rgba(70,70,70,0.7)]",
          isExpanded
            ? "h-[80vh] rounded-[28px] w-full"
            : "h-12 rounded-[28px] w-1/2"
        )}
        onClick={() => !isExpanded && onExpandToggle()}
      >
        {isExpanded ? (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {sections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive =
                        item.href === "/docs"
                          ? pathname === "/docs" ||
                            pathname === "/docs/introduction"
                          : item.href === "/docs/components/block/"
                            ? pathname.startsWith("/docs/components/block")
                            : pathname === item.href;
                      return (
                        <Link
                          key={item.id}
                          href={item.isComingSoon ? "#" : item.href}
                          onClick={onItemClick}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 rounded-md",
                            item.isComingSoon
                              ? "opacity-70 cursor-not-allowed"
                              : isActive
                                ? item.isLab
                                  ? "bg-purple-500/10 text-purple-700 dark:text-purple-300"
                                  : "bg-zinc-900 dark:bg-white"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                          )}
                        >
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isActive
                                ? item.isLab
                                  ? "text-purple-700 dark:text-purple-300"
                                  : "text-white dark:text-zinc-900"
                                : "text-zinc-600 dark:text-zinc-400"
                            )}
                          >
                            {item.title}
                            {item.isNew && !isActive && (
                              <span className="ml-2 rounded-lg inline-flex items-center px-2 py-0.5 text-[9px] tracking-wide font-medium uppercase bg-linear-to-r from-emerald-400/5 via-emerald-500/5 to-teal-500/5 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 dark:ring-emerald-400/20">
                                new
                              </span>
                            )}
                            {item.isLab && !isActive && (
                              <span className="ml-2 rounded-xl inline-flex items-center px-2 py-0.5 text-[9px] tracking-wide font-medium uppercase bg-linear-to-r from-purple-400/5 via-purple-500/5 to-purple-500/5 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-400/20">
                                lab
                              </span>
                            )}
                          </span>
                          {item.count && (
                            <span className="text-xs text-zinc-400">
                              {item.count}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onExpandToggle();
                }}
                className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full gap-1">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate text-center">
              {currentPage?.title}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {totalItems}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
