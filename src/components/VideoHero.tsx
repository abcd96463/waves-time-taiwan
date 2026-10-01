import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Maximize2 } from 'lucide-react';

interface VideoHeroProps {
  onScrollDown: () => void;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ onScrollDown }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto-play on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Autoplay prevented by browser, waiting for user click:', err);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden bg-slate-950 flex flex-col justify-between">
      {/* Video Element - Permanently plays user's 1080p surf video */}
      <video
        ref={videoRef}
        src="/surf-video.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover object-center cursor-pointer"
        onClick={togglePlay}
      />

      {/* Subtle overlay to enhance contrast without obscuring the wave */}
      <div 
        onClick={togglePlay}
        className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 cursor-pointer pointer-events-none" 
      />

      {/* Big Play Button Overlay when paused */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/30 backdrop-blur-[2px] cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-slate-900/80 border border-white/20 text-white shadow-2xl hover:scale-105 transition-transform">
            <Play className="h-10 w-10 text-cyan-400 fill-cyan-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">點擊開始播放影片</span>
          </div>
        </div>
      )}

      {/* Top Floating Badge - Clean & minimal */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>東海岸太平洋實景浪管</span>
        </div>
      </div>

      {/* Cinematic Aesthetic Brand Callout - Positioned at top-1/4 close to the top, matching cyan English text */}
      <div className="absolute top-[22%] sm:top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-2xl px-4 text-center select-none pointer-events-none">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-wider drop-shadow-2xl">
          流浪臺灣
        </h2>
        <div className="text-sm sm:text-base font-bold tracking-wider text-cyan-400 uppercase drop-shadow-lg mt-2">
          WAVES TIME TAIWAN
        </div>
      </div>

      {/* Bottom Controls & Scroll Down Anchor */}
      <div className="relative z-10 p-6 flex flex-col items-center gap-4">
        {/* Playback Controls Pill */}
        <div className="flex items-center gap-3 bg-slate-950/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
          <button
            onClick={togglePlay}
            className="p-1 text-slate-200 hover:text-white transition-colors"
            title={isPlaying ? '暫停播放' : '開始播放'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <span className="h-3 w-px bg-white/20" />

          <button
            onClick={toggleMute}
            className="p-1 text-slate-200 hover:text-white transition-colors"
            title={isMuted ? '開啟聲音' : '靜音'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <span className="h-3 w-px bg-white/20" />

          <button
            onClick={handleFullscreen}
            className="p-1 text-slate-200 hover:text-white transition-colors"
            title="全螢幕模式"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Scroll Prompt */}
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-1 text-xs text-slate-300 hover:text-cyan-400 transition-colors pt-2"
        >
          <span className="tracking-widest uppercase font-semibold text-[10px] text-cyan-300/90 group-hover:text-cyan-300">
            探索台灣浪點
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
