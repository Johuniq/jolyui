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
    <div className="w-full max-w-4xl mx-auto">
      <VideoPlayer
        src={qualitySources}
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        title="Multi-Quality Video"
        description="Switch between different quality options using the settings menu"
      />
      
      <div className="mt-4 rounded-lg border bg-card p-4">
        <h3 className="font-semibold text-sm mb-2">Available Qualities</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          {qualitySources.map((source) => (
            <li key={source.quality}>
              • {source.quality}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Click the settings icon to switch between quality options
        </p>
      </div>
    </div>
  );
}
