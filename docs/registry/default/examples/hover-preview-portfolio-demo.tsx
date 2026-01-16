import {
  HoverPreviewLink,
  HoverPreviewProvider,
} from "@/registry/default/ui/hover-preview"

const portfolioData = {
  project1: {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=560&h=320&fit=crop",
    title: "E-Commerce Platform",
    subtitle: "Full-stack Next.js application with Stripe integration",
  },
  project2: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=560&h=320&fit=crop",
    title: "Analytics Dashboard",
    subtitle: "Real-time data visualization with D3.js",
  },
  project3: {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=560&h=320&fit=crop",
    title: "Developer Tools",
    subtitle: "CLI utilities and VS Code extensions",
  },
  project4: {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=560&h=320&fit=crop",
    title: "Mobile App",
    subtitle: "Cross-platform React Native application",
  },
}

export default function HoverPreviewPortfolioDemo() {
  return (
    <HoverPreviewProvider data={portfolioData} className="p-8">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Check out my recent work including the{" "}
          <HoverPreviewLink previewKey="project1">E-Commerce Platform</HoverPreviewLink>,
          a comprehensive{" "}
          <HoverPreviewLink previewKey="project2">Analytics Dashboard</HoverPreviewLink>,
          various{" "}
          <HoverPreviewLink previewKey="project3">Developer Tools</HoverPreviewLink>,
          and a cross-platform{" "}
          <HoverPreviewLink previewKey="project4">Mobile App</HoverPreviewLink>.
        </p>
      </div>
    </HoverPreviewProvider>
  )
}
