/**
 * Props for the Button component
 */
export interface ButtonProps {
  /**
   * The visual style variant of the button
   * @default "default"
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "shimmer" | "glow";
  
  /**
   * The size of the button
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";
  
  /**
   * Whether to render as a child component using Radix UI Slot
   * When true, the button will merge its props and behavior with its child element
   * @default false
   */
  asChild?: boolean;
}
