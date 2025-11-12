import { Header } from "@/components/landing/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";
// import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | CodeSnippet UI - Open Source Components",
    default: "CodeSnippet UI - Open Source Components",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative w-full pt-0 md:pt-0 bg-white dark:bg-black">
        {/* Grid background effect (covers the main area) */}
        <div aria-hidden className="absolute inset-0">
          <div
            className={
              "absolute opacity-30 inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            }
          />
          {/* Radial gradient mask to give a faded look */}
          <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
        </div>

        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
