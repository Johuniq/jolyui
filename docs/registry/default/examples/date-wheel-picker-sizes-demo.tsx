"use client";

import { DateWheelPicker } from "@/registry/default/ui/date-wheel-picker";
import { useState } from "react";

export default function DateWheelPickerSizesDemo() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Small</span>
        <DateWheelPicker value={date} onChange={setDate} size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Medium (default)</span>
        <DateWheelPicker value={date} onChange={setDate} size="md" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Large</span>
        <DateWheelPicker value={date} onChange={setDate} size="lg" />
      </div>
    </div>
  );
}
