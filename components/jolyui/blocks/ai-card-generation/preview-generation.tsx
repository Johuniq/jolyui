"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface PreviewProps {
    isLoading: boolean;
    imageUrl: string;
}

export const Preview = ({ isLoading, imageUrl }: PreviewProps) => {
    const availableTexts = [
        "Creating your masterpiece...",
        "Finding the good colors...",
        "Adding the final touches...",
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setProgress(0);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % availableTexts.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className="aspect-video  rounded-xl mb-4 flex items-center justify-center">
            {isLoading ? (
                <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
                    <CardContent className="flex flex-col items-center gap-4 p-6">
                        <div className="relative w-12 h-12">
                            <Loader2 className="w-full h-full animate-spin text-fuchsia-500" />
                            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-transparent to-fuchsia-500/10 rounded-full animate-spin-slow" />
                        </div>
                        <div className="space-y-1 text-center">
                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                {availableTexts[currentTextIndex]}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                This usually takes 10-15 seconds
                            </p>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-fuchsia-500 transition-all duration-300 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src={imageUrl}
                        width={400}
                        height={400}
                        alt="Portrait"
                        className="rounded-xl"
                    />
                </div>
            )}
        </div>
    );
};
