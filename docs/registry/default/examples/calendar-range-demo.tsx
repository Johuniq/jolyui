import { AnimatedCalendar } from "@/registry/default/ui/calender";
import { useState } from "react";

export default function CalendarRangeDemo() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Date Range Selection</h3>
      <AnimatedCalendar
        mode="range"
        value={dateRange}
        onChange={setDateRange}
        placeholder="Select date range"
      />
      {dateRange?.from && dateRange?.to && (
        <p className="text-sm text-muted-foreground">
          Selected: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}