import { ScrollText } from "@/registry/default/ui/scroll-text";

export default function ScrollTextFadeUpDemo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <ScrollText effect="fadeUp" className="font-bold text-4xl">
        Fade Up Animation
      </ScrollText>
    </div>
  );
}
