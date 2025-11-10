"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface SidebarSection {
    title: string;
    subtitle: string;
    count: number;
    items: string[];
}

export default function AIInput_13() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 40,
        maxHeight: 200,
    });

    const sidebarSections: SidebarSection[] = [
        {
            title: "Saved Tools",
            subtitle: "Most used",
            count: 12,
            items: ["Translate to French", "Summarize Text", "Generate Title"],
        },
        {
            title: "History",
            subtitle: "Past chats",
            count: 24,
            items: [
                "API Integration Help",
                "Debugging Assistant",
                "Code Review Session",
            ],
        },
    ];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setValue("");
            adjustHeight(true);
        }
    };
    return (
        <div className="w-full py-4">
            <div className="flex flex-col gap-4">
                <div className="bg-black/5 dark:bg-white/5 rounded-xl">
                    <div className="relative px-2 py-2">
                        <Textarea
                            id="ai-input-13"
                            value={value}
                            placeholder="Type your message..."
                            className={cn(
                                "w-full rounded-xl px-4 border-none resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70",
                                "min-h-[40px]"
                            )}
                            ref={textareaRef}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 p-1"
                        >
                            <ArrowRight
                                className={cn(
                                    "w-4 h-4 dark:text-white",
                                    value ? "opacity-100" : "opacity-30"
                                )}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    {sidebarSections.map((section) => (
                        <div
                            key={section.title}
                            className="bg-black/5 dark:bg-white/5 rounded-xl p-3 flex-1"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-sm dark:text-white">
                                        {section.title}
                                    </h3>
                                    <p className="text-xs text-black/60 dark:text-white/60">
                                        {section.subtitle}
                                    </p>
                                </div>
                                <span className="text-xs text-black/50 dark:text-white/50 ml-2">
                                    {section.count}
                                </span>
                            </div>

                            <div className="space-y-2 mt-2">
                                {section.items.map((item) => (
                                    <div
                                        key={item}
                                        className="text-xs text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white cursor-pointer transition-colors"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
