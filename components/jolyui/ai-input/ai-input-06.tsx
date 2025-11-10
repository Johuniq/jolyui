"use client";

import { CornerRightUp } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

export default function AIInput_06() {
    const [inputValue, setInputValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 50,
        maxHeight: 200,
    });

    const handleSubmit = () => {
        setInputValue("");
        adjustHeight(true);
    };

    return (
        <div className="w-full py-4">
            <div className="relative max-w-xl w-full mx-auto flex items-start flex-col gap-2">
                <div className="relative max-w-xl w-full mx-auto">
                    <Textarea
                        ref={textareaRef}
                        id="ai-input-06"
                        placeholder="Ask me anything!"
                        className={cn(
                            "max-w-xl bg-black/5 dark:bg-white/5 w-full rounded-3xl pl-6 pr-12 py-4 placeholder:text-black/70 dark:placeholder:text-white/70 border-none ring-black/30 dark:ring-white/30 text-black dark:text-white resize-none text-wrap leading-[1.2]",
                            "min-h-[56px]"
                        )}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (e.shiftKey) {
                                    return;
                                }
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            adjustHeight();
                        }}
                    />
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1"
                        type="button"
                    >
                        <CornerRightUp
                            className={cn(
                                "w-4 h-4 transition-opacity dark:text-white",
                                inputValue ? "opacity-100" : "opacity-30"
                            )}
                        />
                    </button>
                </div>
                <p className="ml-4 text-xs text-black/40 dark:text-white/40">
                    {inputValue.length + 20}/100 characters
                </p>
            </div>
        </div>
    );
}
