// components/docs/component-source-server.tsx
import fs from "fs/promises";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import path from "path";

type Props = {
  name: string;
  root?: string;
  ext?: string;
  lang?: string;
  title?: string;
};

export async function ComponentSource({
  name,
  root = "components/jolyui",
  ext = "tsx",
  lang = "tsx",
  title,
}: Props) {
  const filePath = path.resolve(process.cwd(), `${root}/${name}.${ext}`);

  let source = "";
  try {
    source = await fs.readFile(filePath, "utf-8");
  } catch (err: any) {
    source = `// Could not read file at: ${filePath}\n// ${String(err?.message ?? err)}`;
  }

  // Pass lang and (optionally) other props. Child is the raw source string.
  return <DynamicCodeBlock lang={lang} code={source} />;
}
