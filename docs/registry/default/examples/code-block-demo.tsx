import { CodeBlock } from "@/registry/default/ui/code-block";

const code = `import React from "react";

function HelloWorld() {
  return (
    <div className="p-4 rounded-lg bg-primary text-primary-foreground">
      <h1>Hello, World!</h1>
      <p>This is a simple React component.</p>
    </div>
  );
}

export default HelloWorld;`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-3xl">
      <CodeBlock
        code={code}
        language="tsx"
        title="HelloWorld.tsx"
        highlightLines={[6]}
      />
    </div>
  );
}
