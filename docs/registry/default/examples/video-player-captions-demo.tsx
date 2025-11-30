import { VideoPlayer } from "@/registry/default/ui/video-player";

export default function VideoPlayerCaptionsDemo() {
  const tracks = [
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/subtitles-en.vtt",
      label: "English",
      srcLang: "en",
      default: true,
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/subtitles-es.vtt",
      label: "Spanish",
      srcLang: "es",
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/subtitles-fr.vtt",
      label: "French",
      srcLang: "fr",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        title="Video with Captions"
        description="Video player with multi-language caption support"
        tracks={tracks}
      />
      
      <div className="mt-4 rounded-lg border bg-card p-4">
        <h3 className="font-semibold text-sm mb-2">Available Captions</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          {tracks.map((track) => (
            <li key={track.srcLang}>
              • {track.label} ({track.srcLang}) {track.default && "(Default)"}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Click the captions icon (C) to toggle or switch languages
        </p>
      </div>
    </div>
  );
}
