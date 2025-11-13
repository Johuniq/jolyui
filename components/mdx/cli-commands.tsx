"use client";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

interface CliCommandsProps {
  name: string;
  type?: "cli" | "install"; // NEW TYPE
}

export default function CliCommands({ name, type = "cli" }: CliCommandsProps) {
  // -----------------------------
  // CLI COMMANDS (used for adding components)
  // -----------------------------
  const cliCmds: Record<string, string> = {
    bun: `bunx --bun shadcn@latest add @jolyui.dev/${name}`,
    npx: `npx shadcn@latest add @jolyui.dev/${name}`,
    pnpm: `pnpm dlx shadcn@latest add @jolyui.dev/${name}`,
    yarn: `yarn create shadcn@latest add @jolyui.dev/${name}`,
  };

  // -----------------------------
  // INSTALL COMMANDS (deps)
  // -----------------------------
  const installCmds: Record<string, string> = {
    bun: `bun install ${name}`,
    npm: `npm install ${name}`,
    pnpm: `pnpm install ${name}`,
    yarn: `yarn add ${name}`,
  };

  // -----------------------------
  // PICK WHICH SET TO USE
  // -----------------------------
  const commands = type === "install" ? installCmds : cliCmds;
  const keys = Object.keys(commands);

  return (
    <div className="relative">
      <Tabs items={keys}>
        {keys.map((k) => (
          <Tab key={k} value={k}>
            <DynamicCodeBlock lang="bash" code={commands[k]} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
