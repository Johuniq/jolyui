import { Clock, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Card_10() {
    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-xs border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
                <div className="p-5 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xs">
                    <div className="flex items-start justify-between mb-2">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Dental Consultation
                        </h2>
                        <div className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-orange-100 text-orange-700 border-orange-200">
                            WAITING
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        123 Healthcare Ave, Medical Center
                    </p>
                </div>

                <div className="p-5 space-y-5">
                    <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                        <Image
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                            width={40}
                            height={40}
                            alt="Avatar"
                        />
                        <div>
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Sarah Johnson
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                sarah.j@example.com
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {["position", "wait"].map((type) => (
                            <div
                                key={type}
                                className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3"
                            >
                                {type === "position" ? (
                                    <>
                                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                            Position
                                        </span>
                                        <div className="flex items-baseline mt-1">
                                            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                                #3
                                            </span>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
                                                in queue
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                            Estimated Wait
                                        </span>
                                        <div className="flex items-baseline mt-1">
                                            <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                                25
                                            </span>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
                                                min
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs px-1">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-zinc-500 font-medium">
                                    09:30
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-zinc-500 font-medium">
                                    {new Date().toLocaleDateString()}
                                </span>
                                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                        </div>
                        <div>
                            <Progress
                                value={45}
                                className="h-1 bg-zinc-200 dark:bg-zinc-700"
                            />
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 h-9 text-sm"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel Reservation
                    </Button>
                </div>
            </div>
        </div>
    );
}
