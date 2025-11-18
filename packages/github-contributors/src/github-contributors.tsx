"use client";

import { useEffect, useMemo, useState } from "react";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface GitHubContributorsProps {
  repo: string;
  limit?: number;
  className?: string;
  token?: string;
  onLoadComplete?: (contributors: Contributor[]) => void;
  onError?: (error: string) => void;
}

export function GitHubContributors({
  repo,
  limit = 12,
  token,
  onLoadComplete,
  onError,
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
          { headers }
        );
        if (!listRes.ok) {
          throw new Error(
            `GitHub API: ${listRes.status} ${listRes.statusText}`
          );
        }
        const listData: Contributor[] = await listRes.json();
        const slicedData = listData.slice(0, limit);
        setContributors(slicedData);
        onLoadComplete?.(slicedData);

        try {
          const probeRes = await fetch(
            `https://api.github.com/repos/${repo}/contributors?per_page=1`,
            { headers }
          );
          if (probeRes.ok) {
            const link = probeRes.headers.get("link");
            if (link) {
              const m = link.match(
                /<[^>]+[?&]page=(\d+)[^>]*>\s*;\s*rel="last"/
              );
              if (m) {
                const lastPage = parseInt(m[1]!, 10);
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
        const errorMessage = err.message || "Failed to load contributors";
        setError(errorMessage);
        setContributors([]);
        onError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [repo, limit, token, onLoadComplete, onError]);

  const shown = contributors.length;
  const remaining =
    totalCount !== null ? Math.max(0, totalCount - shown) : null;

  const maxContrib = useMemo(() => {
    if (!contributors || contributors.length === 0) return 1;
    return Math.max(...contributors.map((c: Contributor) => c.contributions), 1);
  }, [contributors]);

  const repoUrl = `https://github.com/${repo}`;
  const contributorsUrl = `${repoUrl}/graphs/contributors`;

  return {
    contributors,
    loading,
    error,
    totalCount,
    shown,
    remaining,
    maxContrib,
    repoUrl,
    contributorsUrl,
  };
}

export type { Contributor };
