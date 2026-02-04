import Link from "next/link";
import { Link as ViewTransitionsLink } from "next-view-transitions";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/lib/theme-toggle";

export function Header() {
  return (
    <>
      {/* Mobile Pro Banner completely separate from sticky header */}
      {/* <div className="w-full bg-white p-2.5 sm:hidden dark:bg-black/5">
        <Link
          href="#"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <span className="flex items-center gap-2">
            <PartyPopper className="h-3.5 w-3.5" />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text font-semibold text-transparent">
              Explore new components
            </span>
          </span>

          <div className="group relative inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1 text-sm transition-colors dark:bg-zinc-100">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 opacity-40 blur-sm transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-white dark:text-zinc-900">JolyUI Pro</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/90 dark:text-zinc-900/90" />
            </div>
          </div>
        </Link>
      </div> */}

      <div className="sticky top-0 right-0 left-0 z-50">
        <div className="w-full bg-white dark:bg-black/5">
          {/* Rest of the header content */}
          <div className="flex w-full flex-col items-center justify-center">
            <div
              className={`relative flex w-full items-center justify-between rounded-b-[28px] border-[rgba(230,230,230,0.7)] border-x border-b bg-linear-to-b from-white/90 via-gray-50/90 to-white/90 px-4 py-2.5 shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 ease-in-out sm:min-w-[800px] sm:max-w-[1200px] dark:border-[rgba(70,70,70,0.7)] dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90`}
            >
              <div className="relative z-10 flex w-full items-center justify-between gap-2">
                {/* Logo Section with Navigation Links */}
                <div className="flex items-center gap-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Logo />
                  </Link>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* Desktop Navigation Links */}
                  <div className="hidden items-center gap-4 sm:flex">
                    <ViewTransitionsLink
                      href="/docs/components/creative/animated-beam"
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      Components
                    </ViewTransitionsLink>
                    {/* <ViewTransitionsLink
                                            href="/pricing"
                                            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                        >
                                            Pricing
                                        </ViewTransitionsLink> */}
                    {/* <Link
                      href="https://jolyui.pro/templates?utm_source=jolyui.dev&utm_medium=header"
                      target="_blank"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-2"
                    >
                      Templates
                      <span className="text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 rounded-lg px-1 py-0.5 text-[10px]">
                        New
                      </span>
                    </Link> */}

                    <Link
                      href="https://sweep.jolyui.dev?ref=jolyui"
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      Gradient Generator
                      <span className="rounded-lg border border-green-500 px-1 py-0.5 text-[10px] text-green-500 dark:border-green-400 dark:text-green-400">
                        New
                      </span>
                    </Link>
                    <Link
                      href="/icona"
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      Icons
                      <span className="rounded-lg border border-green-500 px-1 py-0.5 text-[10px] text-green-500 dark:border-green-400 dark:text-green-400">
                        New
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right side items */}
                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* <HeaderPro /> */}
                  <ThemeToggle />
                </div>

                {/* Mobile Navigation remains unchanged */}
                <div className="flex items-center gap-4 sm:hidden">
                  {/* <ViewTransitionsLink
                    href="/docs/components/animated-beam"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Components
                  </ViewTransitionsLink> */}
                  {/* <ViewTransitionsLink
                    href="/pricing"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Pricing
                  </ViewTransitionsLink> */}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
