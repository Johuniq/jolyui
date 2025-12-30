import { NumberCounter } from "@/registry/default/ui/number-counter";

export default function NumberCounterDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <div className="text-center">
        <h3 className="mb-2 font-medium text-muted-foreground text-sm">
          Basic Counter
        </h3>
        <NumberCounter
          value={1234.56}
          decimals={2}
          prefix="$"
          className="font-bold text-4xl"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-2 font-medium text-muted-foreground text-sm">
          Large Number
        </h3>
        <NumberCounter
          value={1000000}
          prefix="+"
          className="font-bold text-4xl text-primary"
        />
      </div>
    </div>
  );
}
