import { StickyScrollText } from "@/registry/default/ui/scroll-text";

export default function StickyScrollTextDemo() {
  return (
    <div className="w-full">
      <StickyScrollText height="150vh" effect="scale">
        <h2 className="text-center font-bold text-6xl">Scale Effect</h2>
      </StickyScrollText>

      <StickyScrollText height="150vh" effect="blur">
        <h2 className="text-center font-bold text-6xl">Blur Effect</h2>
      </StickyScrollText>

      <StickyScrollText height="150vh" effect="color">
        <h2 className="text-center font-bold text-6xl">Color Effect</h2>
      </StickyScrollText>
    </div>
  );
}
