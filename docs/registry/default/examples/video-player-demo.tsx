import { VideoPlayer } from "@/registry/default/ui/video-player";

export default function VideoPlayerDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        title="Big Buck Bunny"
        description="A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness."
      />
    </div>
  );
}
