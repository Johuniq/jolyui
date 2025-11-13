"use client";

import { GitHubContributors } from "@/components/jolyui/github-contributors";

export default function Test() {
  return (
    <div className="flex flex-col gap-16 items-center justify-center w-full min-h-screen py-20">
      <GitHubContributors repo="shadcn/ui" limit={24} className="my-6" />
    </div>
  );
}
