import { ScrollProgressText } from "@/registry/default/ui/scroll-text";

export default function ScrollProgressTextDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20">
      <ScrollProgressText
        text="As you scroll down, this text will light up character by character, creating a beautiful reading experience that guides the user's eye through the content."
        className="font-bold text-4xl leading-tight"
      />
    </div>
  );
}
