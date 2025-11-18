import { GitHubContributors } from "@/registry/default/ui/github-contributors";

export default function GitHubContributorsLimitDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Limited to 6 contributors</h3>
        <GitHubContributors repo="facebook/react" limit={6} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Limited to 18 contributors</h3>
        <GitHubContributors repo="microsoft/vscode" limit={18} />
      </div>
    </div>
  );
}
