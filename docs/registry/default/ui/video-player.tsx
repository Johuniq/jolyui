"use client"

import {
    ChevronLeft,
    ChevronRight,
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
    VolumeX
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface QualitySource {
  quality: string
  src: string
}

interface CaptionTrack {
  src: string
  label: string
  srcLang: string
  default?: boolean
}

interface VideoPlayerProps {
  src: string | QualitySource[]
  tracks?: CaptionTrack[]
  poster?: string
  title?: string
  description?: string
  compact?: boolean
  onTimeUpdate?: (time: number) => void
  onNextVideo?: () => void
  onPrevVideo?: () => void
  currentVideoIndex?: number
  totalVideos?: number
}

const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded whitespace-nowrap pointer-events-none z-50"
      >
        {label}
      </motion.div>
    </div>
  )
}

export function VideoPlayer({
  src,
  tracks = [],
  poster,
  title,
  description,
  compact = false,
  onTimeUpdate,
  onNextVideo,
  onPrevVideo,
  currentVideoIndex = 0,
  totalVideos = 1,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [activeDialog, setActiveDialog] = useState<"settings" | "options" | "captions" | null>(null)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [quality, setQuality] = useState("auto")
  const [availableQualities, setAvailableQualities] = useState<string[]>([])
  const [currentSrc, setCurrentSrc] = useState("")
  const [speed, setSpeed] = useState(1)
  const [isPictureInPicture, setIsPictureInPicture] = useState(false)
  const [currentCaption, setCurrentCaption] = useState<string | null>(null)
  const [isTheaterMode, setIsTheaterMode] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)

  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Initialize quality sources
  useEffect(() => {
    if (Array.isArray(src)) {
      const qualities = src.map((s) => s.quality)
      setAvailableQualities(["auto", ...qualities])
      // Default to the first quality source if auto
      setCurrentSrc(src[0]?.src || "")
    } else {
      setAvailableQualities(["auto"])
      setCurrentSrc(src)
    }
  }, [src])

  // Initialize captions
  useEffect(() => {
    if (tracks.length > 0) {
      const defaultTrack = tracks.find(t => t.default)
      if (defaultTrack) {
        setCurrentCaption(defaultTrack.srcLang)
      }
    }
  }, [tracks])

  // Handle caption change
  const handleCaptionChange = (lang: string | null) => {
    setCurrentCaption(lang)
    if (videoRef.current) {
      const textTracks = videoRef.current.textTracks
      for (let i = 0; i < textTracks.length; i++) {
        const track = textTracks[i]
        if (track) {
          if (lang && track.language === lang) {
            track.mode = "showing"
          } else {
            track.mode = "hidden"
          }
        }
      }
    }
  }

  // Format time display
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        ;(containerRef.current as any).webkitRequestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  const toggleTheaterMode = () => {
    setIsTheaterMode(!isTheaterMode)
  }

  // Handle Picture-in-Picture
  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
        setIsPictureInPicture(false)
      } else if (videoRef.current && document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture()
        setIsPictureInPicture(true)
      }
    } catch (error) {
      console.error("PiP error:", error)
    }
  }

  // Handle quality change
  const handleQualityChange = (newQuality: string) => {
    if (!videoRef.current) return

    const currentTime = videoRef.current.currentTime
    const wasPlaying = !videoRef.current.paused

    setQuality(newQuality)

    if (Array.isArray(src)) {
      let newSrc = ""
      if (newQuality === "auto") {
        newSrc = src[0]?.src || ""
      } else {
        const source = src.find((s) => s.quality === newQuality)
        if (source) newSrc = source.src
      }

      if (newSrc && newSrc !== currentSrc) {
        setCurrentSrc(newSrc)
        // Restore playback position after source change
        const handleCanPlay = () => {
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime
            if (wasPlaying) videoRef.current.play()
            videoRef.current.removeEventListener("loadedmetadata", handleCanPlay)
          }
        }
        videoRef.current.addEventListener("loadedmetadata", handleCanPlay)
      }
    }
  }

  // Handle speed change
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed
    }
  }

  // Handle skip
  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const handleToggleLoop = () => {
    if (videoRef.current) {
      videoRef.current.loop = !videoRef.current.loop
      setIsLooping(!isLooping)
    }
  }

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0)
    setIsLoading(false)
  }

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0)
    if (onTimeUpdate) {
      onTimeUpdate(videoRef.current?.currentTime || 0)
    }

    // Update buffered amount
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
      setBuffered((bufferedEnd / duration) * 100)
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Handle mouse movement for controls
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [isPlaying])

  return (
    <div
      ref={containerRef}
      className={`group relative w-full bg-black rounded-lg overflow-hidden ${
        isTheaterMode ? "fixed inset-0 rounded-none w-screen h-screen z-50" : ""
      }`}
    >
      <div className={`relative w-full transition-all duration-300 ${isTheaterMode ? "h-screen" : "aspect-video"}`}>
        {/* Video Element */}
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
          className="absolute inset-0 w-full h-full"
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
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                <Loader2 className="w-12 h-12 text-white" />
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
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Center Play Button */}
        <AnimatePresence>
          {showControls && !isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Play className="w-12 h-12 text-white fill-white" />
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
              className="absolute bottom-0 left-0 right-0 px-4 py-3 flex flex-col gap-3"
            >
              {/* Progress Bar */}
              <div
                onClick={handleProgressClick}
                className="group/progress relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all"
              >
                {/* Buffered indicator */}
                <div className="absolute inset-y-0 left-0 bg-white/40 rounded-full" style={{ width: `${buffered}%` }} />
                {/* Progress indicator */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Scrubber */}
                <motion.div
                  className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover/progress:opacity-100 transition-opacity"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Time Display and Controls */}
              <div className="flex items-center justify-between gap-2">
                {/* Left Controls */}
                <div className="flex items-center gap-1">
                  {/* Play/Pause */}
                  <Tooltip label={isPlaying ? "Pause (Space)" : "Play (Space)"}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                      aria-label="Play/Pause"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white fill-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white fill-white" />
                      )}
                    </motion.button>
                  </Tooltip>

                  {/* Skip Back 10s */}
                  <Tooltip label="Previous 10 seconds (J)">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSkip(-10)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                      aria-label="Skip back 10 seconds"
                    >
                      <RotateCcw className="w-5 h-5 text-white" />
                    </motion.button>
                  </Tooltip>

                  {/* Skip Forward 10s */}
                  <Tooltip label="Next 10 seconds (L)">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSkip(10)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                      aria-label="Skip forward 10 seconds"
                    >
                      <RotateCw className="w-5 h-5 text-white" />
                    </motion.button>
                  </Tooltip>

                  {/* Previous Video */}
                  {currentVideoIndex > 0 && (
                    <Tooltip label="Previous Video">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onPrevVideo}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                        aria-label="Previous video"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
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
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                        aria-label="Next video"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
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
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                        aria-label="Mute/Unmute"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
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
                          className="overflow-hidden flex items-center pl-2"
                          onMouseEnter={() => setShowVolumeSlider(true)}
                          onMouseLeave={() => setShowVolumeSlider(false)}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange([Number.parseFloat(e.target.value)])}
                            className="w-full h-1 rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none"
                            style={{
                              background: `linear-gradient(to right, white ${isMuted ? 0 : volume * 100}%, rgba(255, 255, 255, 0.2) ${isMuted ? 0 : volume * 100}%)`
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Time Display */}
                  <span className="text-white text-sm ml-2 min-w-24 flex items-center">
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
                              handleCaptionChange(currentCaption ? null : tracks[0].srcLang)
                            } else {
                              setActiveDialog(activeDialog === "captions" ? null : "captions")
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                            currentCaption ? "bg-cyan-500/30 hover:bg-cyan-500/40" : "hover:bg-white/20"
                          }`}
                          aria-label="Captions"
                        >
                          <MessageCircle className="w-5 h-5 text-white" />
                        </motion.button>
                      </Tooltip>

                      <AnimatePresence>
                        {activeDialog === "captions" && tracks.length > 1 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg p-3 min-w-40 backdrop-blur-sm border border-white/10 z-50"
                          >
                            <p className="text-white text-xs font-semibold mb-2 uppercase opacity-70">Captions</p>
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  handleCaptionChange(null)
                                  setActiveDialog(null)
                                }}
                                className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                  !currentCaption ? "bg-cyan-500 text-white" : "text-white/70 hover:bg-white/10"
                                }`}
                              >
                                Off
                              </button>
                              {tracks.map((track) => (
                                <button
                                  key={track.srcLang}
                                  onClick={() => {
                                    handleCaptionChange(track.srcLang)
                                    setActiveDialog(null)
                                  }}
                                  className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                    currentCaption === track.srcLang ? "bg-cyan-500 text-white" : "text-white/70 hover:bg-white/10"
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
                      className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                        isPictureInPicture ? "bg-cyan-500/30 hover:bg-cyan-500/40" : "hover:bg-white/20"
                      }`}
                      aria-label="Picture in Picture"
                    >
                      <PictureInPicture2 className="w-5 h-5 text-white" />
                    </motion.button>
                  </Tooltip>

                  {/* Settings */}
                  <div className="relative flex items-center">
                    <Tooltip label="Settings">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveDialog(activeDialog === "settings" ? null : "settings")}
                        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                          activeDialog === "settings" ? "bg-cyan-500/30" : "hover:bg-white/20"
                        }`}
                        aria-label="Settings"
                      >
                        <Settings className="w-5 h-5 text-white" />
                      </motion.button>
                    </Tooltip>

                    <AnimatePresence>
                      {activeDialog === "settings" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg p-3 min-w-40 backdrop-blur-sm border border-white/10 z-50"
                        >
                          {/* Quality Selection */}
                          {availableQualities.length > 1 && (
                            <div className="mb-3">
                              <p className="text-white text-xs font-semibold mb-2 uppercase opacity-70">Quality</p>
                              <div className="space-y-1">
                                {availableQualities.map((q) => (
                                  <button
                                    key={q}
                                    onClick={() => handleQualityChange(q)}
                                    className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                      quality === q ? "bg-cyan-500 text-white" : "text-white/70 hover:bg-white/10"
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
                            <p className="text-white text-xs font-semibold mb-2 uppercase opacity-70">Speed</p>
                            <div className="space-y-1">
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => handleSpeedChange(s)}
                                  className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                    speed === s ? "bg-cyan-500 text-white" : "text-white/70 hover:bg-white/10"
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
                        onClick={() => setActiveDialog(activeDialog === "options" ? null : "options")}
                        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                          activeDialog === "options" ? "bg-cyan-500/30" : "hover:bg-white/20"
                        }`}
                        aria-label="More options"
                      >
                        <MoreVertical className="w-5 h-5 text-white" />
                      </motion.button>
                    </Tooltip>

                    <AnimatePresence>
                      {activeDialog === "options" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg p-2 min-w-48 backdrop-blur-sm border border-white/10 z-50"
                        >
                          {/* Theater Mode */}
                          <button
                            onClick={() => {
                              toggleTheaterMode()
                              setActiveDialog(null)
                            }}
                            className="w-full text-left px-3 py-2 rounded text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <Maximize2 className="w-4 h-4" />
                            {isTheaterMode ? "Exit Theater Mode" : "Theater Mode"}
                          </button>

                          {/* Loop */}
                          <button
                            onClick={() => handleToggleLoop()}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
                              isLooping ? "bg-cyan-500/30 text-white" : "text-white hover:bg-white/10"
                            }`}
                          >
                            <Repeat className="w-4 h-4" />
                            Loop
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Fullscreen */}
                  <Tooltip label="Fullscreen (F)">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleFullscreen}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
                      aria-label="Fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize className="w-5 h-5 text-white" />
                      ) : (
                        <Maximize className="w-5 h-5 text-white" />
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
  )
}
