import { AnimatedCalendar } from "@/registry/default/ui/calender";
import { useState } from "react";

export default function CalendarConstraintsDemo() {
  const [date, setDate] = useState<Date>();

  // Disable weekends and past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Calendar with Constraints</h3>
      <p className="text-xs text-muted-foreground">
        Weekends and past dates are disabled
      </p>
      <AnimatedCalendar
        mode="single"
        value={date}
        onChange={setDate}
        minDate={today}
        disabledDaysOfWeek={[0, 6]} // Disable Sunday (0) and Saturday (6)
        placeholder="Select a weekday"
      />
      {date && (
        <p className="text-sm text-muted-foreground">
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}