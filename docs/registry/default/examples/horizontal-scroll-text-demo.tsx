import { HorizontalScrollText } from "@/registry/default/ui/scroll-text";

export default function HorizontalScrollTextDemo() {
  return (
    <div className="w-full overflow-hidden py-20">
      <HorizontalScrollText
        className="font-black text-6xl uppercase"
        speed={0.5}
      >
        Scroll Text • Animation • Motion • React •
      </HorizontalScrollText>

      <div className="h-10" />

      <HorizontalScrollText
        className="font-black text-6xl text-primary uppercase"
        direction="right"
        speed={0.5}
      >
        Creative • Innovative • Dynamic • Powerful •
      </HorizontalScrollText>
    </div>
  );
}
