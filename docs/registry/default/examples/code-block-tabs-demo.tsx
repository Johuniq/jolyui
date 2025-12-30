import { FileJson, FileType } from "lucide-react";
import { CodeTabs } from "@/registry/default/ui/code-block";

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
}`;

const jsonCode = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}`;

export default function CodeBlockTabsDemo() {
  return (
    <div className="w-full max-w-3xl">
      <CodeTabs
        tabs={[
          {
            label: "types.ts",
            code: tsCode,
            language: "typescript",
            icon: <FileType className="h-4 w-4" />,
          },
          {
            label: "data.json",
            code: jsonCode,
            language: "json",
            icon: <FileJson className="h-4 w-4" />,
          },
        ]}
      />
    </div>
  );
}
