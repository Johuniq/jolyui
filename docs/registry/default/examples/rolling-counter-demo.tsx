import { RollingCounter } from "@/registry/default/ui/number-counter";

export default function RollingCounterDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <div className="text-center">
        <h3 className="mb-4 font-medium text-muted-foreground text-sm">
          Rolling Counter
        </h3>
        <RollingCounter
          value={98765}
          prefix="$"
          className="font-black text-6xl tracking-tight"
        />
      </div>
    </div>
  );
}
