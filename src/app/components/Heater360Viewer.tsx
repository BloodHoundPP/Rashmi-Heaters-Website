import { useState, useEffect, useRef } from "react";
import { 
  RotateCw, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  MoveHorizontal, 
  Sparkles,
  Info,
  Sliders,
  Compass
} from "lucide-react";
import { Button } from "./ui/button";

interface Heater360ViewerProps {
  videoSrc: string;
}

export function Heater360Viewer({ videoSrc }: Heater360ViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Initialize and track video playback time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.playbackRate = playbackRate;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const promise = video.play();
    if (promise !== undefined) {
      promise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoSrc]);

  // Update playback rate dynamically
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Calculate current 360 rotation angle (0 to 360 degrees)
  const currentAngle = duration > 0 ? Math.floor((currentTime / duration) * 360) % 360 : 0;

  // Drag-to-Rotate mouse & touch handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (videoRef.current) {
      setStartTime(videoRef.current.currentTime);
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !videoRef.current || !containerRef.current || duration === 0) return;
    const deltaX = e.clientX - startX;
    const containerWidth = containerRef.current.clientWidth || 500;
    
    // Sensitivity multiplier for 360 degree spin feel
    const timeDelta = (deltaX / containerWidth) * duration * 0.8;
    let newTime = startTime + timeDelta;
    
    // Wrap around 360 video duration loop
    if (newTime < 0) newTime = duration + (newTime % duration);
    if (newTime > duration) newTime = newTime % duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      if (videoRef.current) {
        setStartTime(videoRef.current.currentTime);
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !videoRef.current || !containerRef.current || duration === 0 || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    const containerWidth = containerRef.current.clientWidth || 300;
    
    const timeDelta = (deltaX / containerWidth) * duration * 0.8;
    let newTime = startTime + timeDelta;
    
    if (newTime < 0) newTime = duration + (newTime % duration);
    if (newTime > duration) newTime = newTime % duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative select-none group w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-gradient-to-b from-black via-zinc-950 to-black max-h-[520px] transition-all duration-300 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* 360 Video Player Canvas */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-contain max-h-[520px] bg-black pointer-events-none"
      />

      {/* Top Left: 360° Angle Dial Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 bg-black/80 backdrop-blur-md border border-primary/40 px-3.5 py-1.5 rounded-full text-white shadow-xl">
        <div className="relative flex items-center justify-center">
          <RotateCw 
            size={16} 
            className={`text-primary ${isPlaying ? "animate-spin" : ""}`} 
            style={{ animationDuration: `${6 / playbackRate}s` }} 
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-primary tracking-widest leading-none">
            360° Interactive View
          </span>
          <span className="text-xs font-black text-white font-mono leading-tight">
            {currentAngle}° ROTATION
          </span>
        </div>
      </div>

      {/* Top Right: Interactive Drag Hint Pill */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/40 px-3 py-1.5 rounded-full text-primary text-xs font-semibold shadow-lg animate-pulse">
        <MoveHorizontal size={15} />
        <span>Drag Left / Right to Spin</span>
      </div>

      {/* Dynamic Interactive Hotspot Callouts based on Rotation Angle */}
      {showHotspots && (
        <>
          {currentAngle >= 30 && currentAngle <= 120 && (
            <div className="absolute top-1/3 left-1/4 z-20 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md border border-primary/50 text-white px-3 py-1.5 rounded-xl shadow-xl">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-primary uppercase">Feature Highlight</p>
                  <p className="text-xs font-semibold">Terminal Junction Box</p>
                </div>
              </div>
            </div>
          )}

          {currentAngle >= 130 && currentAngle <= 240 && (
            <div className="absolute top-1/2 right-1/4 z-20 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md border border-primary/50 text-white px-3 py-1.5 rounded-xl shadow-xl">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-primary uppercase">Precision Heating</p>
                  <p className="text-xs font-semibold">High-Temp Element Array</p>
                </div>
              </div>
            </div>
          )}

          {currentAngle >= 250 && currentAngle <= 340 && (
            <div className="absolute bottom-1/3 left-1/3 z-20 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md border border-primary/50 text-white px-3 py-1.5 rounded-xl shadow-xl">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-primary uppercase">Heavy-Duty Construction</p>
                  <p className="text-xs font-semibold">Industrial Mounting Flange</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Drag Overlay Feedback Indicator when user is dragging */}
      {isDragging && (
        <div className="absolute inset-0 z-30 bg-black/30 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
          <div className="bg-black/90 text-white px-5 py-3 rounded-2xl border border-primary/50 flex items-center gap-3 shadow-2xl">
            <Compass size={24} className="text-primary animate-spin" />
            <div>
              <p className="text-xs font-bold text-primary uppercase">Manual 360° Control</p>
              <p className="text-sm font-semibold">{currentAngle}° Angle View</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls Toolbar */}
      <div 
        className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl text-white shadow-2xl transition-opacity duration-300 opacity-95 group-hover:opacity-100"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Play/Pause & Mute */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2 rounded-xl bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 transition-all hover:scale-105"
            title={isPlaying ? "Pause 360° Auto-Spin" : "Start 360° Auto-Spin"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-105"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Speed Selectors */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 ml-2">
            {[0.5, 1.0, 1.5].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setPlaybackRate(speed)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  playbackRate === speed
                    ? "bg-primary text-white shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Rotation Angle Range Bar */}
        <div className="hidden sm:flex flex-1 max-w-xs items-center gap-3 mx-4">
          <span className="text-[10px] font-bold text-white/50">0°</span>
          <div className="relative flex-1 h-2 bg-white/15 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary/60 via-primary to-accent transition-all duration-100"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-white/50">360°</span>
        </div>

        {/* Hotspots Toggle & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHotspots(!showHotspots)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHotspots 
                ? "bg-primary/20 text-primary border-primary/40" 
                : "bg-white/5 text-white/60 border-white/10 hover:text-white"
            }`}
            title="Toggle Feature Hotspots"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Highlights</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-105"
            title="Toggle Fullscreen Studio View"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
