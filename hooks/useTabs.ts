import { useState } from "react";

export interface Tab {
  label: string;
  value: string;
  subRoutes?: string[];
}

export function useTabs({
  tabs,
  initialTabId,
  onChange,
}: {
  tabs: Tab[];
  initialTabId: string;
  onChange?: (id: string) => void;
}) {
  const [[selectedTabIndex, direction], setSelectedTab] = useState(() => {
    const indexOfInitialTab = tabs.findIndex(
      (tab) => tab.value === initialTabId
    );
    return [indexOfInitialTab === -1 ? 0 : indexOfInitialTab, 0];
  });

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
    contentProps: {
      direction,
      selectedTabIndex,
    },
  };
}
