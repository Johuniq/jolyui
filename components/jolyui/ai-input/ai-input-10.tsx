"use client";

import {
    Plus,
    File,
    Camera,
    X,
    ArrowRight,
    Brain,
    ChevronDown,
    Lock,
    Unlock,
} from "lucide-react";
import { useState, useRef, useCallback, type RefObject } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { useFileInput } from "@/hooks/use-file-input";
import { useClickOutside } from "@/hooks/use-click-outside";

const AI_MODELS = [
    { name: "GPT-4", description: "The popular kid" },
    { name: "GPT-3.5", description: "Time flies, he is old now..." },
    { name: "Claude", description: "Yes, the best for coding" },
].map((model) => ({ ...model, icon: <Brain className="w-4 h-4" /> }));

const FileDisplay = ({
    fileName,
    onClear,
}: {
    fileName: string;
    onClear: () => void;
}) => (
    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 w-fit px-3 py-1 rounded-lg">
        <File className="w-4 h-4 dark:text-white" />
        <span className="text-sm dark:text-white">{fileName}</span>
        <button
            type="button"
            onClick={onClear}
            className="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
        >
            <X className="w-3 h-3 dark:text-white" />
        </button>
    </div>
);

export default function AIInput_10() {
    const menuRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState({
        value: "",
        fileName: "",
        isPrivacyMode: false,
        selectedModel: "GPT-4",
        isMenuOpen: false,
        isModelMenuOpen: false,
    });

    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 40,
        maxHeight: 200,
    });
    const { fileName, fileInputRef, handleFileSelect, clearFile } =
        useFileInput({ accept: "image/*", maxSize: 5 });


    const updateState = useCallback(
        (updates: Partial<typeof state>) =>
            setState((prev) => ({ ...prev, ...updates })),
        []
    );

    useClickOutside(menuRef as RefObject<HTMLElement>   , () => {
        if (state.isMenuOpen) updateState({ isMenuOpen: false });
        if (state.isModelMenuOpen) updateState({ isModelMenuOpen: false });
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            updateState({ value: "" });
            adjustHeight(true);
        }
    };

    return (
        <div className="w-full py-4">
            <div className="rounded-xl bg-black/5 dark:bg-white/5">
                <div ref={menuRef}>
                    <div className="border-b border-black/10 dark:border-white/10">
                        <div className="flex justify-between items-center px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="relative" data-model-menu>
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateState({
                                            isModelMenuOpen:
                                                !state.isModelMenuOpen,
                                        })
                                    }
                                    className="flex items-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg px-2 py-1"
                                >
                                    <Brain className="w-4 h-4 dark:text-white" />
                                    <span className="dark:text-white">
                                        {state.selectedModel}
                                    </span>
                                    <ChevronDown className="w-3 h-3 ml-0.5 dark:text-white" />
                                </button>

                                {state.isModelMenuOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1 z-50 border border-black/10 dark:border-white/10">
                                        {AI_MODELS.map((model) => (
                                            <button
                                                type="button"
                                                key={model.name}
                                                className="w-full px-3 py-1.5 text-left hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 text-sm transition-colors dark:text-white"
                                                onClick={() =>
                                                    updateState({
                                                        selectedModel:
                                                            model.name,
                                                        isModelMenuOpen: false,
                                                    })
                                                }
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    {model.icon}
                                                    <span>{model.name}</span>
                                                </div>
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {model.description}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    updateState({
                                        isPrivacyMode: !state.isPrivacyMode,
                                    })
                                }
                                className={cn(
                                    "flex items-center gap-2 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5",
                                    state.isPrivacyMode
                                        ? "text-green-600"
                                        : "text-zinc-600 dark:text-zinc-400"
                                )}
                            >
                                {state.isPrivacyMode ? (
                                    <Lock className="w-4 h-4" />
                                ) : (
                                    <Unlock className="w-4 h-4" />
                                )}
                                <span>Privacy</span>
                            </button>
                        </div>
                    </div>

                    {state.fileName && (
                        <div className="px-4 pt-2">
                            <FileDisplay
                                fileName={state.fileName}
                                onClear={() => {
                                    updateState({ fileName: "" });
                                    if (fileInputRef.current)
                                        fileInputRef.current.value = "";
                                }}
                            />
                        </div>
                    )}

                    <div className="relative px-2 py-2">
                        <div
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            data-action-menu
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    updateState({
                                        isMenuOpen: !state.isMenuOpen,
                                    })
                                }
                                className="rounded-3xl bg-black/5 dark:bg-white/5 p-2 hover:bg-black/10 dark:hover:bg-white/10"
                            >
                                <Plus className="w-4 h-4 dark:text-white" />
                            </button>

                            {state.isMenuOpen && (
                                <div className="absolute left-0 top-full mt-1 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1 min-w-[140px] z-50 border border-black/10 dark:border-white/10">
                                    {[
                                        {
                                            icon: File,
                                            label: "Upload File",
                                            onClick: () =>
                                                fileInputRef.current?.click(),
                                        },
                                        { icon: Camera, label: "Take Photo" },
                                    ].map(({ icon: Icon, label, onClick }) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={onClick}
                                            className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 text-sm transition-colors dark:text-white"
                                        >
                                            <Icon className="w-4 h-4 dark:text-white" />
                                            <span>{label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Textarea
                            id="ai-input-10"
                            ref={textareaRef}
                            value={state.value}
                            placeholder="Type your message..."
                            className={cn(
                                "w-full rounded-xl pl-14 pr-10 border-none resize-none bg-transparent dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70",
                                "min-h-[40px]"
                            )}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                updateState({ value: e.target.value });
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
                                    state.value ? "opacity-100" : "opacity-30"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
