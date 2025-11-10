"use client";

import { useState } from "react";
import { Preview } from "./preview-generation";
import { ErrorGeneration } from "./error-generation";
import { FormGeneration } from "./form-generation";
import { HeaderGeneration } from "./header-generation";

interface CardSettings {
    style: string;
    backgroundColor: string;
    lighting: string;
    pose: string;
    aspectRatio: string;
}

export default function AICardGeneration() {
    const [showForm, setShowForm] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<CardSettings>({
        style: "artistic",
        backgroundColor: "studio",
        lighting: "studio",
        pose: "profile",
        aspectRatio: "4:5",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false);
        setIsLoading(true);
        setError(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setShowForm(false);
        } catch (err) {
            setError("Failed to generate video. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToSettings = () => {
        setShowForm(true);
        setError(null);
    };

    return (
        <div className="group relative overflow-hidden w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] min-h-[500px] flex flex-col justify-between gap-2">
            <HeaderGeneration />
            <div className="flex-1 overflow-hidden flex flex-col">
                {error && <ErrorGeneration error={error} />}

                {showForm ? (
                    <FormGeneration
                        onSubmit={handleSubmit}
                        settings={settings}
                        onSettingsChange={setSettings}
                    />
                ) : (
                    <div className="p-4">
                        <Preview
                            isLoading={isLoading}
                            imageUrl="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg"
                        />

                        {!isLoading && (
                            <div className="space-y-4">
                                <div className="p-3 space-y-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">
                                            Quality
                                        </span>
                                        <span className="text-zinc-900 dark:text-zinc-100">
                                            1080p
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">
                                            Duration
                                        </span>
                                        <span className="text-zinc-900 dark:text-zinc-100">
                                            00:07
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={handleBackToSettings}
                                        className="w-full h-9 flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-medium rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Back to Settings
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full h-9 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
