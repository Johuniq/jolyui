import { ImageComparisonSplit } from "@/registry/default/ui/image-comparison";

export default function ImageComparisonSplitDemo() {
  return (
    <ImageComparisonSplit
      beforeImage="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=350&fit=crop&sat=-100"
      afterImage="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=350&fit=crop"
      beforeLabel="Original"
      afterLabel="Enhanced"
      className="aspect-[2/1] w-full"
      gap={8}
    />
  );
}
