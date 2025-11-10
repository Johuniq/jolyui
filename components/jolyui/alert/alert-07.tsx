import { Button } from "@/components/ui/button";

export default function Alert07() {
    return (
        <div>
            <div className="bg-white dark:bg-zinc-900/95 backdrop-blur-xs rounded-lg flex flex-col items-center justify-center gap-2 p-6 shadow-xs border border-gray-800/20 dark:border-gray-200/20">
                <div className="text-gray-900 dark:text-gray-100 my-2 font-semibold">
                    FREE TRIAL EXPIRED
                </div>
                <div className="flex flex-col items-center justify-center gap-6">
                    <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                        Subscribe now to continue using our services.
                    </p>
                    <Button
                        type="button"
                        className="relative group overflow-hidden bg-blue-700 dark:bg-blue-500 hover:bg-blue-800 dark:hover:bg-blue-600 backdrop-blur-xs border border-blue-400/30 dark:border-blue-600/30 transition-all duration-300"
                    >
                        <span className="relative z-10 font-semibold text-sm text-white">
                            Subscribe Now
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-transparent via-blue-600 to-transparent dark:via-blue-400 transition-transform duration-700 ease-out" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
