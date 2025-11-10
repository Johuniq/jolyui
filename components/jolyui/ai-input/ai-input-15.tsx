"use client";

import {
    ArrowRight,
    Brain,
    type LucideIcon,
    Mic,
    Paperclip,
    TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface ToolbarButton {
    icon: LucideIcon;
    onClick?: () => void;
    className: string | ((isRecording: boolean) => string);
    isFileInput?: boolean;
    isRecording?: boolean;
}

export default function AIInput_15() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 96,
        maxHeight: 300,
    });
    const [useMemory, setUseMemory] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const AI_MODELS = ["GPT-4", "Claude", "Gemini"];

    const TOOLBAR_BUTTONS: ToolbarButton[] = [
        {
            icon: Mic,
            onClick: () => setIsRecording(!isRecording),
            className: (isRecording: boolean) =>
                cn(
                    "rounded-lg p-2 transition-all",
                    isRecording
                        ? "bg-red-500 text-white"
                        : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                ),
            isRecording,
        },
        {
            icon: Paperclip,
            isFileInput: true,
            className: "rounded-lg p-2 bg-black/5 dark:bg-white/5",
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
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <select className="text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md px-2 py-1 dark:text-white">
                            {AI_MODELS.map((model) => (
                                <option key={model}>{model}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={() => setUseMemory(!useMemory)}
                        className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <Brain
                            className={cn(
                                "w-4 h-4",
                                useMemory
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-black/40 dark:text-white/40"
                            )}
                        />
                        <span>Memory</span>
                        <div
                            className={cn(
                                "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                                useMemory
                                    ? "bg-blue-500 dark:bg-blue-400"
                                    : "bg-black/20 dark:bg-white/20"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs",
                                    useMemory
                                        ? "translate-x-4"
                                        : "translate-x-1"
                                )}
                            />
                        </div>
                    </button>
                </div>

                <div className="relative">
                    <div className="relative flex flex-col">
                        <div
                            className="overflow-y-auto"
                            style={{ maxHeight: "400px" }}
                        >
                            <Textarea
                                id="ai-input-15"
                                value={value}
                                placeholder={
                                    isRecording
                                        ? "Listening..."
                                        : "What would you like to know?"
                                }
                                className={cn(
                                    "w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                    "min-h-[96px]"
                                )}
                                ref={textareaRef}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }}
                            />
                        </div>

                        {/* Fixed toolbar area */}
                        <div className="h-14 bg-black/5 dark:bg-white/5 rounded-b-xl">
                            <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {TOOLBAR_BUTTONS.map((button, index) =>
                                        button.isFileInput ? (
                                            <label
                                                key={index}
                                                className={
                                                    typeof button.className ===
                                                    "string"
                                                        ? button.className
                                                        : button.className(
                                                              isRecording
                                                          )
                                                }
                                            >
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                />
                                                <button.icon className="w-4 h-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors" />
                                            </label>
                                        ) : (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={button.onClick}
                                                className={
                                                    typeof button.className ===
                                                    "string"
                                                        ? button.className
                                                        : button.className(
                                                              isRecording
                                                          )
                                                }
                                            >
                                                <button.icon className="w-4 h-4" />
                                            </button>
                                        )
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="rounded-lg p-2 bg-black/5 dark:bg-white/5"
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
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-black/50 dark:text-white/50 justify-center">
                    <div className="flex items-center gap-1">
                        <TriangleAlert className="w-3 h-3" />
                        <span>AI can make mistakes, use with caution.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
