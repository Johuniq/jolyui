import { CodeBlock } from "@/registry/default/ui/code-block";

const code = `// Wait for the animation...
console.log("Hello!");`;

export default function CodeBlockAnimationsDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-8 md:grid-cols-2">
      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Fade In</h3>
        <CodeBlock
          code={code}
          language="typescript"
          animation="fadeIn"
          key="fade"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Slide In</h3>
        <CodeBlock
          code={code}
          language="typescript"
          animation="slideIn"
          key="slide"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">Highlight</h3>
        <CodeBlock
          code={code}
          language="typescript"
          animation="highlight"
          key="highlight"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-muted-foreground text-sm">
          Typewriter
        </h3>
        <CodeBlock
          code={code}
          language="typescript"
          animation="typewriter"
          key="typewriter"
        />
      </div>
    </div>
  );
}
