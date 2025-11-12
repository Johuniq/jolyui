"use client";

import { ParallaxImage } from "@/components/jolyui/parallax-image";

export default function Test() {
  return (
    <div className="flex flex-col gap-16 items-center justify-center w-full min-h-screen py-20">
      {/* Depth */}
      <ParallaxImage>
        <h1 className="text-5xl font-bold text-gray-800">Depth Variant</h1>
      </ParallaxImage>
    </div>
  );
}
