import { cn } from "@/lib/utils";

import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    MoreHorizontal,
    Link as LinkIcon,
} from "lucide-react";

interface Card01Props {
    author?: {
        name?: string;
        username?: string;
        avatar?: string;
        timeAgo?: string;
    };
    content?: {
        text?: string;
        link?: {
            title?: string;
            description?: string;
            icon?: React.ReactNode;
        };
    };
    engagement?: {
        likes?: number;
        comments?: number;
        shares?: number;
        isLiked?: boolean;
        isBookmarked?: boolean;
    };
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onBookmark?: () => void;
}

const defaultProps: Card01Props = {
    author: {
        name: "Dorian Baffier",
        username: "dorian_baffier",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png",
        timeAgo: "2h ago",
    },
    content: {
        text: "Just launched CodeSnippet UI! Check out the documentation and let me know what you think 🎨",
        link: {
            title: "CodeSnippet UI Documentation",
            description: "A comprehensive guide to CodeSnippet UI",
            icon: <LinkIcon className="w-5 h-5 text-blue-500" />,
        },
    },
    engagement: {
        likes: 128,
        comments: 32,
        shares: 24,
        isLiked: true,
        isBookmarked: false,
    },
};

export default function Card_01({
    author = defaultProps.author,
    content = defaultProps.content,
    engagement = defaultProps.engagement,
    onLike,
    onComment,
    onShare,
    onBookmark,
}: Card01Props) {
    return (
        <div
            className={cn(
                "w-full max-w-2xl mx-auto",
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl",
                "border border-zinc-200/50 dark:border-zinc-800/50",
                "rounded-3xl shadow-lg",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
                "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
                "hover:translate-y-[-2px]"
            )}
        >
            <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                <div className="p-7">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    src={author?.avatar}
                                    alt={author?.name}
                                    className={cn(
                                        "w-11 h-11 rounded-full",
                                        "ring-2 ring-white dark:ring-zinc-800",
                                        "object-cover",
                                        "transition-transform duration-300",
                                        "group-hover:scale-105"
                                    )}
                                />
                                <div className="absolute inset-0 rounded-full bg-linear-to-tr from-rose-500 to-blue-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
                            </div>
                            <div>
                                <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                                    {author?.name}
                                </h3>
                                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 tracking-tight">
                                    @{author?.username} · {author?.timeAgo}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={cn(
                                "p-2 rounded-full",
                                "transition-all duration-200",
                                "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                                "active:bg-zinc-200 dark:active:bg-zinc-700",
                                "focus:outline-hidden focus:ring-2 focus:ring-zinc-500/20"
                            )}
                        >
                            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>

                    <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 mb-5">
                        {content?.text}
                    </p>

                    {content?.link && (
                        <div
                            className={cn(
                                "mb-5 rounded-2xl",
                                "border border-zinc-200/80 dark:border-zinc-700/80",
                                "overflow-hidden group cursor-pointer",
                                "transition-all duration-300",
                                "hover:border-zinc-300 dark:hover:border-zinc-600",
                                "hover:shadow-md hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
                                "hover:translate-y-[-1px]"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-5",
                                    "bg-linear-to-b from-zinc-50/50 to-white dark:from-zinc-800/30 dark:to-zinc-800/50",
                                    "group-hover:from-zinc-100/50 group-hover:to-zinc-50/50",
                                    "dark:group-hover:from-zinc-800/50 dark:group-hover:to-zinc-800/70",
                                    "transition-colors duration-300"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/80 dark:bg-zinc-700/80 rounded-xl shadow-xs backdrop-blur-xs">
                                        {content?.link.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100 mb-0.5">
                                            {content?.link.title}
                                        </h4>
                                        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                                            {content?.link.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-6">
                            <button
                                type="button"
                                onClick={onLike}
                                className={cn(
                                    "flex items-center gap-2.5 text-[13px] font-medium p-2.5 rounded-full",
                                    "transition-all duration-300",
                                    "hover:bg-rose-50/80 dark:hover:bg-rose-950/30",
                                    "active:bg-rose-100 dark:active:bg-rose-950/50",
                                    "focus:outline-hidden focus:ring-2 focus:ring-rose-500/20",
                                    engagement?.isLiked
                                        ? "text-rose-600"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-rose-600"
                                )}
                            >
                                <Heart
                                    className={cn(
                                        "w-[18px] h-[18px]",
                                        "transition-all duration-300",
                                        "hover:scale-110",
                                        "active:scale-95",
                                        engagement?.isLiked && "fill-current"
                                    )}
                                />
                                <span>{engagement?.likes}</span>
                            </button>
                            <button
                                type="button"
                                onClick={onComment}
                                className={cn(
                                    "flex items-center gap-2.5 text-[13px] font-medium p-2.5 rounded-full",
                                    "transition-all duration-300",
                                    "hover:bg-blue-50/80 dark:hover:bg-blue-950/30",
                                    "active:bg-blue-100 dark:active:bg-blue-950/50",
                                    "focus:outline-hidden focus:ring-2 focus:ring-blue-500/20",
                                    "text-zinc-500 dark:text-zinc-400 hover:text-blue-500"
                                )}
                            >
                                <MessageCircle className="w-[18px] h-[18px] transition-transform duration-300 hover:scale-110" />
                                <span>{engagement?.comments}</span>
                            </button>
                            <button
                                type="button"
                                onClick={onShare}
                                className={cn(
                                    "flex items-center gap-2.5 text-[13px] font-medium p-2.5 rounded-full",
                                    "transition-all duration-300",
                                    "hover:bg-green-50/80 dark:hover:bg-green-950/30",
                                    "active:bg-green-100 dark:active:bg-green-950/50",
                                    "focus:outline-hidden focus:ring-2 focus:ring-green-500/20",
                                    "text-zinc-500 dark:text-zinc-400 hover:text-green-500"
                                )}
                            >
                                <Share2 className="w-[18px] h-[18px] transition-transform duration-300 hover:scale-110" />
                                <span>{engagement?.shares}</span>
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={onBookmark}
                            className={cn(
                                "p-2.5 rounded-full",
                                "transition-all duration-300",
                                "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                                "active:bg-zinc-200 dark:active:bg-zinc-700",
                                "focus:outline-hidden focus:ring-2 focus:ring-zinc-500/20",
                                engagement?.isBookmarked
                                    ? "text-zinc-900 dark:text-zinc-100"
                                    : "text-zinc-400"
                            )}
                        >
                            <Bookmark
                                className={cn(
                                    "w-[18px] h-[18px]",
                                    "transition-all duration-300",
                                    "hover:scale-110",
                                    "active:scale-95",
                                    engagement?.isBookmarked && "fill-current"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
