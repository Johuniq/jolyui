import FallingText from "@/registry/default/ui/falling-text";

export default function FallingTextDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <FallingText
        text="Jolyui makes building interfaces fun and interactive"
        highlightWords={["Jolyui", "fun", "interactive"]}
        trigger="auto"
        fontSize="2rem"
      />
    </div>
  );
}
