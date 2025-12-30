"use client";

import { useState } from "react";
import { VideoPlayer } from "@/registry/default/ui/video-player";

const playlist = [
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster:
      "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    title: "Big Buck Bunny",
    description: "A large and lovable rabbit deals with three tiny bullies.",
  },
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster:
      "https://download.blender.org/ED/cover_art/elephants_dream_1024.jpg",
    title: "Elephants Dream",
    description: "Two strange characters exploring a cavernous labyrinth.",
  },
  {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "For Bigger Blazes",
    description: "A short promotional video.",
  },
];

export default function VideoPlayerPlaylistDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentVideo = playlist[currentIndex];

  if (!currentVideo) return null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <VideoPlayer
        src={currentVideo.src}
        poster={currentVideo.poster}
        title={currentVideo.title}
        description={currentVideo.description}
        currentVideoIndex={currentIndex}
        totalVideos={playlist.length}
        onNextVideo={handleNext}
        onPrevVideo={handlePrev}
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {playlist.map((video, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 rounded-lg border-2 transition-all ${
              index === currentIndex
                ? "border-cyan-500 ring-2 ring-cyan-500/20"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <div className="relative h-24 w-40 overflow-hidden rounded-md bg-muted">
              {video.poster && (
                <img
                  src={video.poster}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="px-2 text-center font-medium text-white text-xs">
                  {video.title}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
