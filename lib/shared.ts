// lib/shared.ts
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki/bundle/web";

export async function highlight(
  code: string,
  language: string,
  theme: "light" | "dark" | "system" = "dark"
) {
  const t = theme === "system" ? "dark" : theme;
  const hast = await codeToHast(code, {
    lang: language,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: t,
  });
  return toJsxRuntime(hast, { Fragment, jsx, jsxs }); // returns a <pre class="shiki">…</pre> tree
}
