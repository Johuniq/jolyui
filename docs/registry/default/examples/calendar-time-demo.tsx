import { useState } from "react";
import { AnimatedCalendar } from "@/registry/default/ui/calender";

export default function CalendarTimeDemo() {
  const [dateTime, setDateTime] = useState<Date>();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Date & Time Selection</h3>
      <AnimatedCalendar
        mode="single"
        value={dateTime}
        onChange={setDateTime}
        showTime
        placeholder="Select date and time"
      />
      {dateTime && (
        <p className="text-muted-foreground text-sm">
          Selected: {dateTime.toLocaleString()}
        </p>
      )}
    </div>
  );
}
