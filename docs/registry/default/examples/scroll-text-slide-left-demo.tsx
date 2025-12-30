import { ScrollText } from "@/registry/default/ui/scroll-text";

export default function ScrollTextSlideLeftDemo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <ScrollText effect="slideLeft" className="font-bold text-4xl">
        Slide Left Animation
      </ScrollText>
    </div>
  );
}
