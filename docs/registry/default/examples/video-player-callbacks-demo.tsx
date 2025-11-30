"use client";

import { VideoPlayer } from "@/registry/default/ui/video-player";
import { useState } from "react";

export default function VideoPlayerCallbacksDemo() {
  const [currentTime, setCurrentTime] = useState(0);
  const [watchedPercentage, setWatchedPercentage] = useState(0);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    // Assuming video duration is around 596 seconds for Big Buck Bunny
    const percentage = Math.min((time / 596) * 100, 100);
    setWatchedPercentage(percentage);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        title="Big Buck Bunny"
        onTimeUpdate={handleTimeUpdate}
      />
      
      <div className="rounded-lg border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-sm">Playback Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Time:</span>
            <span className="font-mono">{currentTime.toFixed(2)}s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-mono">{watchedPercentage.toFixed(1)}%</span>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-300"
            style={{ width: `${watchedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
