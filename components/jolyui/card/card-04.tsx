import {
    SmilePlus,
    Send,
    MoreHorizontal,
    CheckCheck,
    Check,
    Users,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    sender: {
        name: string;
        avatar: string;
        isOnline: boolean;
    };
    timestamp: string;
    status: "sent" | "delivered" | "read";
    reactions?: Array<{
        emoji: string;
        count: number;
        reacted: boolean;
    }>;
}

interface Card04Props {
    chatName?: string;
    messages?: Message[];
}

export default function Card04({
    chatName = "Design Team",
    messages = [
        {
            id: "1",
            content: "Just pushed the latest design system updates ✨",
            sender: {
                name: "Alex Chen",
                avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
                isOnline: true,
            },
            timestamp: "10:24 AM",
            status: "read",
            reactions: [
                { emoji: "🙌", count: 2, reacted: true },
                { emoji: "✨", count: 1, reacted: false },
            ],
        },
        {
            id: "2",
            content:
                "The new components look amazing! Great work on the animations.",
            sender: {
                name: "Sarah Kim",
                avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
                isOnline: true,
            },
            timestamp: "10:26 AM",
            status: "delivered",
        },
    ],
}: Card04Props) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={cn(
                    "relative overflow-hidden",
                    "bg-white/50 dark:bg-zinc-900/50",
                    "backdrop-blur-xl",
                    "border border-zinc-200/50 dark:border-zinc-800/50",
                    "rounded-2xl",
                    "transition-all duration-300",
                    "hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
                    "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
                )}
            >
                <div className="px-5 py-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-xl",
                                        "bg-linear-to-br from-violet-500 to-indigo-500",
                                        "flex items-center justify-center",
                                        "text-white font-medium text-sm"
                                    )}
                                >
                                    <Users className="w-5 h-5" />
                                </div>
                                <div
                                    className={cn(
                                        "absolute -bottom-0.5 -right-0.5",
                                        "w-3 h-3 rounded-full",
                                        "bg-emerald-500",
                                        "ring-2 ring-white dark:ring-zinc-900"
                                    )}
                                />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {chatName}
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    3 members • 2 online
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={cn(
                                "p-2 rounded-xl",
                                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                "transition-colors duration-200"
                            )}
                        >
                            <MoreHorizontal className="w-5 h-5 text-zinc-500" />
                        </button>
                    </div>
                </div>

                <div className="h-[350px] overflow-y-auto p-5 space-y-5">
                    {messages.map((message) => (
                        <div key={message.id} className="group/message">
                            <div className="flex items-start gap-3 mb-1">
                                <Image
                                    src={message.sender.avatar}
                                    alt={message.sender.name}
                                    width={32}
                                    height={32}
                                    className={cn(
                                        "rounded-xl",
                                        "ring-2 ring-white dark:ring-zinc-900",
                                        "transition-transform duration-200",
                                        "group-hover/message:scale-105"
                                    )}
                                />
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {message.sender.name}
                                        </span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {message.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                        {message.content}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 pt-1">
                                    {message.status === "read" && (
                                        <CheckCheck className="w-4 h-4 text-blue-500" />
                                    )}
                                    {message.status === "delivered" && (
                                        <Check className="w-4 h-4 text-zinc-400" />
                                    )}
                                </div>
                            </div>
                            {message.reactions && (
                                <div className="flex items-center gap-1.5 ml-11">
                                    {message.reactions.map((reaction) => (
                                        <button
                                            type="button"
                                            key={reaction.emoji}
                                            className={cn(
                                                "px-2 py-1 rounded-lg text-xs",
                                                "transition-colors duration-200",
                                                reaction.reacted
                                                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                                                "hover:bg-violet-200 dark:hover:bg-violet-800/30"
                                            )}
                                        >
                                            {reaction.emoji} {reaction.count}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                className={cn(
                                    "w-full px-4 py-2.5 pr-10",
                                    "bg-zinc-50 dark:bg-zinc-800/50",
                                    "border border-zinc-200 dark:border-zinc-700/50",
                                    "rounded-xl",
                                    "text-sm text-zinc-900 dark:text-zinc-100",
                                    "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                                    "focus:outline-hidden focus:ring-2 focus:ring-violet-500/20",
                                    "transition-all duration-200"
                                )}
                            />
                            <button
                                type="button"
                                className={cn(
                                    "absolute right-2 top-1/2 -translate-y-1/2",
                                    "p-1.5 rounded-lg",
                                    "hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50",
                                    "transition-colors duration-200"
                                )}
                            >
                                <SmilePlus className="w-4 h-4 text-zinc-500" />
                            </button>
                        </div>
                        <button
                            type="button"
                            className={cn(
                                "p-2.5 rounded-xl",
                                "bg-zinc-900 dark:bg-zinc-100",
                                "text-white dark:text-zinc-900",
                                "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                                "transition-colors duration-200"
                            )}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
