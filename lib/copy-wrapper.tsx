"use client";

import { useState } from "react";
import { CopyOverlay } from "./copy-overlay";
import { AnimatePresence } from "motion/react";
import { Code, Terminal } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CopyWrapperProps {
    fileName: string;
    showCode: boolean;
    setShowCode: (show: boolean) => void;
}

const prePath = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`;

export function CopyWrapper({
    fileName,
    showCode = false,
    setShowCode,
}: CopyWrapperProps) {
    const [showOverlay, setShowOverlay] = useState(false);
    const { copyToClipboard } = useCopyToClipboard({
        timeout: 1000,
        onCopy: () => {
            setShowOverlay(true);
            setTimeout(() => {
                setShowOverlay(false);
            }, 1000);
        },
    });

    const handleCLI = () => {
        console.log(prePath);
        copyToClipboard(
            `bunx shadcn@latest add ${prePath}/r/${fileName?.replace(
                ".tsx",
                ".json"
            )}`
        );
    };

    return (
        <>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={handleCLI}
                    className="inline-flex items-center px-3 py-2 text-sm rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                    <Terminal className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="inline-flex items-center px-3 py-2 text-sm rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                    <Code className="w-4 h-4" />
                </button>
            </div>
            <AnimatePresence>
                <CopyOverlay show={showOverlay} />
            </AnimatePresence>
        </>
    );
}
