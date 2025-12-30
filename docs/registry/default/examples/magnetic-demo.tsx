import { Magnetic } from "@/registry/default/ui/magnetic";

export default function MagneticDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Magnetic>
        <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg transition-colors hover:bg-primary/90">
          Hover Me
        </button>
      </Magnetic>
    </div>
  );
}
