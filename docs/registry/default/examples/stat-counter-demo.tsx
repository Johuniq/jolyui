import { StatCounter } from "@/registry/default/ui/number-counter";

export default function StatCounterDemo() {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 py-20 md:grid-cols-3">
      <StatCounter
        value={15000}
        label="Active Users"
        prefix="+"
        className="rounded-xl bg-secondary/20 p-6"
      />
      <StatCounter
        value={98.5}
        label="Satisfaction Rate"
        suffix="%"
        decimals={1}
        className="rounded-xl bg-secondary/20 p-6"
      />
      <StatCounter
        value={2500}
        label="Revenue"
        prefix="$"
        className="rounded-xl bg-secondary/20 p-6"
      />
    </div>
  );
}
