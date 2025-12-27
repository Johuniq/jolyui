import type { EmptyProps } from "@/types";

export interface BentoGridProps extends EmptyProps<"div"> {
  /**
   * The content to be displayed in the bento grid layout
   */
  children: React.ReactNode;
}