"use client";

import { DateWheelPicker } from "@/registry/default/ui/date-wheel-picker";
import { useState } from "react";

export default function DateWheelPickerLocaleDemo() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">English (US)</span>
        <DateWheelPicker value={date} onChange={setDate} locale="en-US" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">French</span>
        <DateWheelPicker value={date} onChange={setDate} locale="fr-FR" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">German</span>
        <DateWheelPicker value={date} onChange={setDate} locale="de-DE" />
      </div>
    </div>
  );
}
