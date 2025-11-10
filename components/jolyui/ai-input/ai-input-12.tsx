"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

const AVATARS = [
    {
        src: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
        nickname: "Sarah Chen",
    },
    {
        src: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
        nickname: "Michael Johnson",
    },
    {
        src: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-03-JateJIUhtd3PXynaMG9TDWQ55j5AVP.png",
        nickname: "Emma Wilson",
    },
    {
        src: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png",
        nickname: "David Brown",
    },
];

export default function AIInput_12() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 40,
        maxHeight: 200,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            setValue("");
            adjustHeight(true);
        }
    };

    return (
        <div className="w-full py-4">
            <div className="flex flex-col">
                <div className="flex items-center bg-white/50 dark:bg-transparent backdrop-blur-xs px-2 justify-between">
                    <div className="text-xs text-black/50 dark:text-white/50">
                        Shared with 4 peoples
                    </div>
                    <div>
                        <div className="inline-flex items-center justify-center">
                            <TooltipProvider delayDuration={0}>
                                {AVATARS.map((avatar, i) => (
                                    <Tooltip key={i}>
                                        <TooltipTrigger asChild>
                                            <div
                                                className="relative w-8 h-8 hover:z-10 cursor-pointer"
                                                style={{
                                                    marginLeft:
                                                        i > 0 ? "-8px" : "0",
                                                }}
                                            >
                                                <img
                                                    src={avatar.src}
                                                    alt={`Avatar ${i + 1}`}
                                                    className="w-full h-full object-cover rounded-full border-[1.5px] border-white dark:border-none bg-white dark:bg-transparent ring-2 ring-black/5 dark:ring-0"
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="dark:bg-black/80 dark:text-white dark:border-white/10">
                                            <p>{avatar.nickname}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                <div className="bg-black/5 dark:bg-white/5 rounded-xl">
                    <div className="relative px-2 py-2">
                        <Textarea
                            id="ai-input-12"
                            value={value}
                            ref={textareaRef}
                            placeholder="Type your message..."
                            className={cn(
                                "w-full rounded-xl px-4 border-none resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70",
                                "min-h-[40px]"
                            )}
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

                <div className="text-xs text-black/50 dark:text-white/50 px-2 py-1">
                    {`${AVATARS[0].nickname}, ${AVATARS[2].nickname}${
                        value ? ` and ${AVATARS[3].nickname}` : ""
                    } are writing...`}
                </div>
            </div>
        </div>
    );
}
