import { Button } from "@/registry/default/ui/button";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="shimmer">Shimmer</Button>
      <Button variant="glow">Glow</Button>
    </div>
  );
}
