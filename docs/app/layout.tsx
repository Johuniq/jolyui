import { Providers } from "@/components/providers";
import { ReactScan } from "@/components/react-scan";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Databuddy } from "@databuddy/sdk/react";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import type * as React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Beautiful React Components | Free UI Library`,
    template: `%s | ${siteConfig.name}`,
  },
  category: "technology",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - Beautiful React Components`,
    description: siteConfig.longDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.description}`,
        type: "image/png",
        secureUrl: `${siteConfig.url}/opengraph-image.png`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.longDescription,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: siteConfig.author.twitter,
    site: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteConfig.url,
  },
  referrer: "origin-when-cross-origin",
  other: {
    "google-site-verification": "aMge83vXxVisFvKFhWT-omdQLHLuI04VK1ZSHBJP83U",
    "msvalidate.01": "117FCF20377F6D1208898A5975FB202C",
    "yandex-verification": "41d61d50cc2a5e88",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      description: siteConfig.longDescription,
      url: siteConfig.url,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/icon.png`,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/docs?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      description: siteConfig.longDescription,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: siteConfig.url,
      image: `${siteConfig.url}/opengraph-image.png`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "150",
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      author: {
        "@type": "Person",
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.png`,
      sameAs: [siteConfig.links.github, siteConfig.links.x],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Developer Support",
        url: siteConfig.links.github,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Joly UI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Joly UI is a free, open-source collection of beautifully designed React components built on shadcn/ui and Radix UI. It provides accessible, customizable UI components for React and Next.js projects.",
          },
        },
        {
          "@type": "Question",
          name: "Is Joly UI free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Joly UI is completely free and open source. You can use it in personal and commercial projects without any cost.",
          },
        },
        {
          "@type": "Question",
          name: "How do I install Joly UI components?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can install Joly UI components using the CLI or by copying the component code directly into your project. Simply run the CLI command or copy-paste the component code from the documentation.",
          },
        },
        {
          "@type": "Question",
          name: "Does Joly UI work with Next.js?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Joly UI is fully compatible with Next.js, including the latest versions. All components are designed to work seamlessly with both React and Next.js applications.",
          },
        },
      ],
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://assets.onedollarstats.com" />
        <meta
          name="theme-color"
          content="#1da1f2"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0a0a0a"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="google-site-verification"
          content="aMge83vXxVisFvKFhWT-omdQLHLuI04VK1ZSHBJP83U"
        />
        <meta name="msvalidate.01" content="117FCF20377F6D1208898A5975FB202C" />
        <meta name="yandex-verification" content="41d61d50cc2a5e88" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FTPBGQYHF7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FTPBGQYHF7');
          `}
        </Script>
      </head>
      <body
        className={cn(
          "isolate min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Script
          defer
          data-site-id="jolyui.dev"
          src="https://assets.onedollarstats.com/tracker.js"
        />
        <TailwindIndicator />
        <Toaster />
        <ReactScan />
        <Providers
          theme={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
        >
          {children}
          <Analytics />
          <Databuddy clientId="D0oKAXYLs73J3RyJh4Gt-" enableBatching={true} />
        </Providers>
      </body>
    </html>
  );
}
