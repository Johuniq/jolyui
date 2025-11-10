"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

interface Btn_05Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    holdDuration?: number;
}

export default function Btn_05({
    className,
    holdDuration = 3000,
    ...props
}: Btn_05Props) {
    const [isHolding, setIsHolding] = useState(false);
    const controls = useAnimation();

    async function handleHoldStart() {
        setIsHolding(true);
        controls.set({ width: "0%" });
        await controls.start({
            width: "100%",
            transition: {
                duration: holdDuration / 1000,
                ease: "linear",
            },
        });
    }

    function handleHoldEnd() {
        setIsHolding(false);
        controls.stop();
        controls.start({
            width: "0%",
            transition: { duration: 0.1 },
        });
    }

    return (
        <Button
            className={cn(
                "min-w-40 relative overflow-hidden touch-none",
                "bg-red-100 dark:bg-red-200",
                "hover:bg-red-100 dark:hover:bg-red-200",
                "text-red-500 dark:text-red-600",
                "border border-red-200 dark:border-red-300",
                className
            )}
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            onTouchCancel={handleHoldEnd}
            {...props}
        >
            <motion.div
                initial={{ width: "0%" }}
                animate={controls}
                className={cn(
                    "absolute left-0 top-0 h-full",
                    "bg-red-200/30",
                    "dark:bg-red-300/30"
                )}
            />
            <span className="relative z-10 w-full flex items-center justify-center gap-2">
                <Trash2Icon className="w-4 h-4" />
                {!isHolding ? "Hold me" : "Release"}
            </span>
        </Button>
    );
}
