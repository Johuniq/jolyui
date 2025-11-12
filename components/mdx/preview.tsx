import { formatCode } from "@/lib/format";
import { highlight } from "@/lib/shared";
import { cn } from "@/lib/utils";
import PreviewContent from "./preview-content";
import { PreviewTabs } from "./preview-tabs";
import { ThemedCode } from "./themed-code";

interface PreviewProps {
  children: React.ReactNode;
  code?: string;
  isPremium?: boolean;
  className?: string;
  link: string;
  useIframe?: boolean;
  height?: string;
  compact?: boolean;
  comment?: string[];
  isBlock?: boolean;
}

const prePath = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export default async function Preview({
  children,
  code = "",
  isPremium = false,
  className = "",
  link,
  useIframe = false,
  compact = false,
  comment = [],
  isBlock = false,
}: PreviewProps) {
  const pretty = await formatCode(code ?? "", "tsx", 60);
  const lightEl = await highlight(pretty, "tsx", "light");
  const darkEl = await highlight(pretty, "tsx", "dark");

  const codeEl = <ThemedCode light={lightEl} dark={darkEl} />;

  const previewEl = useIframe ? (
    <div className="w-full my-4 border rounded-2xl border-zinc-400 dark:border-zinc-700">
      <div className="relative w-full h-[100dvh] overflow-hidden">
        <iframe
          title={link}
          src={`${prePath}/preview/${link.startsWith("/") ? link.slice(1) : link}`}
          className="w-full h-full overflow-y-auto list-none"
          style={{ border: "none", transform: "scale(0.95)" }}
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
  );

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {isPremium && (
        <div className="px-4 py-2 mb-4 text-sm font-medium bg-yellow-100 dark:bg-yellow-950/30 rounded-lg text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/50 shadow-xs hover:bg-yellow-200/70 dark:hover:bg-yellow-950/50 transition-colors">
          ⭐ This is a premium component. Please{" "}
          <a href="/pricing" className="underline">
            upgrade
          </a>{" "}
          to access it.
        </div>
      )}

      <PreviewContent link={link} prePath={prePath} />
      <PreviewTabs
        preview={previewEl}
        codeHtml={codeEl}
        compact={compact}
        isBlock={isBlock}
      />

      {comment?.length ? (
        <div className="flex flex-wrap gap-3 mt-6">
          {comment.map((text, i) => (
            <div
              key={i}
              className="px-4 py-2 text-sm font-medium bg-purple-100 dark:bg-purple-950/30 rounded-lg text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-xs hover:bg-purple-200/70 dark:hover:bg-purple-950/50 transition-colors"
            >
              {text}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
