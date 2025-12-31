import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopyMarkdownButton, ViewOptions } from "@/components/doc-actions";
import { DynamicLink } from "@/components/dynamic-link";
import { Feedback } from "@/components/feedback";
import { Mdx } from "@/components/mdx-components";
import { Separator } from "@/components/ui/separator";
import { onRateAction } from "@/lib/on-rate-action";
import { source } from "@/lib/source";

interface DocPageParams {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(
  props: DocPageParams,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) return {};

  const pageUrl = `https://jolyui.dev${page.url}`;
  const ogImage = `https://jolyui.dev/api/og?title=${encodeURIComponent(page.data.title || "JolyUI")}`;

  return {
    title: page.data.title || "JolyUI",
    description: page.data.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  };
}

export default async function DocPage(props: DocPageParams) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const docLink = undefined; // page.data.links?.doc;
  const apiLink = undefined; // page.data.links?.api;

  // Breadcrumb structured data
  const breadcrumbItems = [
    { name: "Home", url: "https://jolyui.dev" },
    { name: "Docs", url: "https://jolyui.dev/docs" },
  ];

  if (params.slug && params.slug.length > 0) {
    params.slug.forEach((slug, index) => {
      const url = `https://jolyui.dev/docs/${params.slug?.slice(0, index + 1).join("/")}`;
      breadcrumbItems.push({
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
        url,
      });
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DocsPage>
        <div className="flex flex-col gap-2">
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription className="mb-2.5">
            {page.data.description}
          </DocsDescription>
          <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
            {docLink ? <DynamicLink href={docLink}>Docs</DynamicLink> : null}
            {apiLink ? <DynamicLink href={apiLink}>API</DynamicLink> : null}
            {(docLink || apiLink) && (
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-6"
              />
            )}
            <EditOnGitHub
              className="border-0 [&_svg]:text-fd-muted-foreground"
              href={`https://github.com/Johuniq/jolyui/tree/main/docs/content/docs/${params.slug ? `${params.slug.join("/")}.mdx` : "index.mdx"}`}
            />
            <CopyMarkdownButton markdownUrl={`${page.url}.mdx`} />
            <ViewOptions
              markdownUrl={`${page.url}.mdx`}
              githubUrl={`https://github.com/johuniq/jolyui/blob/main/docs/content/docs/${page.path}`}
            />
          </div>
        </div>
        <DocsBody>
          <Mdx page={page} />
        </DocsBody>
        <Feedback onRateAction={onRateAction} />
      </DocsPage>
    </>
  );
}
