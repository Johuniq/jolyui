import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";

export const metadata: Metadata = {
  title: {
    template: "%s | JolyUI - Free UI Components to build beautiful websites",
    default: "JolyUI - Free UI Components to build beautiful websites",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
