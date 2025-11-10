import { HeaderPro } from "@/components/landing/header-pro";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Flame } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center">
        <Flame className="mr-2 h-5 w-5 text-green-600" />
        <span className="hidden md:inline-flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
          JolyUI
        </span>
      </div>
    ),
  },
  links: [
    {
      text: "Pricing",
      url: "/pricing",
    },

    {
      type: "custom",
      children: <HeaderPro />,
    },
  ],
};
