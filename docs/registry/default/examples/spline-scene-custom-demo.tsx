import { SplineScene } from "@/registry/default/ui/spline-scene";

export default function SplineSceneCustomDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-[300px] overflow-hidden rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <SplineScene
          scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
          className="h-full w-full"
        />
      </div>
      <div className="h-[300px] overflow-hidden rounded-lg border bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        <SplineScene
          scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
