import { ScrollText } from "@/registry/default/ui/scroll-text";

export default function ScrollTextRotateDemo() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <ScrollText effect="rotate" className="font-bold text-4xl">
        Rotate Animation
      </ScrollText>
    </div>
  );
}
