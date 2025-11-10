"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MultimodalInput } from "./multimodal-input";

export default function AiChat() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black dark:from-black dark:via-zinc-800/40 dark:to-black px-4">
            <div className="w-full p-4 flex flex-col items-center justify-center h-screen mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className={cn("text-center mb-10", "opacity-100 scale-100")}
                >
                    <h1 className="text-5xl md:text-6xl font-medium mb-4 tracking-tighter bg-clip-text bg-gradient-to-b from-black to-black/70 text-white">
                        Welcome Traveler
                    </h1>
                    <p className="text-xl text-zinc-400">
                        What can I do for you today?
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className={cn(
                        "w-full rounded-2xl relative overflow-hidden",
                        "h-0 overflow-hidden"
                    )}
                >
                    <div className="relative p-6">
                        <div className="flex flex-col gap-4">
                            {/* Put messages here */}
                        </div>
                        <div className="shrink-0 min-w-[24px] min-h-[24px]" />
                    </div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-3xl px-4 md:px-0 mt-6"
                >
                    <div className="relative backdrop-blur-xl rounded-xl">
                        <MultimodalInput />
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
