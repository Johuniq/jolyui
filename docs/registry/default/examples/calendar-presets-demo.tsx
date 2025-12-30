import { useState } from "react";
import { AnimatedCalendar } from "@/registry/default/ui/calender";

export default function CalendarPresetsDemo() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Calendar with Presets</h3>
      <AnimatedCalendar
        mode="range"
        onChange={(val) => setDate(val as Date | undefined)}
        showPresets
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
