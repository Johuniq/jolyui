"use client"
import { useTheme } from "next-themes";

// Export a custom hook to get theme
export function useAppTheme() {
	const { theme } = useTheme();
	return theme;
}