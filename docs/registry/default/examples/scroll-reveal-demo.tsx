import { ScrollReveal } from "@/registry/default/ui/scroll-text";

export default function ScrollRevealDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <ScrollReveal direction="up" className="rounded-xl bg-primary/10 p-8">
        <h3 className="mb-2 font-bold text-2xl">Reveal Up</h3>
        <p className="text-muted-foreground">
          This content reveals from the bottom.
        </p>
      </ScrollReveal>

      <ScrollReveal
        direction="left"
        delay={0.2}
        className="rounded-xl bg-primary/10 p-8"
      >
        <h3 className="mb-2 font-bold text-2xl">Reveal Left</h3>
        <p className="text-muted-foreground">
          This content reveals from the right.
        </p>
      </ScrollReveal>

      <ScrollReveal
        direction="right"
        delay={0.4}
        className="rounded-xl bg-primary/10 p-8"
      >
        <h3 className="mb-2 font-bold text-2xl">Reveal Right</h3>
        <p className="text-muted-foreground">
          This content reveals from the left.
        </p>
      </ScrollReveal>
    </div>
  );
}
