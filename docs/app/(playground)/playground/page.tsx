"use client";

import { Card, CardContent } from "@/components/ui/card";
import { VercelTabs } from "@/registry/default/ui/vercel-tabs";

export default function Frame() {
  const tabsData = [
    {
      label: "Overview",
      value: "Overview",
      content: (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="mb-2 font-bold text-2xl">Overview Content</h2>
          <p className="text-muted-foreground">
            This is the content area for the Overview tab. You can pass any
            React components or content here.
          </p>
        </div>
      ),
    },
    {
      label: "Integrations",
      value: "Integrations",
      content: (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="mb-2 font-bold text-2xl">Integrations</h2>
          <p className="text-muted-foreground">
            Connect your favorite tools and services.
          </p>
        </div>
      ),
    },
    {
      label: "Activity",
      value: "Activity",
      content: (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="mb-2 font-bold text-2xl">Activity Log</h2>
          <p className="text-muted-foreground">
            View the latest activity on your account.
          </p>
        </div>
      ),
    },
    {
      label: "Domains",
      value: "Domains",
      content: (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="mb-2 font-bold text-2xl">Domains</h2>
          <p className="text-muted-foreground">
            Manage your custom domains and DNS settings.
          </p>
        </div>
      ),
    },
    {
      label: "Usage",
      value: "Usage",
      content: (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="mb-2 font-bold text-2xl">Usage Statistics</h2>
          <p className="text-muted-foreground">
            Check your resource usage and limits.
          </p>
        </div>
      ),
    },
    {
      label: "Monitoring",
      value: "Monitoring",
      content: (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="mb-2 font-bold text-2xl">Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time performance monitoring.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white transition-colors duration-300 dark:bg-[#0e0f11]">
      <Card className="relative flex min-h-[400px] w-full max-w-[1200px] flex-col items-center justify-start border-none bg-transparent pt-10 shadow-none">
        <CardContent className="flex w-full flex-col items-center p-0">
          <VercelTabs tabs={tabsData} defaultTab="Overview" />
        </CardContent>
      </Card>
    </div>
  );
}
