import { ImageComparison } from "@/registry/default/ui/image-comparison";

export default function ImageComparisonVerticalDemo() {
  return (
    <div className="mx-auto max-w-md">
      <ImageComparison
        beforeImage="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=700&fit=crop&sat=-100"
        afterImage="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=700&fit=crop"
        beforeLabel="Top"
        afterLabel="Bottom"
        orientation="vertical"
        className="aspect-[3/4] w-full"
      />
    </div>
  );
}
