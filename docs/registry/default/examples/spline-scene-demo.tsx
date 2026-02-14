import { SplineScene } from "@/registry/default/ui/spline-scene";

export default function SplineSceneDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg border">
      <SplineScene
        scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
        className="h-full w-full"
      />
    </div>
  );
}
