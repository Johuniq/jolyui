"use client";

import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-black/5">
          <div className="h-8 w-8 animate-spin rounded-full border-primary border-b-2"></div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
