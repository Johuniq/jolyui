"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Download, Check, X } from "lucide-react";

interface Btn07Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onProcess?: () => Promise<boolean>;
    processDuration?: number;
}

export default function Btn07({
    className,
    onProcess = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return Math.random() > 0.5;
    },
    processDuration = 2000,
    ...props
}: Btn07Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [isScaling, setIsScaling] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isProcessing) {
            const startTime = Date.now();
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = (elapsed / processDuration) * 100;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setProgress(100);
                } else {
                    setProgress(newProgress);
                }
            }, 10);

            return () => clearInterval(interval);
        }
    }, [isProcessing, processDuration]);

    async function handleClick() {
        if (isProcessing) return;

        setIsProcessing(true);
        setIsSuccess(null);
        setProgress(0);

        await new Promise((resolve) => setTimeout(resolve, processDuration));
        const success = onProcess ? await onProcess() : true;

        setIsSuccess(success);
        setIsProcessing(false);
        setIsScaling(true);

        setTimeout(() => {
            setIsSuccess(null);
            setProgress(0);
            setIsScaling(false);
        }, 2000);
    }

    return (
        <Button
            className={cn(
                "min-w-40 relative group",
                "bg-blue-50 dark:bg-blue-950",
                "hover:bg-blue-100 dark:hover:bg-blue-900",
                "text-blue-600 dark:text-blue-300",
                "border border-blue-200 dark:border-blue-800",
                "transition-all duration-300",
                isProcessing && "cursor-wait",
                className
            )}
            onClick={handleClick}
            disabled={isProcessing}
            {...props}
        >
            <div
                className={cn(
                    "w-full flex items-center justify-center gap-2",
                    isScaling && "animate-[scale_300ms_ease-in-out]"
                )}
            >
                {isSuccess === null ? (
                    <>
                        <Download
                            className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                "group-hover:scale-110",
                                isProcessing && "animate-bounce"
                            )}
                        />
                        <span>
                            {isProcessing ? "Processing..." : "Download"}
                        </span>
                    </>
                ) : isSuccess ? (
                    <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Complete!</span>
                    </>
                ) : (
                    <>
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">Failed</span>
                    </>
                )}
            </div>
        </Button>
    );
}
