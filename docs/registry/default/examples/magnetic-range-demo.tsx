import { Magnetic } from "@/registry/default/ui/magnetic";

export default function MagneticRangeDemo() {
  return (
    <div className="flex min-h-[300px] flex-wrap items-center justify-center gap-8">
      <Magnetic range={50}>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg">
          Small Range (50px)
        </button>
      </Magnetic>
      <Magnetic range={100}>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg">
          Medium Range (100px)
        </button>
      </Magnetic>
      <Magnetic range={200}>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg">
          Large Range (200px)
        </button>
      </Magnetic>
    </div>
  );
}
