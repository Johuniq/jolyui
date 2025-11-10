"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { PartyPopper } from "lucide-react";

export default function Alert04() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mx-auto"
        >
            <div
                className={cn(
                    "relative overflow-hidden",
                    "bg-linear-to-b from-violet-50 to-white",
                    "dark:from-violet-950/20 dark:to-zinc-950",
                    "border border-violet-100 dark:border-violet-900/50",
                    "shadow-[0_1px_6px_0_rgba(139,92,246,0.06)]",
                    "rounded-xl p-4"
                )}
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ rotate: -15, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <div
                            className={cn(
                                "p-2.5 rounded-xl",
                                "bg-linear-to-br from-fuchsia-500 via-violet-500 to-indigo-500",
                                "dark:from-fuchsia-600 dark:via-violet-600 dark:to-indigo-600"
                            )}
                        >
                            <PartyPopper className="h-5 w-5 text-white" />
                        </div>
                    </motion.div>

                    <div className="space-y-1">
                        <motion.h3
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className={cn(
                                "font-medium",
                                "text-violet-900 dark:text-violet-100"
                            )}
                        >
                            Amazing milestone! 🎉
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "text-sm",
                                "text-violet-600 dark:text-violet-300"
                            )}
                        >
                            You've just hit 1,000 followers on your journey!
                        </motion.p>
                    </div>
                </div>

                <div className="hidden sm:block absolute top-4 right-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.3,
                        }}
                        className={cn(
                            "text-[11px] font-medium",
                            "px-2.5 py-0.5 rounded-full",
                            "bg-linear-to-r from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10",
                            "dark:from-fuchsia-500/20 dark:via-violet-500/20 dark:to-indigo-500/20",
                            "text-violet-700 dark:text-violet-200",
                            "ring-1 ring-violet-500/20 dark:ring-violet-400/20"
                        )}
                    >
                        Milestone
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
