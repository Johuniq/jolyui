"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NumericInputProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
}

export default function Input_04({
    min = 0,
    max = 100,
    step = 1,
    defaultValue = 50,
}: NumericInputProps) {
    const [value, setValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseFloat(e.target.value);
        if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
            setValue(newValue);
        }
    };

    const incrementValue = () => {
        const newValue = Math.min(value + step, max);
        setValue(newValue);
    };

    const decrementValue = () => {
        const newValue = Math.max(value - step, min);
        setValue(newValue);
    };

    return (
        <div className="w-full max-w-xs">
            <div className="relative">
                <div
                    className={cn(
                        "flex items-center rounded-lg border",
                        "border-zinc-200 dark:border-zinc-800",
                        "bg-white dark:bg-black/5",
                        isFocused && "ring-2 ring-zinc-300 dark:ring-zinc-700"
                    )}
                >
                    <button
                        type="button"
                        onClick={decrementValue}
                        className="px-3 py-2 hover:bg-zinc-100 
                        dark:hover:bg-zinc-800
                        text-zinc-500 dark:text-zinc-400 transition-colors"
                        aria-label="Decrement button"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        min={min}
                        max={max}
                        step={step}
                        className="w-full text-center border-none bg-transparent focus:outline-hidden 
                        [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none
                        text-zinc-900 dark:text-zinc-100"
                    />
                    <button
                        type="button"
                        onClick={incrementValue}
                        className="px-3 py-2 hover:bg-zinc-100 
                        dark:hover:bg-zinc-800
                        text-zinc-500 dark:text-zinc-400 transition-colors"
                        aria-label="Increment button"
                    >
                        +
                    </button>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                        className="h-full bg-zinc-300 dark:bg-zinc-600 transition-all duration-200"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <div className="mt-1 flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
}
