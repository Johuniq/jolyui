import { useState } from "react";
import { AnimatedCalendar } from "@/registry/default/ui/calender";

export default function CalendarBasicDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Basic Calendar</h3>
      <AnimatedCalendar
        mode="single"
        value={date}
        onChange={setDate}
        placeholder="Select a date"
      />
      {date && (
        <p className="text-muted-foreground text-sm">
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
