import { VercelTabs } from "@/registry/default/ui/vercel-tabs";

  const tabsData = [
    {
      label: "Overview",
      value: "Overview",
      content: (
        <div className="p-6 rounded-lg border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Overview Content</h2>
          <p className="text-muted-foreground">
            This is the content area for the Overview tab. You can pass any React components or content here.
          </p>
        </div>
      ),
    },
    {
      label: "Integrations",
      value: "Integrations",
      content: (
        <div className="p-6 rounded-lg border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Integrations</h2>
          <p className="text-muted-foreground">Connect your favorite tools and services.</p>
        </div>
      ),
    },
    {
      label: "Activity",
      value: "Activity",
      content: (
        <div className="p-6 rounded-lg border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Activity Log</h2>
          <p className="text-muted-foreground">View the latest activity on your account.</p>
        </div>
      ),
    },
    {
      label: "Domains",
      value: "Domains",
      content: (
        <div className="p-6 rounded-lg border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Domains</h2>
          <p className="text-muted-foreground">Manage your custom domains and DNS settings.</p>
        </div>
      ),
    },
    {
      label: "Usage",
      value: "Usage",
      content: (
        <div className="p-6 rounded-lg border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Usage Statistics</h2>
          <p className="text-muted-foreground">Check your resource usage and limits.</p>
        </div>
      ),
    },
    {
      label: "Monitoring",
      value: "Monitoring",
      content: (
        <div className="p-6 rounded-lg border border-gray-200 bg-white text-black dark:border-[#333] dark:bg-[#1c1c1c] dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Monitoring</h2>
          <p className="text-muted-foreground">Real-time performance monitoring.</p>
        </div>
      ),
    },
  ];

export default function VercelTabsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Vercel Tabs</h3>
        <VercelTabs tabs={tabsData} defaultTab="Overview" />
      </div>
    </div>
  );
}
