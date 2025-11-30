import { VideoPlayer } from "@/registry/default/ui/video-player";

export default function VideoPlayerCompactDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        poster="https://download.blender.org/ED/cover_art/elephants_dream_1024.jpg"
        title="Elephants Dream"
        description="A short film about two strange characters exploring a cavernous labyrinth."
        compact={true}
      />
    </div>
  );
}
