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
    <div className="mx-auto w-full max-w-4xl">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        title="Video with Captions"
        description="Video player with multi-language caption support"
        tracks={tracks}
      />

      <div className="mt-4 rounded-lg border bg-card p-4">
        <h3 className="mb-2 font-semibold text-sm">Available Captions</h3>
        <ul className="space-y-1 text-muted-foreground text-sm">
          {tracks.map((track) => (
            <li key={track.srcLang}>
              • {track.label} ({track.srcLang}) {track.default && "(Default)"}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-muted-foreground text-xs">
          Click the captions icon (C) to toggle or switch languages
        </p>
      </div>
    </div>
  );
}
