import { HighlightText } from "@/registry/default/ui/highlight-text";

export default function HighlightTextColorsDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10">
      <div className="text-xl">
        Primary color:{" "}
        <HighlightText color="primary">Important text</HighlightText>
      </div>
      <div className="text-xl">
        Secondary color:{" "}
        <HighlightText color="secondary">Subtle detail</HighlightText>
      </div>
      <div className="text-xl">
        Accent color:{" "}
        <HighlightText color="accent">Special feature</HighlightText>
      </div>
      <div className="text-xl">
        Destructive color:{" "}
        <HighlightText color="destructive">Warning message</HighlightText>
      </div>
    </div>
  );
}
