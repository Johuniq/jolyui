"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Ban, FileText, Languages, Search, SendIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const QuickActions = [
    {
        action: "Search the web",
        icon: Search,
        gradient: "from-zinc-900/50 to-black/50",
        hoverGradient: "hover:from-zinc-800/50 hover:to-zinc-900/50",
    },
    {
        action: "Summarize this article",
        icon: FileText,
        gradient: "from-zinc-900/50 to-black/50",
        hoverGradient: "hover:from-zinc-800/50 hover:to-zinc-900/50",
    },
    {
        action: "Translate this text",
        icon: Languages,
        gradient: "from-zinc-900/50 to-black/50",
        hoverGradient: "hover:from-zinc-800/50 hover:to-zinc-900/50",
    },
];

export function MultimodalInput() {
    const [input, setInput] = useState("");

    function handleSubmit() {
        if (input.length > 0) {
            console.log("Sending message:", input);
        }
        setInput("");
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
            <div className="relative bg-zinc-900 rounded-xl border border-zinc-800">
                <Textarea
                    placeholder="What would you like to do?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    className={cn(
                        "w-full px-4 py-3",
                        "resize-none",
                        "bg-transparent",
                        "border-none",
                        "text-zinc-100 text-base",
                        "focus:outline-none",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                        "placeholder:text-zinc-500 placeholder:text-base",
                        "min-h-[60px]"
                    )}
                />
                <div className="flex items-center justify-end p-3">
                    <Button
                        className={cn(
                            "px-1.5 py-1.5 h-6 rounded-lg text-sm transition-colors hover:bg-zinc-800 flex items-center justify-between gap-1",
                            "text-zinc-800",
                            "disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                        )}
                        disabled={input.length === 0}
                        onClick={() => {
                            console.log("Sending message:", input);
                        }}
                    >
                        <SendIcon className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-2 w-full">
                {QuickActions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                                delay: 0.1 * index,
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                            key={index}
                            className={`${
                                index > 1 ? "hidden sm:block" : "block"
                            } h-full`}
                        >
                            <button
                                type="button"
                                className="group w-full h-full text-left rounded-lg p-2.5
                                    bg-zinc-900 hover:bg-zinc-800
                                    border border-zinc-800 hover:border-zinc-700
                                    transition-colors duration-300
                                    flex flex-col justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-md bg-zinc-800 border border-zinc-700">
                                        <Icon
                                            size={14}
                                            className="text-zinc-100"
                                        />
                                    </div>
                                    <div className="text-xs text-zinc-100 font-medium">
                                        {item.action}
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
