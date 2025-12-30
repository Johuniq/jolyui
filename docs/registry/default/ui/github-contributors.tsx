"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface GitHubContributorsProps {
  repo: string; // e.g. "vercel/next.js"
  limit?: number; // number of avatars to show (not counting the +more tile)
  className?: string;
  token?: string; // optional GitHub token to increase rate limit
}

export function GitHubContributors({
  repo,
  limit = 12,
  className = "",
  token,
}: GitHubContributorsProps) {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    if (!repo) return;
    setLoading(true);
    setError(null);
    setTotalCount(null);

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) headers.Authorization = `token ${token}`;

    const fetchList = async () => {
      try {
        const listRes = await fetch(
          `https://api.github.com/repos/${repo}/contributors?per_page=${limit}`,
          { headers },
        );
        if (!listRes.ok)
          throw new Error(
            `GitHub API: ${listRes.status} ${listRes.statusText}`,
          );
        const listData: Contributor[] = await listRes.json();
        setContributors(listData.slice(0, limit));

        // Probe for total contributors (per_page=1 -> last page = total count)
        try {
          const probeRes = await fetch(
            `https://api.github.com/repos/${repo}/contributors?per_page=1`,
            { headers },
          );
          if (probeRes.ok) {
            const link = probeRes.headers.get("link");
            if (link) {
              const m = link.match(
                /<[^>]+[?&]page=(\d+)[^>]*>\s*;\s*rel="last"/,
              );
              if (m && m[1]) {
                const lastPage = parseInt(m[1], 10);
                if (Number.isFinite(lastPage)) setTotalCount(lastPage);
              }
            } else {
              const probeData = await probeRes.json();
              if (Array.isArray(probeData)) setTotalCount(probeData.length);
            }
          }
        } catch {
          // ignore probe errors
        }
      } catch (err: any) {
        setError(err.message || "Failed to load contributors");
        setContributors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [repo, limit, token]);

  const shown = contributors.length;
  const remaining =
    totalCount !== null ? Math.max(0, totalCount - shown) : null;

  // compute max contributions among shown contributors to render the progress bar
  const maxContrib = useMemo(() => {
    if (!contributors || contributors.length === 0) return 1;
    return Math.max(...contributors.map((c) => c.contributions), 1);
  }, [contributors]);

  const repoUrl = `https://github.com/${repo}`;
  const contributorsUrl = `${repoUrl}/graphs/contributors`;

  return (
    <Card
      className={`overflow-hidden rounded-lg border bg-background shadow-sm ${className}`}
      aria-live="polite"
    >
      {/* Content */}
      <CardContent className="px-4 py-3">
        {error && (
          <p className="mb-2 text-destructive text-sm">Failed: {error}</p>
        )}

        {loading ? (
          <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 items-center gap-3 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11">
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
                      <div className="-top-1 -right-1 absolute z-10">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full border border-white bg-yellow-400/90 font-semibold text-[10px] text-white shadow-sm">
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
                          className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-muted/10 transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                          whileHover={isTop ? { scale: 1.07 } : { scale: 1.04 }}
                          whileFocus={{ scale: 1.04 }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${c.login} GitHub profile`}
                        >
                          <img
                            src={c.avatar_url}
                            alt={c.login}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                          {/* subtle ring on hover via pseudo element class; already handled by tailwind tokens */}
                        </motion.a>
                      </TooltipTrigger>

                      <TooltipContent
                        side="top"
                        align="center"
                        className="w-64 bg-transparent p-0 shadow-none"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.12 }}
                          className="rounded-lg border bg-popover p-3 text-popover-foreground shadow-md"
                          role="dialog"
                          aria-label={`${c.login} contributor details`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                              <img
                                src={c.avatar_url}
                                alt={c.login}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="truncate font-medium text-foreground">
                                  {c.login}
                                </div>
                                <div className="ml-auto font-mono text-muted-foreground text-xs">
                                  #{c.id}
                                </div>
                              </div>

                              <div className="mt-1 text-muted-foreground text-xs">
                                {c.contributions.toLocaleString()} contributions
                              </div>

                              {/* mini contribution bar */}
                              <div className="mt-2">
                                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                  <div
                                    className="h-2 rounded-full bg-primary transition-all duration-300"
                                    style={{ width: `${pct}%` }}
                                    aria-hidden
                                  />
                                </div>
                                <div className="mt-1 text-[11px] text-muted-foreground">
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
                              className="inline-flex items-center gap-2 rounded-md bg-secondary px-2 py-1 font-medium text-secondary-foreground text-sm transition-colors hover:bg-secondary/80"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Open ${c.login} on GitHub`}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="font-medium text-sm">
                                View profile
                              </span>
                            </a>

                            <div className="text-muted-foreground text-xs">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted/5 text-muted-foreground text-xs transition hover:bg-muted"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted/5 text-muted-foreground text-xs transition hover:bg-muted"
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
      <div className="flex items-center justify-between gap-3 border-t bg-background/50 px-4 py-3">
        <div className="min-w-0">
          <CardTitle className="m-0 truncate font-semibold text-sm">
            {repo}
          </CardTitle>
          <div className="text-muted-foreground text-xs">
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
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-medium text-xs transition hover:bg-muted"
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
