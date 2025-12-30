/**
 * Props for the tabsData array used in VercelTabs
 */
export interface TabsDataProps {
  /**
   * Array of tab objects, each with label, value, and content
   */
  tabs: TabData[];
}

import type React from "react";

/**
 * Data for each tab in VercelTabs
 */
export interface TabData {
  /**
   * The label displayed on the tab trigger
   */
  label: string;

  /**
   * The unique value for the tab (used for selection)
   */
  value: string;

  /**
   * The content rendered when the tab is active
   */
  content: React.ReactNode;
}

/**
 * Props for the VercelTabs component
 */
export interface VercelTabsProps {
  /**
   * Array of tab data objects
   */
  tabs: TabData[];

  /**
   * The value of the tab to show by default
   * @default tabs[0].value
   */
  defaultTab?: string;

  /**
   * Additional CSS classes for styling
   */
  className?: string;
}
