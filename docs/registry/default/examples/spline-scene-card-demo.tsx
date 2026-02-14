import { SplineScene } from "@/registry/default/ui/spline-scene";

export default function SplineSceneCardDemo() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
        <div className="h-[250px] bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950 dark:to-fuchsia-950">
          <SplineScene
            scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
            className="h-full w-full"
          />
        </div>
        <div className="space-y-3 p-6">
          <h3 className="font-semibold text-2xl">3D Product Card</h3>
          <p className="text-muted-foreground">
            Showcase your products with interactive 3D models that customers can
            explore and interact with in real-time.
          </p>
          <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
