import { TerminalBlock } from "@/registry/default/ui/code-block";

export default function CodeBlockTerminalDemo() {
  return (
    <div className="w-full max-w-3xl">
      <TerminalBlock
        title="Terminal"
        commands={[
          { command: "npm install jolyui", output: "added 1 package in 2.3s" },
          {
            command: "npm run dev",
            output:
              "VITE v5.0.0 ready in 300 ms\n\n➜  Local: http://localhost:5173/",
          },
        ]}
      />
    </div>
  );
}
