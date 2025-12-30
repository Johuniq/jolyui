import { ScrollText } from "@/registry/default/ui/scroll-text";

export default function ScrollTextDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-32 py-20">
      <ScrollText effect="fadeUp" className="font-bold text-4xl">
        Fade Up Animation
      </ScrollText>

      <ScrollText effect="blur" className="font-bold text-4xl">
        Blur Animation
      </ScrollText>

      <ScrollText effect="scale" className="font-bold text-4xl">
        Scale Animation
      </ScrollText>

      <ScrollText effect="rotate" className="font-bold text-4xl">
        Rotate Animation
      </ScrollText>

      <ScrollText effect="slideLeft" className="font-bold text-4xl">
        Slide Left Animation
      </ScrollText>
    </div>
  );
}
