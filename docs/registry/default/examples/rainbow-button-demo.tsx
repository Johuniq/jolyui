"use client";

import { ArrowRight } from "lucide-react";
import { RainbowButton } from "@/registry/default/ui/rainbow-button";

export default function RainbowButtonDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <RainbowButton className="group">
        Get Started
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </RainbowButton>
    </div>
  );
}
