import type { DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import XIcon from "@/components/icons/x-icon";
import { GitHubStarsButton } from "@/components/landing/github-star-button";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Logo />
      </>
    ),
  },
  links: [
    {
      type: "icon",
      url: siteConfig.links.github,
      text: "Github",
      icon: <GitHubStarsButton username="johuniq" repo="jolyui" />,
      external: true,
    },
    {
      type: "icon",
      url: siteConfig.links.x,
      text: "X",
      icon: (
        <div>
          <XIcon className="size-5" />
        </div>
      ),
      external: true,
    },
    {
      type: "main",
      url: "https://sweep.jolyui.dev?ref=jolyui",
      text: "Gradient Generator",
      external: true,
    },
    {
      type: "main",
      url: "https://formkitcn.jolyui.dev?ref=jolyui",
      text: "Form Builder",
      external: true,
    },
    {
      type: "main",
      url: "https://www.jolyui.dev/llms-full.txt",
      text: "llms-full.txt",
      external: true,
    },
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: {
    defaultOpenLevel: 3,
  },
};
