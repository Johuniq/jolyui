"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitHubContributors as GitHubContributorsHook } from "@jolyui/github-contributors";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface GitHubContributorsProps {
  repo: string;
  limit?: number;
  className?: string;
  token?: string;
}

export function GitHubContributors({
  repo,
  limit = 12,
  className = "",
  token,
}: GitHubContributorsProps) {
  const {
    contributors,
    loading,
    error,
    totalCount,
    shown,
    remaining,
    maxContrib,
    repoUrl,
    contributorsUrl,
  } = GitHubContributorsHook({ repo, limit, token });

  return (
    <Card
      className={`border bg-background shadow-sm rounded-lg overflow-hidden ${className}`}
      aria-live="polite"
    >
      {/* Content */}
      <CardContent className="px-4 py-3">
        {error && (
          <p className="text-sm text-destructive mb-2">Failed: {error}</p>
        )}

        {loading ? (
          <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11 items-center">
              {contributors.map((c, idx) => {
                const pct = Math.round((c.contributions / maxContrib) * 100);
                const isTop = idx === 0; // highlight the top contributor in shown list
                return (
                  <div
                    key={c.id}
                    className="relative flex items-center justify-center"
                  >
                    {/* top badge */}
                    {isTop && (
                      <div className="absolute -top-1 -right-1 z-10">
                        <div className="rounded-full bg-yellow-400/90 text-[10px] font-semibold h-4 w-4 shadow-sm flex items-center justify-center border border-white text-white">
                          <span>★</span>
                        </div>
                      </div>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          href={c.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${c.login} — ${c.contributions} contributions`}
                          className="relative flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border bg-muted/10 hover:bg-muted transition focus:outline-none focus:ring-2 focus:ring-ring"
                          whileHover={isTop ? { scale: 1.07 } : { scale: 1.04 }}
                          whileFocus={{ scale: 1.04 }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${c.login} GitHub profile`}
                        >
                          <img
                            src={c.avatar_url}
                            alt={c.login}
                            className="object-cover h-full w-full"
                          />
                          {/* subtle ring on hover via pseudo element class; already handled by tailwind tokens */}
                        </motion.a>
                      </TooltipTrigger>

                      <TooltipContent
                        side="top"
                        align="center"
                        className="w-64 p-0 bg-transparent shadow-none"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.12 }}
                          className="rounded-lg border bg-popover text-popover-foreground shadow-md p-3"
                          role="dialog"
                          aria-label={`${c.login} contributor details`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-md overflow-hidden border flex-shrink-0">
                              <img
                                src={c.avatar_url}
                                alt={c.login}
                                className="object-cover w-full h-full"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-foreground truncate">
                                  {c.login}
                                </div>
                                <div className="ml-auto text-xs text-muted-foreground font-mono">
                                  #{c.id}
                                </div>
                              </div>

                              <div className="mt-1 text-xs text-muted-foreground">
                                {c.contributions.toLocaleString()} contributions
                              </div>

                              {/* mini contribution bar */}
                              <div className="mt-2">
                                <div className="bg-muted h-2 rounded-full w-full overflow-hidden">
                                  <div
                                    className="h-2 rounded-full bg-primary transition-all duration-300"
                                    style={{ width: `${pct}%` }}
                                    aria-hidden
                                  />
                                </div>
                                <div className="text-[11px] text-muted-foreground mt-1">
                                  {pct}% of top contributor
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <a
                              href={c.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Open ${c.login} on GitHub`}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                View profile
                              </span>
                            </a>

                            <div className="text-xs text-muted-foreground">
                              Contributions:{" "}
                              <span className="font-medium text-foreground">
                                {c.contributions}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}

              {/* +N tile (or generic + tile) */}
              {remaining !== null && remaining > 0 ? (
                <a
                  href={contributorsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-muted/5 border text-xs text-muted-foreground hover:bg-muted transition"
                  aria-label={`View all ${totalCount} contributors`}
                >
                  +{remaining}
                </a>
              ) : remaining === null &&
                !loading &&
                contributors.length === limit ? (
                <a
                  href={contributorsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-muted/5 border text-xs text-muted-foreground hover:bg-muted transition"
                  aria-label={`View more contributors`}
                >
                  +
                </a>
              ) : null}
            </div>
          </>
        )}
      </CardContent>

      {/* Footer CTA */}
      <div className="px-4 py-3 border-t bg-background/50 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold truncate m-0">
            {repo}
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            {loading ? (
              <span>Loading…</span>
            ) : error ? (
              <span className="text-destructive">Failed to load</span>
            ) : (
              <span>
                Showing <span className="font-medium">{shown}</span>
                {totalCount ? (
                  <>
                    {" "}
                    of <span className="font-medium">{totalCount}</span>
                  </>
                ) : shown === limit ? (
                  <> (more)</>
                ) : null}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium hover:bg-muted transition"
            aria-label={`Open ${repo} on GitHub`}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open repo</span>
          </a>
        </div>
      </div>
    </Card>
  );
}