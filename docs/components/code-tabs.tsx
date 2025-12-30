"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { CopyButton } from "@/components/copy-button";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  type TabsProps,
  TabsTrigger,
} from "@/components/radix-tabs";
import { cn } from "@/lib/utils";

type CodeTabsProps = {
  codes: Record<string, string>;
  lang?: string;
  themes?: { light: string; dark: string };
  copyButton?: boolean;
  onCopiedChange?: (copied: boolean, content?: string) => void;
} & Omit<TabsProps, "children">;

function CodeTabs({
  codes,
  lang = "bash",
  themes = {
    light: "github-light",
    dark: "github-dark",
  },
  className,
  defaultValue,
  value,
  onValueChange,
  copyButton = true,
  onCopiedChange,
  ...props
}: CodeTabsProps) {
  const { resolvedTheme } = useTheme();

  const [highlightedCodes, setHighlightedCodes] = React.useState<Record<
    string,
    string
  > | null>(null);
  const [selectedCode, setSelectedCode] = React.useState<string>(
    value ?? defaultValue ?? Object.keys(codes)[0] ?? "",
  );

  React.useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const newHighlightedCodes: Record<string, string> = {};

        for (const [command, val] of Object.entries(codes)) {
          const highlighted = await codeToHtml(val, {
            lang,
            themes: {
              light: themes.light,
              dark: themes.dark,
            },
            defaultColor: resolvedTheme === "dark" ? "dark" : "light",
          });

          newHighlightedCodes[command] = highlighted;
        }

        setHighlightedCodes(newHighlightedCodes);
      } catch (error) {
        console.error("Error highlighting codes", error);
        setHighlightedCodes(codes);
      }
    }
    loadHighlightedCode();
  }, [resolvedTheme, lang, themes.light, themes.dark, codes]);

  return (
    <Tabs
      data-slot="install-tabs"
      className={cn(
        "w-full gap-0 overflow-hidden rounded-xl bg-accent",
        className,
      )}
      {...props}
      value={selectedCode}
      onValueChange={(val) => {
        setSelectedCode(val);
        onValueChange?.(val);
      }}
    >
      <TabsHighlight className="absolute inset-0 z-0 rounded-none bg-transparent shadow-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-t-full after:bg-black after:content-[''] dark:after:bg-white">
        <TabsList
          data-slot="install-tabs-list"
          className="relative flex h-10 w-full items-center justify-between rounded-none py-0 pr-4.5 pl-5 text-current"
        >
          <div className="flex h-full gap-x-3">
            {highlightedCodes &&
              Object.keys(highlightedCodes).map((code) => (
                <TabsHighlightItem
                  key={code}
                  value={code}
                  className="flex items-center justify-center"
                >
                  <TabsTrigger
                    key={code}
                    value={code}
                    className="h-full px-0 font-medium text-muted-foreground text-sm data-[state=active]:text-current"
                  >
                    {code}
                  </TabsTrigger>
                </TabsHighlightItem>
              ))}
          </div>

          {copyButton && highlightedCodes && (
            <CopyButton
              content={codes[selectedCode]!}
              size="sm"
              variant="ghost"
              className="-me-2.5 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
              onCopiedChange={onCopiedChange}
            />
          )}
        </TabsList>
      </TabsHighlight>

      <div className="px-1.5 pb-1.5">
        <TabsContents
          data-slot="install-tabs-contents"
          className="rounded-md bg-background"
        >
          {highlightedCodes &&
            Object.entries(highlightedCodes).map(([code, val]) => (
              <TabsContent
                data-slot="install-tabs-content"
                key={code}
                className="w-full"
                value={code}
              >
                <div
                  className="[&>pre,_&_code]:!bg-transparent [&_code_.line]:!px-0 [&_code]:!text-[13px] flex w-full items-center overflow-auto p-4 text-sm [&>pre,_&_code]:border-none [&>pre,_&_code]:[background:transparent_!important]"
                  dangerouslySetInnerHTML={{ __html: val }}
                />
              </TabsContent>
            ))}
        </TabsContents>
      </div>
    </Tabs>
  );
}

export { CodeTabs, type CodeTabsProps };
