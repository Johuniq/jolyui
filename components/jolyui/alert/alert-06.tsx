"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function Alert06() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-purple-50 to-white dark:from-purple-950/50 dark:to-zinc-950 border border-purple-100 dark:border-purple-900/50 shadow-[0_1px_3px_0_rgba(147,51,234,0.1),0_1px_2px_-1px_rgba(147,51,234,0.1)] dark:shadow-[0_1px_3px_0_rgba(147,51,234,0.05),0_1px_2px_-1px_rgba(147,51,234,0.05)] p-1">
                <div className="relative z-10 flex items-center gap-4 p-4 bg-white/50 dark:bg-zinc-950/50 rounded-xl">
                    <div className="shrink-0">
                        <motion.div
                            initial={{ rotate: -15, scale: 0.5 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="rounded-xl bg-linear-to-br from-purple-500 to-purple-600 p-2.5 shadow-inner"
                        >
                            <Sparkles className="h-5 w-5 text-white" />
                        </motion.div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-purple-950 dark:text-purple-100">
                                    Black Friday Sale! 🎉
                                </h3>
                                <p className="mt-1 text-sm text-purple-900/70 dark:text-purple-300/70 line-clamp-1">
                                    Get 50% off on all premium features. Limited
                                    time offer!
                                </p>
                            </div>
                            <div className="shrink-0">
                                <button
                                    type="button"
                                    className="bg-purple-600 text-white shadow-xs h-9 px-4 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 transition-all duration-200 dark:text-white rounded-lg"
                                >
                                    Claim Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
