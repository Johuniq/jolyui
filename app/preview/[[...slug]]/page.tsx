import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// Arrays to categorize components
const CENTERED_COMPONENTS = [
  "alert",
  "ai-input",
  "button",
  "card",
  "faq",
  "input",
  "list",
  "pricing",
  "profile",
  "text",
  "checkout",
  "particle-button",
  "currency-transfer",
  "hand-written-title",
  "tweet-card",
  "action-search-bar",
  "blocks/ai-card-generation",
  "vercel-v0-chat",
  // Add more small components here
];

// const FULL_WIDTH_COMPONENTS = ["hero"];

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug.length) return notFound();

  const componentName = slug.join("/");

  try {
    const Component = dynamic(
      () =>
        import(`@/components/jolyui/${componentName}`).catch(() => notFound()),
      { ssr: true }
    );

    // Check if component should be centered
    const shouldCenter = CENTERED_COMPONENTS.some((component) =>
      componentName.startsWith(component)
    );

    return shouldCenter ? (
      <div className="min-h-screen flex items-center justify-center">
        <Component />
      </div>
    ) : (
      <Component />
    );
  } catch (error) {
    console.error("Error loading component:", error);
    // Handle the error gracefully
    // You can return a fallback UI or a not found page
    // For example, you can return a simple message or a custom 404 component
    return notFound();
  }
}
