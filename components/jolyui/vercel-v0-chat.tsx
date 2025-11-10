"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
} from "lucide-react";

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                setValue("");
                adjustHeight(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-4 sm:space-y-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-black dark:text-white text-center">
                What can I help you ship?
            </h1>

            <div className="w-full">
                <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask v0 a question..."
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-neutral-500 placeholder:text-sm",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4 text-white" />
                                <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="px-2 py-1 rounded-lg text-sm text-zinc-400 transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Project
                            </button>
                            <button
                                type="button"
                                className={cn(
                                    "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1",
                                    value.trim()
                                        ? "bg-white text-black"
                                        : "text-zinc-400"
                                )}
                            >
                                <ArrowUpIcon
                                    className={cn(
                                        "w-4 h-4",
                                        value.trim()
                                            ? "text-black"
                                            : "text-zinc-400"
                                    )}
                                />
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 sm:overflow-x-auto sm:pb-2 sm:justify-center scrollbar-hide">
                        <ActionButton
                            icon={<ImageIcon className="w-4 h-4" />}
                            label="Clone a Screenshot"
                        />
                        <ActionButton
                            icon={<Figma className="w-4 h-4" />}
                            label="Import from Figma"
                        />
                        <ActionButton
                            icon={<FileUp className="w-4 h-4" />}
                            label="Upload a Project"
                        />
                        <ActionButton
                            icon={<MonitorIcon className="w-4 h-4" />}
                            label="Landing Page"
                        />
                        <ActionButton
                            icon={<CircleUserRound className="w-4 h-4" />}
                            label="Sign Up Form"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}

export default VercelV0Chat;
