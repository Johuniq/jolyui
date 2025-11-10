import { cn } from "@/lib/utils";
import PreviewContent from "./preview-content";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
  isPremium?: boolean;
  link: string;
  useIframe?: boolean;
  height?: string;
  compact?: boolean;
  comment?: string[];
  isBlock?: boolean;
}

const prePath = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://ui.codesnipet.com";

export function Preview({
  children,
  className = "",
  link,
  useIframe = false,
  compact = false,
  comment = [],
  isBlock = false,
}: PreviewProps) {
  console.log(prePath + link);
  return (
    <>
      <div className={cn("w-full overflow-hidden", className)}>
        <PreviewContent link={link} prePath={prePath} isBlock={isBlock} />

        {useIframe ? (
          <div className="w-full my-4 border rounded-2xl border-zinc-400 dark:border-zinc-700">
            <div className="relative w-full h-[100dvh] overflow-hidden">
              <iframe
                title={link}
                src={`${prePath}/preview/${link}`}
                className="w-full h-full overflow-y-auto list-none"
                style={{
                  border: "none",
                  transform: "scale(0.95)",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "p-2 md:p-8 flex justify-center items-center relative border rounded-2xl my-4 border-zinc-400 dark:border-zinc-800 not-prose",
              compact ? "min-h-[100px]" : "min-h-[400px]",
              isBlock ? "md:p-0" : ""
            )}
          >
            {children}
          </div>
        )}
        {comment.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {comment.map((text, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm font-medium bg-purple-100 dark:bg-purple-950/30 rounded-lg text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-xs hover:bg-purple-200/70 dark:hover:bg-purple-950/50 transition-colors"
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
