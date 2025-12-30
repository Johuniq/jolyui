import { ImageComparisonHover } from "@/registry/default/ui/image-comparison";

export default function ImageComparisonHoverDemo() {
  return (
    <ImageComparisonHover
      beforeImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&sat=-100"
      afterImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
      beforeLabel="Original"
      afterLabel="Enhanced"
      className="aspect-[3/2] w-full"
    />
  );
}
