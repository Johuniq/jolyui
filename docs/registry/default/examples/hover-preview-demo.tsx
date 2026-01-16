import {
  HoverPreviewLink,
  HoverPreviewProvider,
} from "@/registry/default/ui/hover-preview"

const previewData = {
  midjourney: {
    image: "https://images.unsplash.com/photo-1695144244472-a4543101ef35?w=560&h=320&fit=crop",
    title: "Midjourney",
    subtitle: "Create stunning AI-generated artwork",
  },
  stable: {
    image: "https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=560&h=320&fit=crop",
    title: "Stable Diffusion",
    subtitle: "Open-source generative AI model",
  },
  leonardo: {
    image: "https://images.unsplash.com/photo-1718241905696-cb34c2c07bed?w=560&h=320&fit=crop",
    title: "Leonardo AI",
    subtitle: "Production-ready creative assets",
  },
}

export default function HoverPreviewDemo() {
  return (
    <HoverPreviewProvider data={previewData} className="p-8">
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Explore{" "}
        <HoverPreviewLink previewKey="midjourney">Midjourney</HoverPreviewLink>{" "}
        for breathtaking AI-generated artwork and illustrations. For open-source
        freedom try{" "}
        <HoverPreviewLink previewKey="stable">Stable Diffusion</HoverPreviewLink>{" "}
        or generate production assets with{" "}
        <HoverPreviewLink previewKey="leonardo">Leonardo AI</HoverPreviewLink>.
      </p>
    </HoverPreviewProvider>
  )
}
