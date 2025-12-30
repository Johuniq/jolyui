import { ImageComparison } from "@/registry/default/ui/image-comparison";

export default function ImageComparisonDemo() {
  return (
    <ImageComparison
      beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&sat=-100"
      afterImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop"
      beforeLabel="Grayscale"
      afterLabel="Color"
      className="aspect-video w-full"
    />
  );
}
