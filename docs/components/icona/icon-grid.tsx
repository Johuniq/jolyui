"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";

interface Icon {
  name: string;
  svg: string;
  width: number;
  height: number;
  category?: string;
  categoryDisplay?: string;
}

interface IconGridProps {
  icons: Icon[];
  onIconClick: (icon: Icon) => void;
}

export function IconGrid({ icons, onIconClick }: IconGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {icons.map((icon) => (
        <IconCard
          key={icon.name}
          icon={icon}
          onClick={() => onIconClick(icon)}
        />
      ))}
    </div>
  );
}

interface IconCardProps {
  icon: Icon;
  onClick: () => void;
}

function IconCard({ icon, onClick }: IconCardProps) {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${icon.width}" height="${icon.height}" viewBox="0 0 ${icon.width} ${icon.height}">${icon.svg}</svg>`;

    try {
      await navigator.clipboard.writeText(svgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "group relative aspect-square rounded-lg border bg-card p-4",
              "flex flex-col items-center justify-center gap-2",
              "cursor-pointer transition-all duration-200",
              "hover:border-primary hover:bg-accent hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            onClick={onClick}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }}
          >
            {/* Icon */}
            <div className="flex w-full flex-1 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={icon.width}
                height={icon.height}
                viewBox={`0 0 ${icon.width} ${icon.height}`}
                className="h-12 w-12 text-foreground transition-transform group-hover:scale-110"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                dangerouslySetInnerHTML={{ __html: icon.svg }}
              />
            </div>

            {/* Icon Name */}
            <div className="w-full truncate px-1 text-center text-muted-foreground text-xs">
              {icon.name}
            </div>

            {/* Category Badge (for global search) */}
            {icon.categoryDisplay && (
              <div className="absolute top-2 left-2 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-md bg-primary/90 px-2 py-0.5 font-medium text-[10px] text-primary-foreground shadow-lg backdrop-blur-sm">
                  {icon.categoryDisplay}
                </div>
              </div>
            )}

            {/* Copy Button */}
            {showActions && (
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-200",
                  copied && "text-green-500",
                )}
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy SVG"}
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to edit • Right click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
