import type { Language } from "prism-react-renderer";
import type * as React from "react";

export type CodeBlockVariant =
  | "default"
  | "terminal"
  | "minimal"
  | "gradient"
  | "glass";
export type AnimationType =
  | "none"
  | "fadeIn"
  | "slideIn"
  | "typewriter"
  | "highlight";
export type ThemeType =
  | "oneDark"
  | "dracula"
  | "github"
  | "nightOwl"
  | "oceanicNext"
  | "palenight"
  | "shadesOfPurple"
  | "synthwave84"
  | "vsDark"
  | "vsLight";

export interface CodeBlockProps {
  /**
   * The code to display.
   */
  code: string;

  /**
   * The language of the code.
   * @default "typescript"
   */
  language?: Language | string;

  /**
   * The title to display in the header.
   */
  title?: string;

  /**
   * Whether to show line numbers.
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Lines to highlight.
   */
  highlightLines?: number[];

  /**
   * Lines to mark as added (green).
   */
  addedLines?: number[];

  /**
   * Lines to mark as removed (red).
   */
  removedLines?: number[];

  /**
   * The visual variant of the code block.
   * @default "default"
   */
  variant?: CodeBlockVariant;

  /**
   * The animation to use when the component mounts.
   * @default "fadeIn"
   */
  animation?: AnimationType;

  /**
   * Delay before the animation starts (in seconds).
   * @default 0
   */
  animationDelay?: number;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Whether to show the copy button.
   * @default true
   */
  copyable?: boolean;

  /**
   * Whether to show the download button.
   * @default false
   */
  downloadable?: boolean;

  /**
   * The filename for the downloaded file.
   */
  downloadFileName?: string;

  /**
   * Maximum height of the code block (e.g., '400px').
   */
  maxHeight?: string;

  /**
   * The syntax highlighting theme.
   * @default "oneDark"
   */
  theme?: ThemeType;

  /**
   * Whether to wrap long lines.
   * @default false
   */
  wrapLongLines?: boolean;

  /**
   * Whether to show the language name in the header.
   * @default true
   */
  showLanguage?: boolean;

  /**
   * Whether the code block can be collapsed.
   * @default false
   */
  collapsible?: boolean;

  /**
   * Whether the code block is collapsed by default.
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * The number to start counting lines from.
   * @default 1
   */
  startingLineNumber?: number;

  /**
   * A caption to display below the code block.
   */
  caption?: string;
}

export interface CodeCompareProps {
  /**
   * The code for the 'before' state.
   */
  before: string;

  /**
   * The code for the 'after' state.
   */
  after: string;

  /**
   * The language of the code.
   * @default "typescript"
   */
  language?: string;

  /**
   * Title for the 'before' block.
   * @default "Before"
   */
  beforeTitle?: string;

  /**
   * Title for the 'after' block.
   * @default "After"
   */
  afterTitle?: string;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * The syntax highlighting theme.
   * @default "oneDark"
   */
  theme?: ThemeType;

  /**
   * Whether to automatically highlight differences.
   * @default false
   */
  showDiff?: boolean;
}

export interface CodeTabsProps {
  /**
   * The tabs to display.
   */
  tabs: Array<{
    label: string;
    code: string;
    language?: string;
    icon?: React.ReactNode;
  }>;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * The syntax highlighting theme.
   * @default "oneDark"
   */
  theme?: ThemeType;

  /**
   * The index of the initially active tab.
   * @default 0
   */
  defaultTab?: number;
}

export interface TerminalBlockProps {
  /**
   * The commands to display.
   */
  commands: Array<{
    command: string;
    output?: string;
  }>;

  /**
   * The title of the terminal window.
   * @default "Terminal"
   */
  title?: string;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Whether to animate the appearance of commands.
   * @default true
   */
  animated?: boolean;
}
