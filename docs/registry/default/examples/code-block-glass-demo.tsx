import { CodeBlock } from "@/registry/default/ui/code-block";

export default function CodeBlockTerminalDemo() {
  return (
    <div className="w-full max-w-3xl">
      <CodeBlock
        code={`const greeting = "Hello, jolyui!";
console.log(greeting);

// Supports multiple themes!`}
        language="typescript"
        variant="glass"
        theme="dracula"
        animation="highlight"
      />
    </div>
  );
}
