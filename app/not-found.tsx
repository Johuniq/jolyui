import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
          404 Not Found
        </h1>
        <div className="h-[0.5px] w-full bg-linear-to-r from-zinc-400 to-zinc-200 dark:from-zinc-600 dark:to-zinc-800 mt-2 rounded-full" />
      </div>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md text-center leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className={`
                    relative z-10
                    cursor-pointer
                    flex items-center gap-2
                    rounded-full
                    bg-linear-to-b from-zinc-800 via-zinc-900 to-zinc-800
                    hover:from-zinc-900 hover:via-zinc-800 hover:to-zinc-900
                    dark:from-gray-50 dark:via-white dark:to-gray-50
                    dark:hover:from-white dark:hover:via-gray-50 dark:hover:to-white
                    text-white dark:text-zinc-900
                    px-4 py-2
                    transition-all duration-300
                    shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12),inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.15)]
                    dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.6)]
                    hover:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.2),inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.15)]
                    group
                `}
      >
        <span className="text-sm font-medium">Back to Home</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
