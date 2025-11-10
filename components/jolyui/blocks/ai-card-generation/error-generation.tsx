import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
    error: string;
}

export const ErrorGeneration = ({ error }: ErrorProps) => {
    return (
        <div className="m-4 px-4 py-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
        </div>
    );
};