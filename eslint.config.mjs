import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variables rule
      "react/no-unescaped-entities": "off", // Disable unescaped entities rule
      "react-hooks/exhaustive-deps": "warn", // Change missing dependency warnings to warnings
      "@next/next/no-img-element": "off", // Disable warnings for <img> usage
      "jsx-a11y/alt-text": "off", // Disable alt text warnings
      "import/no-anonymous-default-export": "off", // Disable anonymous default export warnings
      "react/display-name": "off", // Disable missing display name warnings
      "@typescript-eslint/no-explicit-any": "off", // Disable explicit `any` warnings
      "@typescript-eslint/no-empty-object-type": "off", // Disable empty object type warnings
    },
  },
];

export default eslintConfig;