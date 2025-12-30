import { BadgeCheck, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TweetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  metrics?: {
    replies?: number;
    retweets?: number;
    likes?: number;
  };
  liked?: boolean;
  onLike?: () => void;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

const TweetCard = React.forwardRef<HTMLDivElement, TweetCardProps>(
  (
    {
      className,
      author,
      content,
      timestamp,
      metrics = {},
      liked = false,
      onLike,
      ...props
    },
    ref,
  ) => {
    const [isLiked, setIsLiked] = React.useState(liked);
    const [likeCount, setLikeCount] = React.useState(metrics.likes || 0);

    const handleLike = () => {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      onLike?.();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "tweet-card group relative w-full max-w-xl rounded-2xl border border-tweet-border bg-tweet p-4 transition-all duration-300",
          "hover:scale-[1.02] hover:border-tweet-border-hover hover:shadow-tweet-glow",
          "animate-tweet-enter",
          className,
        )}
        {...props}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tweet-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-tweet-border transition-all duration-300 group-hover:ring-tweet-accent/50"
              />
              <div className="-bottom-1 -right-1 absolute h-4 w-4 rounded-full bg-tweet-success opacity-0 ring-2 ring-tweet transition-all duration-300 group-hover:opacity-100" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-semibold text-tweet-foreground">
                  {author.name}
                </span>
                {author.verified && (
                  <BadgeCheck className="h-4 w-4 fill-tweet-accent text-tweet" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-tweet-muted">
                <span>@{author.handle}</span>
                <span>·</span>
                <span>{timestamp}</span>
              </div>
            </div>

            {/* X Logo */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-tweet-muted transition-colors duration-300 group-hover:fill-tweet-foreground"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>

          {/* Content */}
          <p className="mt-3 whitespace-pre-wrap text-tweet-foreground leading-relaxed">
            {content}
          </p>

          {/* Engagement */}
          <div className="mt-4 flex items-center justify-between text-tweet-muted">
            <button className="tweet-action group/action flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200 hover:bg-tweet-accent/10 hover:text-tweet-accent">
              <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover/action:scale-110" />
              <span className="text-sm">
                {formatNumber(metrics.replies || 0)}
              </span>
            </button>

            <button className="tweet-action group/action flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200 hover:bg-tweet-success/10 hover:text-tweet-success">
              <Repeat2 className="h-4 w-4 transition-transform duration-200 group-hover/action:scale-110" />
              <span className="text-sm">
                {formatNumber(metrics.retweets || 0)}
              </span>
            </button>

            <button
              onClick={handleLike}
              className={cn(
                "tweet-action group/action flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200",
                isLiked
                  ? "text-tweet-like"
                  : "hover:bg-tweet-like/10 hover:text-tweet-like",
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isLiked && "animate-like-pop fill-tweet-like",
                  "group-hover/action:scale-110",
                )}
              />
              <span className="text-sm">{formatNumber(likeCount)}</span>
            </button>

            <button className="tweet-action group/action flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200 hover:bg-tweet-accent/10 hover:text-tweet-accent">
              <Share className="h-4 w-4 transition-transform duration-200 group-hover/action:scale-110" />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

TweetCard.displayName = "TweetCard";

export { TweetCard };
