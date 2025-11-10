"use client";
import { useTheme } from "next-themes";

export function ThemedCode({
  light,
  dark,
}: {
  light: React.ReactNode;
  dark: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme(); // "light" | "dark"
  return <>{resolvedTheme === "dark" ? dark : light}</>;
}
