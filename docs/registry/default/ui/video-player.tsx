"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Loader2,
    Maximize,
    Maximize2,
    MessageCircle,
    Minimize,
    MoreVertical,
    Pause,
    PictureInPicture2,
    Play,
    Repeat,
    RotateCcw,
    RotateCw,
    Settings,
    Volume2,
    VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

interface QualitySource {
  quality: string;
  src: string;
}

interface CaptionTrack {
  src: string;
  label: string;
  srcLang: string;
  default?: boolean;
}

interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}

export interface VideoPlayerProps {
  src: string | QualitySource[];
  tracks?: CaptionTrack[];
  poster?: string;
  title?: string;
  description?: string;
  compact?: boolean;
  chapters?: Chapter[];
  onTimeUpdate?: (time: number) => void;
  onNextVideo?: () => void;
  onPrevVideo?: () => void;
  currentVideoIndex?: number;
  totalVideos?: number;
}

export interface VideoPlayerRef {
  seek: (time: number) => void;
  play: () => void;
  pause: () => void;
}

const Tooltip = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
    >
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 whitespace-nowrap rounded bg-black/90 px-2 py-1 text-white text-xs"
      >
        {label}
      </motion.div>
    </div>
  );
};

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (
    {
      src,
      tracks = [],
      poster,
      title: _title,
      description: _description,
      compact: _compact = false,
      chapters = [],
      onTimeUpdate,
      onNextVideo,
      onPrevVideo,
      currentVideoIndex = 0,
      totalVideos = 1,
    },
    ref,
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [activeDialog, setActiveDialog] = useState<
      "settings" | "options" | "captions" | null
    >(null);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [quality, setQuality] = useState("auto");
    const [availableQualities, setAvailableQualities] = useState<string[]>([]);
    const [currentSrc, setCurrentSrc] = useState("");
    const [speed, setSpeed] = useState(1);
    const [isPictureInPicture, setIsPictureInPicture] = useState(false);
    const [currentCaption, setCurrentCaption] = useState<string | null>(null);
    const [isTheaterMode, setIsTheaterMode] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);

    // Hover state for timeline
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);

    // Double tap state
    const [doubleTapAction, setDoubleTapAction] = useState<{
      side: "left" | "right";
      id: number;
    } | null>(null);
    const lastTapRef = useRef<{ time: number; x: number } | null>(null);
    const tapTimeoutRef = useRef<NodeJS.Timeout>(undefined);

    const controlsTimeoutRef = useRef<NodeJS.Timeout>(undefined);

    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
      const time = Date.now();
      const clientX = e.clientX;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = clientX - rect.left;
      const width = rect.width;
      const isLeft = x < width * 0.3;
      const isRight = x > width * 0.7;

      if (!isLeft && !isRight) {
        togglePlay();
        return;
      }

      if (lastTapRef.current && time - lastTapRef.current.time < 300) {
        // Double tap detected
        if (tapTimeoutRef.current) {
          clearTimeout(tapTimeoutRef.current);
        }

        if (isLeft) {
          handleSkip(-10);
          setDoubleTapAction({ side: "left", id: time });
        } else {
          handleSkip(10);
          setDoubleTapAction({ side: "right", id: time });
        }
        lastTapRef.current = null;
      } else {
        // First tap
        lastTapRef.current = { time, x };
        tapTimeoutRef.current = setTimeout(() => {
          togglePlay();
          lastTapRef.current = null;
        }, 300);
      }
    };

    // Clear double tap action after animation
    useEffect(() => {
      if (doubleTapAction) {
        const timeout = setTimeout(() => {
          setDoubleTapAction(null);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }, [doubleTapAction]);

    useImperativeHandle(ref, () => ({
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
          setCurrentTime(time);
        }
      },
      play: () => {
        videoRef.current?.play();
      },
      pause: () => {
        videoRef.current?.pause();
      },
    }));

    // Initialize quality sources
    useEffect(() => {
      if (Array.isArray(src)) {
        const qualities = src.map((s) => s.quality);
        setAvailableQualities(["auto", ...qualities]);
        // Default to the first quality source if auto
        setCurrentSrc(src[0]?.src || "");
      } else {
        setAvailableQualities(["auto"]);
        setCurrentSrc(src);
      }
    }, [src]);

    // Initialize captions
    useEffect(() => {
      if (tracks.length > 0) {
        const defaultTrack = tracks.find((t) => t.default);
        if (defaultTrack) {
          setCurrentCaption(defaultTrack.srcLang);
        }
      }
    }, [tracks]);

    // Handle caption change
    const handleCaptionChange = (lang: string | null) => {
      setCurrentCaption(lang);
      if (videoRef.current) {
        const textTracks = videoRef.current.textTracks;
        for (let i = 0; i < textTracks.length; i++) {
          const track = textTracks[i];
          if (track) {
            if (lang && track.language === lang) {
              track.mode = "showing";
            } else {
              track.mode = "hidden";
            }
          }
        }
      }
    };

    // Format time display
    const formatTime = (time: number) => {
      if (!time || Number.isNaN(time)) return "0:00";
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = Math.floor(time % 60);

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // Handle play/pause
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    // Handle volume change
    const handleVolumeChange = (value: number[]) => {
      const newVolume = value[0] ?? 1;
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    };

    // Toggle mute
    const toggleMute = () => {
      if (videoRef.current) {
        if (isMuted) {
          videoRef.current.volume = volume || 0.5;
          setIsMuted(false);
        } else {
          videoRef.current.volume = 0;
          setIsMuted(true);
        }
      }
    };

    // Handle progress bar click
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    // Handle progress bar hover
    const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const time = Math.max(0, Math.min(percent * duration, duration));
      setHoverTime(time);
      setHoverPosition(percent * 100);
    };

    const handleProgressLeave = () => {
      setHoverTime(null);
      setHoverPosition(null);
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
      if (!containerRef.current) return;

      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (
          (
            containerRef.current as HTMLElement & {
              webkitRequestFullscreen?: () => void;
            }
          ).webkitRequestFullscreen
        ) {
          (
            containerRef.current as HTMLElement & {
              webkitRequestFullscreen?: () => void;
            }
          ).webkitRequestFullscreen?.();
        }
        setIsFullscreen(true);
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    };

    const toggleTheaterMode = () => {
      const newTheaterMode = !isTheaterMode;
      setIsTheaterMode(newTheaterMode);

      // Lock/unlock body scroll
      if (newTheaterMode) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    // Handle Picture-in-Picture
    const togglePictureInPicture = async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          setIsPictureInPicture(false);
        } else if (videoRef.current && document.pictureInPictureEnabled) {
          await videoRef.current.requestPictureInPicture();
          setIsPictureInPicture(true);
        }
      } catch (error) {
        console.error("PiP error:", error);
      }
    };

    // Handle quality change
    const handleQualityChange = (newQuality: string) => {
      if (!videoRef.current) return;

      const currentTime = videoRef.current.currentTime;
      const wasPlaying = !videoRef.current.paused;

      setQuality(newQuality);

      if (Array.isArray(src)) {
        let newSrc = "";
        if (newQuality === "auto") {
          newSrc = src[0]?.src || "";
        } else {
          const source = src.find((s) => s.quality === newQuality);
          if (source) newSrc = source.src;
        }

        if (newSrc && newSrc !== currentSrc) {
          setCurrentSrc(newSrc);
          // Restore playback position after source change
          const handleCanPlay = () => {
            if (videoRef.current) {
              videoRef.current.currentTime = currentTime;
              if (wasPlaying) videoRef.current.play();
              videoRef.current.removeEventListener(
                "loadedmetadata",
                handleCanPlay,
              );
            }
          };
          videoRef.current.addEventListener("loadedmetadata", handleCanPlay);
        }
      }
    };

    // Handle speed change
    const handleSpeedChange = (newSpeed: number) => {
      setSpeed(newSpeed);
      if (videoRef.current) {
        videoRef.current.playbackRate = newSpeed;
      }
    };

    // Handle skip
    const handleSkip = (seconds: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime += seconds;
      }
    };

    const handleToggleLoop = () => {
      if (videoRef.current) {
        videoRef.current.loop = !videoRef.current.loop;
        setIsLooping(!isLooping);
      }
    };

    // Handle video metadata loaded
    const handleLoadedMetadata = () => {
      setDuration(videoRef.current?.duration || 0);
      setIsLoading(false);
    };

    // Handle time update
    const handleTimeUpdate = () => {
      setCurrentTime(videoRef.current?.currentTime || 0);
      if (onTimeUpdate) {
        onTimeUpdate(videoRef.current?.currentTime || 0);
      }

      // Update buffered amount
      if (videoRef.current && videoRef.current.buffered.length > 0) {
        const bufferedEnd = videoRef.current.buffered.end(
          videoRef.current.buffered.length - 1,
        );
        setBuffered((bufferedEnd / duration) * 100);
      }
    };

    // Handle fullscreen change
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
    }, []);

    // Handle mouse movement for controls
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }

        if (isPlaying) {
          controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
          }, 3000);
        }
      };

      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [isPlaying]);

    return (
      <div
        ref={containerRef}
        className={`group relative w-full overflow-hidden rounded-lg bg-black ${
          isTheaterMode
            ? "fixed inset-0 z-50 h-screen w-screen rounded-none"
            : ""
        }`}
      >
        <div
          className={`relative w-full transition-all duration-300 ${isTheaterMode ? "h-screen" : "aspect-video"}`}
        >
          {/* Video Element */}
          {/* biome-ignore lint/a11y/useMediaCaption: Video player component may not have captions */}
          <video
            ref={videoRef}
            src={currentSrc}
            poster={poster}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => setIsLoading(true)}
            onEnded={() => setIsPlaying(false)}
            className="absolute inset-0 h-full w-full"
          >
            {tracks.map((track, index) => (
              <track
                key={index}
                kind="subtitles"
                src={track.src}
                srcLang={track.srcLang}
                label={track.label}
                default={track.default}
              />
            ))}
          </video>

          {/* Loading Spinner */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Loader2 className="h-12 w-12 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls Background Gradient */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent"
              />
            )}
          </AnimatePresence>

          {/* Click Overlay */}
          <div
            className="absolute inset-0 z-10"
            onClick={handleTap}
            role="button"
            aria-label="Play/Pause"
            tabIndex={0}
          />

          {/* Double Tap Animation */}
          <AnimatePresence>
            {doubleTapAction && (
              <div
                key={doubleTapAction.id}
                className={`absolute inset-y-0 ${
                  doubleTapAction.side === "left"
                    ? "left-0 justify-start pl-12"
                    : "right-0 justify-end pr-12"
                } pointer-events-none z-20 flex w-1/2 items-center`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center rounded-full shadow-lg"
                >
                  {doubleTapAction.side === "left" ? (
                    <>
                      <ChevronsLeft className="h-8 w-8 text-white" />
                      <span className="mt-1 select-none font-bold text-white text-xs shadow-lg">
                        10s
                      </span>
                    </>
                  ) : (
                    <>
                      <ChevronsRight className="h-8 w-8 text-white" />
                      <span className="mt-1 select-none font-bold text-white text-xs shadow-lg">
                        10s
                      </span>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Center Play Button */}
          <AnimatePresence>
            {showControls && !isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="pointer-events-auto rounded-full bg-white/20 p-4 backdrop-blur-sm transition-colors hover:bg-white/30"
                  onClick={togglePlay}
                >
                  <Play className="h-12 w-12 fill-white text-white" />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Controls Bar */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute right-0 bottom-0 left-0 z-40 flex flex-col gap-3 px-4 py-3"
              >
                {/* Progress Bar */}
                <div
                  onClick={handleProgressClick}
                  onMouseMove={handleProgressHover}
                  onMouseLeave={handleProgressLeave}
                  className="group/progress relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-2"
                  role="button"
                  aria-label="Seek"
                  tabIndex={0}
                >
                  {/* Buffered indicator */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/40"
                    style={{ width: `${buffered}%` }}
                  />

                  {/* Progress indicator */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />

                  {/* Chapter markers */}
                  {chapters.length > 0 && duration > 0 && (
                    <div className="pointer-events-none absolute inset-0 h-full w-full">
                      {chapters.map((chapter, index) => {
                        if (index === 0) return null;
                        const left = (chapter.startTime / duration) * 100;
                        return (
                          <div
                            key={index}
                            className="absolute top-0 bottom-0 z-10 w-0.5 bg-black/50"
                            style={{ left: `${left}%` }}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Scrubber */}
                  <motion.div
                    className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2 z-20 h-4 w-4 rounded-full bg-white opacity-0 shadow-lg transition-opacity group-hover/progress:opacity-100"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />

                  {/* Hover Time Tooltip */}
                  <AnimatePresence>
                    {hoverTime !== null && hoverPosition !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="-translate-x-1/2 pointer-events-none absolute bottom-full z-50 mb-4 flex flex-col items-center gap-0.5 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-2 py-1 text-white text-xs"
                        style={{ left: `${hoverPosition}%` }}
                      >
                        {chapters.length > 0 && (
                          <span className="font-medium text-white/90">
                            {
                              chapters.find((c, i) => {
                                const nextChapter = chapters[i + 1];
                                return (
                                  hoverTime >= c.startTime &&
                                  (!nextChapter ||
                                    hoverTime < nextChapter.startTime)
                                );
                              })?.title
                            }
                          </span>
                        )}
                        <span
                          className={chapters.length > 0 ? "text-white/70" : ""}
                        >
                          {formatTime(hoverTime)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time Display and Controls */}
                <div className="flex items-center justify-between gap-2">
                  {/* Left Controls */}
                  <div className="flex items-center gap-1">
                    {/* Play/Pause */}
                    <Tooltip
                      label={isPlaying ? "Pause (Space)" : "Play (Space)"}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePlay}
                        className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                        aria-label="Play/Pause"
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5 fill-white text-white" />
                        ) : (
                          <Play className="h-5 w-5 fill-white text-white" />
                        )}
                      </motion.button>
                    </Tooltip>

                    {/* Skip Back 10s */}
                    <Tooltip label="Previous 10 seconds (J)">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSkip(-10)}
                        className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                        aria-label="Skip back 10 seconds"
                      >
                        <RotateCcw className="h-5 w-5 text-white" />
                      </motion.button>
                    </Tooltip>

                    {/* Skip Forward 10s */}
                    <Tooltip label="Next 10 seconds (L)">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSkip(10)}
                        className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                        aria-label="Skip forward 10 seconds"
                      >
                        <RotateCw className="h-5 w-5 text-white" />
                      </motion.button>
                    </Tooltip>

                    {/* Previous Video */}
                    {currentVideoIndex > 0 && (
                      <Tooltip label="Previous Video">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onPrevVideo}
                          className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                          aria-label="Previous video"
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </motion.button>
                      </Tooltip>
                    )}

                    {/* Next Video */}
                    {currentVideoIndex < totalVideos - 1 && (
                      <Tooltip label="Next Video">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onNextVideo}
                          className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                          aria-label="Next video"
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </motion.button>
                      </Tooltip>
                    )}

                    {/* Volume Control */}
                    <div className="flex items-center gap-1">
                      <Tooltip label={isMuted ? "Unmute (M)" : "Mute (M)"}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onMouseEnter={() => setShowVolumeSlider(true)}
                          onMouseLeave={() => setShowVolumeSlider(false)}
                          onClick={toggleMute}
                          className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                          aria-label="Mute/Unmute"
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5 text-white" />
                          ) : (
                            <Volume2 className="h-5 w-5 text-white" />
                          )}
                        </motion.button>
                      </Tooltip>

                      {/* Volume Slider */}
                      <AnimatePresence>
                        {showVolumeSlider && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 80 }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex items-center overflow-hidden pl-2"
                            onMouseEnter={() => setShowVolumeSlider(true)}
                            onMouseLeave={() => setShowVolumeSlider(false)}
                          >
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={isMuted ? 0 : volume}
                              onChange={(e) =>
                                handleVolumeChange([
                                  Number.parseFloat(e.target.value),
                                ])
                              }
                              className="h-1 w-full cursor-pointer appearance-none rounded-full focus:outline-none [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                              style={{
                                background: `linear-gradient(to right, white ${isMuted ? 0 : volume * 100}%, rgba(255, 255, 255, 0.2) ${isMuted ? 0 : volume * 100}%)`,
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Time Display */}
                    <span className="ml-2 flex min-w-24 items-center text-sm text-white">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-1">
                    {/* Captions */}
                    {tracks.length > 0 && (
                      <div className="relative flex items-center">
                        <Tooltip label="Captions (C)">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (tracks.length === 1 && tracks[0]) {
                                handleCaptionChange(
                                  currentCaption ? null : tracks[0].srcLang,
                                );
                              } else {
                                setActiveDialog(
                                  activeDialog === "captions"
                                    ? null
                                    : "captions",
                                );
                              }
                            }}
                            className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                              currentCaption
                                ? "bg-cyan-500/30 hover:bg-cyan-500/40"
                                : "hover:bg-white/20"
                            }`}
                            aria-label="Captions"
                          >
                            <MessageCircle className="h-5 w-5 text-white" />
                          </motion.button>
                        </Tooltip>

                        <AnimatePresence>
                          {activeDialog === "captions" && tracks.length > 1 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 bottom-full z-50 mb-2 min-w-40 rounded-lg border border-white/10 bg-black/95 p-3 backdrop-blur-sm"
                            >
                              <p className="mb-2 font-semibold text-white text-xs uppercase opacity-70">
                                Captions
                              </p>
                              <div className="space-y-1">
                                <button
                                  onClick={() => {
                                    handleCaptionChange(null);
                                    setActiveDialog(null);
                                  }}
                                  className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                                    !currentCaption
                                      ? "bg-cyan-500 text-white"
                                      : "text-white/70 hover:bg-white/10"
                                  }`}
                                >
                                  Off
                                </button>
                                {tracks.map((track) => (
                                  <button
                                    key={track.srcLang}
                                    onClick={() => {
                                      handleCaptionChange(track.srcLang);
                                      setActiveDialog(null);
                                    }}
                                    className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                                      currentCaption === track.srcLang
                                        ? "bg-cyan-500 text-white"
                                        : "text-white/70 hover:bg-white/10"
                                    }`}
                                  >
                                    {track.label}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Picture-in-Picture */}
                    <Tooltip label="Picture in Picture (P)">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePictureInPicture}
                        className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                          isPictureInPicture
                            ? "bg-cyan-500/30 hover:bg-cyan-500/40"
                            : "hover:bg-white/20"
                        }`}
                        aria-label="Picture in Picture"
                      >
                        <PictureInPicture2 className="h-5 w-5 text-white" />
                      </motion.button>
                    </Tooltip>

                    {/* Settings */}
                    <div className="relative flex items-center">
                      <Tooltip label="Settings">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setActiveDialog(
                              activeDialog === "settings" ? null : "settings",
                            )
                          }
                          className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                            activeDialog === "settings"
                              ? "bg-cyan-500/30"
                              : "hover:bg-white/20"
                          }`}
                          aria-label="Settings"
                        >
                          <Settings className="h-5 w-5 text-white" />
                        </motion.button>
                      </Tooltip>

                      <AnimatePresence>
                        {activeDialog === "settings" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 bottom-full z-50 mb-2 min-w-40 rounded-lg border border-white/10 bg-black/95 p-3 backdrop-blur-sm"
                          >
                            {/* Quality Selection */}
                            {availableQualities.length > 1 && (
                              <div className="mb-3">
                                <p className="mb-2 font-semibold text-white text-xs uppercase opacity-70">
                                  Quality
                                </p>
                                <div className="space-y-1">
                                  {availableQualities.map((q) => (
                                    <button
                                      key={q}
                                      onClick={() => handleQualityChange(q)}
                                      className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                                        quality === q
                                          ? "bg-cyan-500 text-white"
                                          : "text-white/70 hover:bg-white/10"
                                      }`}
                                    >
                                      {q}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Speed Selection */}
                            <div>
                              <p className="mb-2 font-semibold text-white text-xs uppercase opacity-70">
                                Speed
                              </p>
                              <div className="space-y-1">
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => handleSpeedChange(s)}
                                    className={`w-full rounded px-2 py-1 text-left text-sm transition-colors ${
                                      speed === s
                                        ? "bg-cyan-500 text-white"
                                        : "text-white/70 hover:bg-white/10"
                                    }`}
                                  >
                                    {s}x
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* More Options */}
                    <div className="relative flex items-center">
                      <Tooltip label="More Options">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setActiveDialog(
                              activeDialog === "options" ? null : "options",
                            )
                          }
                          className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                            activeDialog === "options"
                              ? "bg-cyan-500/30"
                              : "hover:bg-white/20"
                          }`}
                          aria-label="More options"
                        >
                          <MoreVertical className="h-5 w-5 text-white" />
                        </motion.button>
                      </Tooltip>

                      <AnimatePresence>
                        {activeDialog === "options" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 bottom-full z-50 mb-2 min-w-48 rounded-lg border border-white/10 bg-black/95 p-2 backdrop-blur-sm"
                          >
                            {/* Theater Mode */}
                            <button
                              onClick={() => {
                                toggleTheaterMode();
                                setActiveDialog(null);
                              }}
                              className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-white transition-colors hover:bg-white/10"
                            >
                              <Maximize2 className="h-4 w-4" />
                              {isTheaterMode
                                ? "Exit Theater Mode"
                                : "Theater Mode"}
                            </button>

                            {/* Loop */}
                            <button
                              onClick={() => handleToggleLoop()}
                              className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors ${
                                isLooping
                                  ? "bg-cyan-500/30 text-white"
                                  : "text-white hover:bg-white/10"
                              }`}
                            >
                              <Repeat className="h-4 w-4" />
                              Loop
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Fullscreen */}
                    <Tooltip
                      label={
                        isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"
                      }
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleFullscreen}
                        className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/20"
                        aria-label="Fullscreen"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5 text-white" />
                        ) : (
                          <Maximize className="h-5 w-5 text-white" />
                        )}
                      </motion.button>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);
VideoPlayer.displayName = "VideoPlayer";
