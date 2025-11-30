import { Magnetic } from "@/registry/default/ui/magnetic";

export default function MagneticIntensityDemo() {
  return (
    <div className="flex min-h-[300px] flex-wrap items-center justify-center gap-8">
      <Magnetic intensity={0.3}>
        <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          Low (0.3)
        </button>
      </Magnetic>
      <Magnetic intensity={0.6}>
        <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          Medium (0.6)
        </button>
      </Magnetic>
      <Magnetic intensity={1.2}>
        <button className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          High (1.2)
        </button>
      </Magnetic>
    </div>
  );
}
