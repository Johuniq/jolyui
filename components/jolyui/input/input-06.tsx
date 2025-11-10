"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;

export default function Input_06() {
    const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveIndex(index + 1);
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            // Move to previous input on backspace if current input is empty
            inputRefs.current[index - 1]?.focus();
            setActiveIndex(index - 1);
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveIndex(index - 1);
        } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveIndex(index + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text/plain")
            .slice(0, OTP_LENGTH);

        if (!/^\d+$/.test(pastedData)) {
            setShake(true);
            setTimeout(() => setShake(false), 600);
            return;
        }

        const newCode = [...code];
        pastedData.split("").forEach((digit, index) => {
            newCode[index] = digit;
        });
        setCode(newCode);

        const focusIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
        inputRefs.current[focusIndex]?.focus();
        setActiveIndex(focusIndex);
    };

    const setInputRef = useCallback(
        (index: number) => (el: HTMLInputElement | null) => {
            inputRefs.current[index] = el;
        },
        []
    );

    return (
        <div className="w-full max-w-sm space-y-2">
            <fieldset
                className={cn("flex flex-col gap-2", shake && "animate-shake")}
            >
                <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Verification Code
                </legend>

                <div className="flex gap-2 items-center justify-start">
                    {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                        <div key={`otp-input-${index}`} className="relative">
                            <input
                                id={`otp-input-${index}`}
                                ref={setInputRef(index)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={code[index]}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                onFocus={() => setActiveIndex(index)}
                                className={cn(
                                    "w-12 h-14 text-center text-lg font-semibold",
                                    "rounded-lg border",
                                    "transition-all duration-200",
                                    "bg-white dark:bg-zinc-900",
                                    "border-zinc-200 dark:border-zinc-800",
                                    activeIndex === index &&
                                        "border-indigo-500 dark:border-indigo-500",
                                    "focus:outline-hidden focus:ring-2",
                                    "focus:ring-indigo-500/20"
                                )}
                            />
                            {index !== 6 - 1 && (
                                <div className="absolute top-1/2 -right-2 w-2 transform -translate-y-1/2">
                                    <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}
