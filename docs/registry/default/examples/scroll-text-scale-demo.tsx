import { ScrollText } from "@/registry/default/ui/scroll-text";

export default function ScrollTextScaleDemo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <ScrollText effect="scale" className="font-bold text-4xl">
        Scale Animation
      </ScrollText>
    </div>
  );
}
