import { CodeBlock } from "@/registry/default/ui/code-block";

const code = `function calculateSum(a: number, b: number): number {
  return a + b;
}`;

export default function CodeBlockVariantsDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-8">
      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Default</h3>
        <CodeBlock code={code} language="typescript" variant="default" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Terminal</h3>
        <CodeBlock code={code} language="typescript" variant="terminal" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Minimal</h3>
        <CodeBlock code={code} language="typescript" variant="minimal" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Gradient</h3>
        <CodeBlock code={code} language="typescript" variant="gradient" />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Glass</h3>
        <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-8">
          <CodeBlock code={code} language="typescript" variant="glass" />
        </div>
      </div>
    </div>
  );
}
