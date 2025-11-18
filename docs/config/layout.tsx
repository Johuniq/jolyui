import XIcon from "@/components/icons/x-icon";
import { GitHubStarsButton } from "@/components/landing/github-star-button";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src={"/icon.png"} alt="Site Icon" width={28} height={28} />
        {/* <span className="font-bold text-xl font-bold">
          {siteConfig.name}
        </span> */}
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
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  sidebar: {
    defaultOpenLevel: 1,
  },
};
