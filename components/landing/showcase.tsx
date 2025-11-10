import Text02 from "@/components/jolyui/text/text-02";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ShowcaseSection() {
  return (
    <div className="py-8 sm:py-24 text-center relative">
      <div className="inline-block mb-12">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
          <Text02
            text="Showcase"
            className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-amber-500 dark:from-pink-400 dark:to-amber-400 text-4xl sm:text-7xl"
          />
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="hidden sm:block absolute -left-4 top-1/4 transform -translate-x-full text-left">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-2">
            50+ Components
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Ready to Use
          </p>
        </div>

        <div className="hidden sm:block absolute -right-4 top-1/3 transform translate-x-full text-right">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-2">
            Built in minutes
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">not hours</p>
        </div>

        <div className="hidden sm:block absolute -left-4 bottom-1/3 transform -translate-x-full text-left">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Fully Customizable
          </p>
        </div>

        <div className="hidden sm:block absolute -right-4 bottom-1/4 transform translate-x-full text-right">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Beautiful interfaces
          </p>
        </div>

        <img
          src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/Screenshot%202025-01-06%20at%2011.53.17%E2%80%AFAM-cjYGbgucRv0EPwuOF2VdsvMIUDrERS.png"
          alt="jolyui Screenshot"
          className="w-full sm:w-[80%] h-[300px] sm:h-[650px] mx-auto object-cover rounded-lg shadow-xl hover:shadow-2xl hover:shadow-zinc-900/20 dark:hover:shadow-zinc-100/10 transition-all duration-200"
          width={800}
          height={1000}
        />

        <div className="sm:hidden mt-4 space-y-2">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Beautiful interfaces built in minutes
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span>50+ Components</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span>Ready to Use</span>
          </div>
        </div>
        <Link
          href="https://jolyui-demo.vercel.app/"
          target="_blank"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    group inline-flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-4 rounded-xl
                    bg-white
                    text-zinc-900 text-sm sm:text-base font-medium
                    hover:shadow-lg hover:shadow-zinc-900/20
                    transition-all duration-200 ease-in-out
                    backdrop-blur-xs bg-opacity-90"
        >
          <span>View Live Demo</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
