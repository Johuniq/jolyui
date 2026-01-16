import {
  HoverPreviewLink,
  HoverPreviewProvider,
} from "@/registry/default/ui/hover-preview"

const productData = {
  laptop: {
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=560&h=320&fit=crop",
    title: "MacBook Pro",
    subtitle: "Apple M3 Pro chip, 18GB RAM, 512GB SSD",
  },
  headphones: {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=560&h=320&fit=crop",
    title: "Sony WH-1000XM5",
    subtitle: "Industry-leading noise cancellation",
  },
  camera: {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=560&h=320&fit=crop",
    title: "Sony A7 IV",
    subtitle: "Full-frame mirrorless camera",
  },
  watch: {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=560&h=320&fit=crop",
    title: "Apple Watch Ultra",
    subtitle: "The most rugged Apple Watch ever",
  },
}

export default function HoverPreviewProductDemo() {
  return (
    <HoverPreviewProvider data={productData} className="p-8">
      <div className="max-w-3xl">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Top Picks This Week</h2>
        <ul className="space-y-3 text-lg text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <HoverPreviewLink previewKey="laptop">MacBook Pro</HoverPreviewLink>
            <span className="text-sm">- Starting at $1,999</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <HoverPreviewLink previewKey="headphones">Sony WH-1000XM5</HoverPreviewLink>
            <span className="text-sm">- $349</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <HoverPreviewLink previewKey="camera">Sony A7 IV</HoverPreviewLink>
            <span className="text-sm">- $2,498</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">→</span>
            <HoverPreviewLink previewKey="watch">Apple Watch Ultra</HoverPreviewLink>
            <span className="text-sm">- $799</span>
          </li>
        </ul>
      </div>
    </HoverPreviewProvider>
  )
}
