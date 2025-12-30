import { DocsLayout as DocsLayoutImpl } from "fumadocs-ui/layouts/notebook";
import { docsOptions } from "@/config/layout";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <DocsLayoutImpl
      sidebar={{
        defaultOpenLevel: 1,
      }}
      {...(docsOptions as any)}
    >
      {children}
    </DocsLayoutImpl>
  );
}
