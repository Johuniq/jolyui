import React from "react";

export const HeaderGeneration = () => {
    return (
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
                <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        AI Portrait Generation
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Create stunning portraits with AI
                    </p>
                </div>
            </div>
        </div>
    );
};
