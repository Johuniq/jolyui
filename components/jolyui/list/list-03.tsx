import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    Circle,
    Clock,
    Flag,
    MoreHorizontal,
    Plus,
} from "lucide-react";

export default function List03() {
    return (
        <div
            className={cn(
                "w-full max-w-md mx-auto",
                "bg-white dark:bg-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "rounded-2xl shadow-lg"
            )}
        >
            <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                <div>
                    <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Today's Tasks
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        June 12, 2024
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        5/8 done
                    </span>
                </div>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <div className="p-3 flex items-center gap-3 group">
                    <button type="button" className="flex-none">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-zinc-400 dark:text-zinc-500 line-through">
                            Review design system updates
                        </p>
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        2:00 PM
                    </span>
                </div>

                <div className="p-3 flex items-center gap-3 group">
                    <button type="button" className="flex-none">
                        <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-zinc-900 dark:text-zinc-100">
                                Prepare presentation deck
                            </p>
                            <Flag className="w-3.5 h-3.5 text-rose-500" />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-xs text-zinc-500">
                                    3:30 PM
                                </span>
                            </div>
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-medium">
                                High
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                <div className="p-3 flex items-center gap-3 group">
                    <button type="button" className="flex-none">
                        <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-zinc-900 dark:text-zinc-100">
                            Update API documentation
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-xs text-zinc-500">
                                    4:00 PM
                                </span>
                            </div>
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium">
                                Medium
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                <div className="p-3 flex items-center gap-3 group">
                    <button type="button" className="flex-none">
                        <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-zinc-900 dark:text-zinc-100">
                            Review weekly analytics
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-xs text-zinc-500">
                                    5:00 PM
                                </span>
                            </div>
                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium">
                                Low
                            </span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>
            </div>

            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                    type="button"
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 
                    hover:text-zinc-600 dark:hover:text-zinc-300 
                    hover:bg-zinc-50 dark:hover:bg-zinc-800/50
                    rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add new task
                </button>
            </div>
        </div>
    );
}
