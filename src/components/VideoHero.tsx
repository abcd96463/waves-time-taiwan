import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Upload, Maximize2 } from 'lucide-react';

interface VideoHeroProps {
  onScrollDown: () => void;
}

const DB_NAME = 'TaitungSurfVideoDB';
const STORE_NAME = 'videos';

export const VideoHero: React.FC<VideoHeroProps> = ({ onScrollDown }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoSrc, setVideoSrc] = useState<string>('/surf-video.mp4');
  const [isCustomVideo, setIsCustomVideo] = useState<boolean>(false);

  // Auto-play on mount and when video source changes
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
  }, [videoSrc]);

  // Load custom video from IndexedDB on mount if present
  useEffect(() => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get('hero_video_blob');
        getReq.onsuccess = () => {
          if (getReq.result instanceof Blob) {
            const blobUrl = URL.createObjectURL(getReq.result);
            setVideoSrc(blobUrl);
            setIsCustomVideo(true);
          }
        };
      };
    } catch {
      // IndexedDB fallback
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsCustomVideo(true);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }

      // Save to IndexedDB
      try {
        const request = indexedDB.open(DB_NAME, 1);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(file, 'hero_video_blob');
        };
      } catch {
        // ignore
      }
    }
  };

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[600px] overflow-hidden bg-slate-950 flex flex-col justify-between">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
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

      {/* Subtle overlay to enhance contrast without hiding the video */}
      <div 
        onClick={togglePlay}
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 cursor-pointer" 
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

      {/* Hidden file input for custom video upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/mp4,video/webm,video/quicktime,video/*"
        className="hidden"
      />

      {/* Top Floating Info / Upload Trigger */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-slate-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>{isCustomVideo ? '已載入自訂衝浪影片' : '東海岸太平洋實景浪管'}</span>
        </div>

        {/* Change Video Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/90 bg-slate-950/60 hover:bg-slate-900 border border-white/10 rounded-lg backdrop-blur-md transition-colors shadow-sm"
          title="上傳或更換自訂影片檔案"
        >
          <Upload className="h-3.5 w-3.5 text-cyan-400" />
          <span>更換/上傳影片</span>
        </button>
      </div>

      {/* Center Cinematic Aesthetic Brand Callout */}
      <div className="relative z-10 mx-auto text-center px-4 max-w-2xl select-none pointer-events-none">
        <div className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-cyan-300 drop-shadow-md mb-2">
          TAITUNG PACIFIC SWELL
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wider drop-shadow-lg">
          流浪臺灣
        </h2>
        <div className="text-xs sm:text-sm font-semibold tracking-widest text-slate-200/90 uppercase drop-shadow mt-1">
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
            title="全螢幕觀看"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Scroll down prompt */}
        <button
          onClick={onScrollDown}
          type="button"
          className="group flex flex-col items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-300 drop-shadow-sm group-hover:text-cyan-300">
            往下滑動探索浪點與海象 · SCROLL TO EXPLORE
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
