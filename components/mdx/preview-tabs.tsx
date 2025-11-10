"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import * as React from "react";

export function PreviewTabs({
  preview,
  codeHtml,
  compact,
  isBlock,
}: {
  preview: React.ReactNode;
  codeHtml: React.ReactNode;
  compact?: boolean;
  isBlock?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);
  const codeRef = React.useRef<HTMLDivElement>(null);

  async function handleCopy() {
    if (!codeRef.current) return;
    // Extract plain text from HTML inside code block
    const text = codeRef.current.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }

  return (
    <Tabs defaultValue="preview" className="mt-4">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">{preview}</TabsContent>

      <TabsContent value="code">
        <div className="relative my-4 not-prose">
          {/* Copy Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 z-10 h-8 w-8 rounded-md"
            onClick={handleCopy}
          >
            {copied ? (
              <span className="text-xs font-medium text-green-500">✓</span>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>

          <div className="w-full overflow-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div
              ref={codeRef}
              className="p-4 [&_*]:text-sm [&_*]:leading-[10px]"
            >
              {codeHtml}
              {/* contains <pre class="shiki"><code>…<span class="line">… */}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
