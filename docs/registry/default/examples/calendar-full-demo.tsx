import { useState } from "react";
import { AnimatedCalendar } from "@/registry/default/ui/calender";

export default function CalendarFullDemo() {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>();
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Single Date</h3>
        <AnimatedCalendar
          mode="single"
          value={date}
          onChange={setDate}
          showPresets
          placeholder="Pick a date"
        />
        {date && (
          <p className="text-muted-foreground text-xs">
            {date.toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Date Range</h3>
        <AnimatedCalendar
          mode="range"
          onChange={setDateRange}
          placeholder="Select range"
        />
        {dateRange?.from && dateRange?.to && (
          <p className="text-muted-foreground text-xs">
            {dateRange.from.toLocaleDateString()} -{" "}
            {dateRange.to.toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm">Multiple Dates</h3>
        <AnimatedCalendar
          mode="multiple"
          value={dates}
          onChange={setDates}
          placeholder="Pick dates"
        />
        {dates.length > 0 && (
          <p className="text-muted-foreground text-xs">
            {dates.length} selected
          </p>
        )}
      </div>
    </div>
  );
}
