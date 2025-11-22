import { GitHubContributors } from "../ui/github-contributors";

export default function GitHubContributorsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">GitHub Contributors</h3>
        <GitHubContributors repo="vercel/next.js" limit={12} />
      </div>
    </div>
  );
}
