import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserTypeScript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";

type Lang = "tsx" | "jsx" | "ts" | "js";

export async function formatCode(
  code: string,
  lang: Lang = "tsx",
  printWidth = 60
) {
  const parser = lang === "tsx" || lang === "ts" ? "typescript" : "babel";
  return prettier.format(code, {
    parser,
    plugins: [parserBabel, parserTypeScript, parserEstree],
    printWidth, // ↓ smaller width ⇒ forces multiline props
    singleQuote: false,
    trailingComma: "all",
  });
}
