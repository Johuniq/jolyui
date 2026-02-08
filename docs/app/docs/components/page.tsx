import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/notebook/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { source } from "@/lib/source";

export default function ComponentsPage() {
  const page = source.getPage(["components"]);

  if (!page) {
    notFound();
  }

  const pages = source.getPages();
  const components = pages.filter(
    (page) =>
      page.slugs && page.slugs[0] === "components" && page.slugs.length > 2,
  );

  // Group by category (slugs[1])
  const categories = components.reduce(
    (acc, page) => {
      if (!page.slugs) return acc;
      const category = page.slugs[1];
      if (!category) return acc;

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(page);
      return acc;
    },
    {} as Record<string, typeof components>,
  );

  // Sort categories and pages
  const sortedCategories = Object.keys(categories).sort();

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <div className="space-y-16">
          {sortedCategories.map((category) => {
            const categoryTitle =
              category.charAt(0).toUpperCase() +
              category.slice(1).replace(/-/g, " ");

            return (
              <div key={category}>
                <h2 className="mb-6 font-bold text-2xl">{categoryTitle}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categories[category]?.map((p) => (
                    <Link
                      key={p.url}
                      href={p.url}
                      className="no-underline transition-opacity hover:opacity-80"
                    >
                      <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                        <CardHeader>
                          <CardTitle>{p.data.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {p.data.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DocsBody>
    </DocsPage>
  );
}
