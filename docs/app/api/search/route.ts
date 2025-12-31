import { createSearchAPI } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createSearchAPI("simple", {
  indexes: source
    .getPages()
    .filter((page) => page.data.title)
    .map((page) => ({
      // biome-ignore lint/style/noNonNullAssertion: title is guaranteed by filter
      title: page.data.title!,
      description: page.data.description,
      url: page.url,
      id: page.url,
      content: page.data.description || "",
    })),
});
