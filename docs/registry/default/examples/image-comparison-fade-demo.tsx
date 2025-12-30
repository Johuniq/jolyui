import { ImageComparisonFade } from "@/registry/default/ui/image-comparison";

export default function ImageComparisonFadeDemo() {
  return (
    <ImageComparisonFade
      beforeImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop&sat=-100"
      afterImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop"
      beforeLabel="Before"
      afterLabel="After"
      className="aspect-[3/2] w-full"
    />
  );
}
