import { Magnetic } from "@/registry/default/ui/magnetic";

export default function MagneticActionAreaDemo() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground text-sm">Self (hover the button)</p>
        <Magnetic actionArea="self">
          <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg">
            Self Action Area
          </button>
        </Magnetic>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground text-sm">
          Parent (hover the container)
        </p>
        <div className="rounded-lg border-2 border-muted-foreground/30 border-dashed p-8">
          <Magnetic actionArea="parent">
            <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg">
              Parent Action Area
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-muted-foreground text-sm">Global (always active)</p>
        <Magnetic actionArea="global">
          <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm shadow-lg">
            Global Action Area
          </button>
        </Magnetic>
      </div>
    </div>
  );
}
