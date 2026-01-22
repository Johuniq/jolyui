"use client";

import { DateWheelPicker } from "@/registry/default/ui/date-wheel-picker";
import { useState } from "react";

export default function DateWheelPickerDemo() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center gap-4">
      <DateWheelPicker value={date} onChange={setDate} />
      <p className="text-sm text-muted-foreground">
        Selected: {date.toLocaleDateString()}
      </p>
    </div>
  );
}
