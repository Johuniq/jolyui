"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

interface SimpleInputProps {
    label?: string;
    placeholder?: string;
    error?: string;
    success?: string;
    onChange?: (value: string) => void;
    onClear?: () => void;
    type?: "text" | "email" | "password" | "search";
}

export default function Input_01({
    label = "Label",
    placeholder = "Type something...",
    error,
    success,
    onChange,
    onClear,
    type = "text",
}: SimpleInputProps) {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setValue("");
        onClear?.();
        inputRef.current?.focus();
    };

    return (
        <div className="w-full max-w-xs space-y-1.5">
            <label
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                htmlFor={label}
            >
                {label}
            </label>

            <div className="relative group">
                <input
                    ref={inputRef}
                    type={type}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange?.(e.target.value);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full px-3 py-2",
                        "rounded-lg",
                        "bg-white dark:bg-zinc-900",
                        "border border-zinc-200 dark:border-zinc-800",
                        "text-sm text-zinc-900 dark:text-zinc-100",
                        "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                        "transition-all duration-200",
                        "focus:outline-hidden focus:ring-2",
                        error
                            ? "border-red-500 focus:ring-red-500/20"
                            : success
                            ? "border-green-500 focus:ring-green-500/20"
                            : "focus:ring-indigo-500/20",
                        isFocused && "border-indigo-500"
                    )}
                />

                {/* Clear button */}
                {value && (
                    <button
                        onClick={handleClear}
                        className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2",
                            "p-1 rounded-md",
                            "text-zinc-400 hover:text-zinc-600",
                            "dark:text-zinc-600 dark:hover:text-zinc-400",
                            "transition-colors"
                        )}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                {/* Status indicator */}
                <div
                    className={cn(
                        "absolute -right-4 top-1/2 -translate-y-1/2",
                        "transition-opacity duration-200",
                        !error && !success && "opacity-0"
                    )}
                >
                    {error ? (
                        <X className="w-4 h-4 text-red-500" />
                    ) : success ? (
                        <Check className="w-4 h-4 text-green-500" />
                    ) : null}
                </div>
            </div>

            {/* Error/Success message */}
            {(error || success) && (
                <p
                    className={cn(
                        "text-sm",
                        error ? "text-red-500" : "text-green-500"
                    )}
                >
                    {error || success}
                </p>
            )}
        </div>
    );
}
