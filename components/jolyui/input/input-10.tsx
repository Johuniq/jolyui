"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";

const moodStates = [
    { value: 0, label: "Not Happy", color: "#EF4444" },
    { value: 50, label: "Good", color: "#F59E0B" },
    { value: 100, label: "Very Good", color: "#10B981" },
] as const;

function EmotionFace({ value }: { value: number }) {
    const getFaceConfig = () => {
        if (value === 0) {
            return {
                color: "#EF4444",
                eyes: {
                    left: "M6 10 Q8 8 10 10",
                    right: "M14 10 Q16 8 18 10",
                },
                mouth: "M8 16 Q12 13 16 16",
            };
        }

        if (value === 50) {
            return {
                color: "#F59E0B",
                eyes: {
                    left: "M6 9 L10 9",
                    right: "M14 9 L18 9",
                },
                mouth: "M8 16 L16 16",
            };
        }

        return {
            color: "#10B981",
            eyes: {
                left: "M6 10 Q8 12 10 10",
                right: "M14 10 Q16 12 18 10",
            },
            mouth: "M8 16 Q12 19 16 16",
        };
    };

    const face = getFaceConfig();

    return (
        <svg
            width="160"
            height="160"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300 ease-in-out"
        >
            <title>Face Mood</title>
            {/* Left Eye */}
            <path
                d={face.eyes.left}
                stroke={face.color}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Right Eye */}
            <path
                d={face.eyes.right}
                stroke={face.color}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Mouth */}
            <path
                d={face.mouth}
                stroke={face.color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function Input_10() {
    const [value, setValue] = useState(100);

    const adjustValue = (direction: "left" | "right") => {
        const currentIndex = moodStates.findIndex(
            (state) => state.value === value
        );
        const newIndex =
            direction === "left"
                ? Math.max(0, currentIndex - 1)
                : Math.min(moodStates.length - 1, currentIndex + 1);

        setValue(moodStates[newIndex].value);
    };

    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="relative flex items-center justify-center gap-8 py-4">
                <button
                    type="button"
                    onClick={() => adjustValue("left")}
                    disabled={value === 0}
                    className={cn(
                        "p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        "text-zinc-500 hover:text-zinc-700",
                        "dark:text-zinc-400 dark:hover:text-zinc-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-colors"
                    )}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <EmotionFace value={value} />

                <button
                    type="button"
                    onClick={() => adjustValue("right")}
                    disabled={value === 100}
                    className={cn(
                        "p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        "text-zinc-500 hover:text-zinc-700",
                        "dark:text-zinc-400 dark:hover:text-zinc-300",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "transition-colors"
                    )}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
