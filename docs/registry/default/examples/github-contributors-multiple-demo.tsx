import { GitHubContributors } from "@/registry/default/ui/github-contributors";

export default function GitHubContributorsMultipleDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GitHubContributors repo="shadcn-ui/ui" limit={12} />
      <GitHubContributors repo="nuxt/nuxt" limit={12} />
      <GitHubContributors repo="denoland/deno" limit={12} />
      <GitHubContributors repo="sveltejs/svelte" limit={12} />
    </div>
  );
}
