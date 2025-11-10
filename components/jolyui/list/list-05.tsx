import { cn } from "@/lib/utils";
import { Play, MoreHorizontal, Heart, Clock, Music2 } from "lucide-react";

export default function List05() {
    return (
        <div
            className={cn(
                "w-full max-w-xl mx-auto",
                "bg-white dark:bg-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "rounded-3xl shadow-lg overflow-hidden"
            )}
        >
            <div className="relative h-48 bg-linear-to-b from-rose-500 to-rose-600 p-6">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative flex items-end h-full">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl shadow-lg overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
                                alt="Featured Album"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">
                                Weekly Mix
                            </h2>
                            <p className="text-sm text-white/80">
                                Updated today · 2hr 35min
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="h-9 w-9 flex items-center justify-center rounded-full
                            bg-rose-500 hover:bg-rose-600 transition-colors"
                        >
                            <Play className="w-4 h-4 text-white fill-current" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-zinc-400" />
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                32 tracks
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <div className="group flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
                            alt="Album cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                            Summer Nights
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Midnight Groove
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Heart className="w-4 h-4 text-zinc-400 hover:text-rose-500 transition-colors" />
                        </button>
                        <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                            3:45
                        </span>
                        <button
                            type="button"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>
                </div>

                <div className="group flex items-center gap-4 px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <Music2 className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                            Midnight Drive
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Urban Beats
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Heart className="w-4 h-4 text-zinc-400 hover:text-rose-500 transition-colors" />
                        </button>
                        <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
                            4:20
                        </span>
                        <button
                            type="button"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
