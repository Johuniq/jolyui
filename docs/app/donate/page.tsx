import { HeartIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support Joly UI",
  description:
    "Help keep Joly UI free and open source. Your donations fund new components, accessibility audits, and documentation.",
};

const IMPACT = [
  {
    title: "Ship more components",
    description:
      "Every donation funds a new animated, accessible component shipped to the registry.",
    icon: SparklesIcon,
  },
  {
    title: "Accessible by default",
    description:
      "Contributions pay for screen-reader audits and reduced-motion verification across every release.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Free forever",
    description:
      "Joly UI stays MIT-licensed. Donations cover hosting, build infrastructure, and translation work.",
    icon: HeartIcon,
  },
];

export default function DonatePage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      <Header />

      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-32 pb-20 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm">
          <HeartIcon className="size-4 text-red-500" />
          <span>Support open source</span>
        </span>

        <h1 className="font-medium text-4xl tracking-tight md:text-5xl">
          Help us build the best component library on the web.
        </h1>

        <p className="mt-5 max-w-xl text-balance text-muted-foreground text-sm md:text-base">
          Joly UI is 100% free, MIT-licensed, and built by a tiny team. A
          donation keeps the docs online, the registry fast, and the components
          coming.
        </p>

        <Button asChild size="lg" className="mt-8 !pr-5">
          <Link href="/api/polar/checkout">
            Donate with Polar
            <HeartIcon className="!size-5" />
          </Link>
        </Button>

        <p className="mt-3 text-muted-foreground text-xs">
          Secure checkout powered by Polar.sh. You can pay with card, Apple Pay,
          Google Pay, or crypto.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-4xl gap-4 px-5 pb-24 sm:grid-cols-3">
        {IMPACT.map(({ title, description, icon: Icon }) => (
          <div
            className="flex flex-col items-start gap-3 rounded-lg border bg-card p-5 text-left"
            key={title}
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-accent">
              <Icon className="size-5" />
            </span>
            <h3 className="font-medium text-base">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
