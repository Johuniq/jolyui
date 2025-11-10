import { cn } from "@/lib/utils";
import {
    ChevronRight,
    FileText,
    Presentation,
    Users,
    BarChart,
} from "lucide-react";

export default function List04() {
    return (
        <div
            className={cn(
                "w-full max-w-lg mx-auto",
                "bg-white dark:bg-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "rounded-2xl shadow-xs"
            )}
        >
            <div className="p-6 pb-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Weekly Highlights
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Latest updates.
                        </p>
                    </div>
                    <time className="text-sm font-medium text-zinc-500 dark:text-zinc-400 tabular-nums">
                        Tues, Nov 12
                    </time>
                </div>
            </div>

            <div className="p-6">
                <div className="space-y-2">
                    <div
                        className="group flex items-center gap-4 p-3 rounded-xl 
                        hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                        transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex-none p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Design review meeting notes
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Updated 2 hours ago
                            </p>
                        </div>
                        <ChevronRight
                            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 
                            group-hover:text-zinc-600 dark:group-hover:text-zinc-300 
                            transition-colors"
                        />
                    </div>

                    <div
                        className="group flex items-center gap-4 p-3 rounded-xl 
                        hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                        transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex-none p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10">
                            <BarChart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Q2 Performance metrics
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Updated yesterday
                            </p>
                        </div>
                        <ChevronRight
                            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 
                            group-hover:text-zinc-600 dark:group-hover:text-zinc-300 
                            transition-colors"
                        />
                    </div>

                    <div
                        className="group flex items-center gap-4 p-3 rounded-xl 
                        hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                        transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex-none p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                New feature specifications
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Updated 3 days ago
                            </p>
                        </div>
                        <ChevronRight
                            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 
                            group-hover:text-zinc-600 dark:group-hover:text-zinc-300 
                            transition-colors"
                        />
                    </div>

                    <div
                        className="group flex items-center gap-4 p-3 rounded-xl 
                        hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                        transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex-none p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                            <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Team feedback summary
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Updated 4 days ago
                            </p>
                        </div>
                        <ChevronRight
                            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 
                            group-hover:text-zinc-600 dark:group-hover:text-zinc-300 
                            transition-colors"
                        />
                    </div>

                    <div
                        className="group flex items-center gap-4 p-3 rounded-xl 
                        hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                        transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex-none p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10">
                            <Presentation className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Client presentation deck
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Updated 5 days ago
                            </p>
                        </div>
                        <ChevronRight
                            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 
                            group-hover:text-zinc-600 dark:group-hover:text-zinc-300 
                            transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
