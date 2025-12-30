"use client";

import { TypewriterText } from "@/registry/default/ui/typewritter-text";

export default function TypewritterTextCustomDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Fast Typing</h3>
        <TypewriterText
          words={["Code", "Build", "Deploy", "Scale"]}
          typingSpeed={50}
          deletingSpeed={25}
          pauseDuration={1000}
          className="font-mono text-2xl text-primary"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Slow Typing</h3>
        <TypewriterText
          words={["Design", "Create", "Innovate", "Inspire"]}
          typingSpeed={200}
          deletingSpeed={100}
          pauseDuration={3000}
          className="font-bold text-3xl text-destructive"
        />
      </div>
    </div>
  );
}
