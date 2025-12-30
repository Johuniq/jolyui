import { ScrollText } from "@/registry/default/ui/scroll-text";

export default function ScrollTextBlurDemo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <ScrollText effect="blur" className="font-bold text-4xl">
        Blur Animation
      </ScrollText>
    </div>
  );
}
