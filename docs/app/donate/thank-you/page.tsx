import { CheckCircle2Icon, HeartIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank you for donating",
  description: "Your support keeps Joly UI free, open source, and growing.",
};

export default function DonateThankYouPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      <Header />

      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pt-32 pb-20 text-center">
        <CheckCircle2Icon className="size-12 text-emerald-500" />

        <h1 className="mt-6 font-medium text-4xl tracking-tight md:text-5xl">
          Thank you for the support.
        </h1>

        <p className="mt-5 max-w-xl text-balance text-muted-foreground text-sm md:text-base">
          Your contribution helps us ship more components, audit accessibility,
          and keep Joly UI free for everyone. A receipt is on its way to your
          inbox.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="!pr-5">
            <Link href="/">
              Back to home
              <HeartIcon className="!size-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/docs/components">Browse components</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
