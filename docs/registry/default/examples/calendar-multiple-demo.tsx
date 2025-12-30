import { useState } from "react";
import { AnimatedCalendar } from "@/registry/default/ui/calender";

export default function CalendarMultipleDemo() {
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Multiple Date Selection</h3>
      <AnimatedCalendar
        mode="multiple"
        value={dates}
        onChange={setDates}
        placeholder="Select multiple dates"
      />
      {dates.length > 0 && (
        <p className="text-muted-foreground text-sm">
          Selected {dates.length} date{dates.length !== 1 ? "s" : ""}:{" "}
          {dates.map((d) => d.toLocaleDateString()).join(", ")}
        </p>
      )}
    </div>
  );
}
