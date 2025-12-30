import { VideoPlayer } from "@/registry/default/ui/video-player";

export default function VideoPlayerQualityDemo() {
  const qualitySources = [
    {
      quality: "1080p",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      quality: "720p",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      quality: "480p",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <VideoPlayer
        src={qualitySources}
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        title="Multi-Quality Video"
        description="Switch between different quality options using the settings menu"
      />

      <div className="mt-4 rounded-lg border bg-card p-4">
        <h3 className="mb-2 font-semibold text-sm">Available Qualities</h3>
        <ul className="space-y-1 text-muted-foreground text-sm">
          {qualitySources.map((source) => (
            <li key={source.quality}>• {source.quality}</li>
          ))}
        </ul>
        <p className="mt-3 text-muted-foreground text-xs">
          Click the settings icon to switch between quality options
        </p>
      </div>
    </div>
  );
}
