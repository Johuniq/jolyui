import { ImageComparisonLens } from "@/registry/default/ui/image-comparison";

export default function ImageComparisonLensDemo() {
  return (
    <ImageComparisonLens
      beforeImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=450&fit=crop&sat=-100"
      afterImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=450&fit=crop"
      className="aspect-video w-full"
      lensSize={180}
    />
  );
}
