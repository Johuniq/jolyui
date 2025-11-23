import XIcon from "@/components/icons/x-icon";
import { GitHubStarsButton } from "@/components/landing/github-star-button";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
       <Logo/>
      </>
    ),
  },
  links: [
    {
      type: "icon",
      url: siteConfig.links.github,
      text: "Github",
      icon: <GitHubStarsButton username="johuniq" repo="jolyui"/>,
      external: true,
    },
        {
      type: "icon",
      url: siteConfig.links.x,
      text: "X",
      icon: <div >
        <XIcon className="size-5" />
      </div>,
      external: true,
    },
    {
      type: "main",
      url: "https://sweep.jolyui.dev/ref=jolyui",
      text: (
        <span className="flex items-center gap-2">
          Gradient Generator
          <span className="text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 rounded-lg px-1 py-0.5 text-[10px]">
            New
          </span>
        </span>
      ),
      external: true, 
    },
    {
      type: "main",
      url: "https://www.jolyui.dev/llms-full.txt",
      text: "llms-full.txt",
      external: true,
    }
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: {
    defaultOpenLevel: 1,
  },
};
