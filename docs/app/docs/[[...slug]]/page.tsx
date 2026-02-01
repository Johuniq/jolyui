import { CopyMarkdownButton, ViewOptions } from "@/components/doc-actions";
import { DynamicLink } from "@/components/dynamic-link";
import { Feedback } from "@/components/feedback";
import { Mdx } from "@/components/mdx-components";
import { Separator } from "@/components/ui/separator";
import { onRateAction } from "@/lib/on-rate-action";
import { source } from "@/lib/source";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
    EditOnGitHub,
    PageLastUpdate,
} from "fumadocs-ui/layouts/notebook/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  // Determine if this is a component page for better keyword targeting
  const isComponentPage = params.slug?.[0] === "components";
  const componentKeywords = isComponentPage
    ? [
        `${page.data.title} component`,
        `react ${page.data.title}`,
        `${page.data.title} shadcn`,
        `${page.data.title} tailwind`,
        `${page.data.title} ui`,
      ]
    : [];

  return {
    title: page.data.title || "JolyUI",
    description: page.data.description,
    keywords: [
      page.data.title,
      "react component",
      "shadcn ui",
      "tailwind css",
      "accessible",
      ...componentKeywords,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${page.data.title} | Joly UI`,
      description: page.data.description,
      url: pageUrl,
      type: "article",
      siteName: "Joly UI",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${page.data.title} - Joly UI Component`,
        },
      ],
      ...(page.data.lastModified && {
        publishedTime: new Date(page.data.lastModified).toISOString(),
        modifiedTime: new Date(page.data.lastModified).toISOString(),
      }),
      authors: ["johuniq"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | Joly UI`,
      description: page.data.description,
      images: [ogImage],
      creator: "@johuniq",
      site: "@johuniq",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function DocPage(props: DocPageParams) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const docLink = undefined; // page.data.links?.doc;
  const apiLink = undefined; // page.data.links?.api;
  const lastModifiedTime = page.data.lastModified;
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

  // TechArticle schema for component documentation
  const isComponentPage = params.slug?.[0] === "components";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": isComponentPage ? "TechArticle" : "Article",
    headline: page.data.title,
    description: page.data.description,
    url: `https://jolyui.dev${page.url}`,
    image: `https://jolyui.dev/api/og?title=${encodeURIComponent(page.data.title || "JolyUI")}`,
    author: {
      "@type": "Person",
      name: "johuniq",
      url: "https://johuniq.tech",
    },
    publisher: {
      "@type": "Organization",
      name: "Joly UI",
      logo: {
        "@type": "ImageObject",
        url: "https://jolyui.dev/icon.png",
      },
    },
    ...(lastModifiedTime && {
      datePublished: new Date(lastModifiedTime).toISOString(),
      dateModified: new Date(lastModifiedTime).toISOString(),
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jolyui.dev${page.url}`,
    },
    ...(isComponentPage && {
      proficiencyLevel: "Beginner",
      dependencies: "React, Tailwind CSS, shadcn/ui",
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <DocsPage
        toc={page.data.toc}
        tableOfContent={{ style: "clerk" }}
        full={page.data.full}
      >
        <div className="flex flex-col gap-2">
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription className="mb-2.5">
            {page.data.description}
          </DocsDescription>
          {lastModifiedTime && <PageLastUpdate date={lastModifiedTime} />}
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
