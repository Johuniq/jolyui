import { GitHubStarButton } from "@/registry/default/ui/github-star";

export default function GitHubStarDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <GitHubStarButton owner="johuniq" repo="jolyui" stars={120} />
        <GitHubStarButton owner="facebook" repo="react" />
        <GitHubStarButton owner="vercel" repo="next.js" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">
          Real-time GitHub stars with premium rolling animations and particle
          effects.
        </p>
      </div>
    </div>
  );
}
