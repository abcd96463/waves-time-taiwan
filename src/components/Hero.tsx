import React from 'react';
import { ArrowDown, Wind, Waves, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreSpots: () => void;
  onOpenSimulator: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSpots, onOpenSimulator, onOpenQuiz }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background visual asset with contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_taitung_jinzun_surf_1790862309376.jpg"
          alt="Surfer catching a wave at Jinzun Taitung with coastal mountain backdrop"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center brightness-90 contrast-105 scale-100"
          onError={(e) => {
            // Styled CSS fallback
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Measured dark scrim for WCAG AA compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      {/* Main hero content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col justify-center">
        {/* Editorial unboxed kicker / trust marker */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-medium tracking-wide text-cyan-300 mb-5">
          <span>台11線東海岸公路</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>WSL 臺灣國際衝浪公開賽主場</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>太平洋黑潮暖流 22℃~28℃</span>
        </div>

        {/* Headline with text-wrap balance */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl text-balance leading-[1.12]">
          面向太平洋的純粹浪管，
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 mt-2">
            台灣衝浪殿堂・台東。
          </span>
        </h1>

        {/* Value proposition paragraph */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          從金尊世界衝浪聯盟 (WSL) 錦標賽主場、東河長板定點河口，到都蘭黑沙灘浪人聚落與基翬傳奇礁石管浪。四季太平洋湧浪永不間歇，為每一次破曉划水注入最純粹的野性生命力。
        </p>

        {/* Primary & secondary action group */}
        <div className="mt-9 flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <button
            onClick={onExploreSpots}
            type="button"
            className="px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-950/50 whitespace-nowrap active:scale-95"
          >
            探索 6 大經典浪點
          </button>
          <button
            onClick={onOpenSimulator}
            type="button"
            className="px-6 py-3 text-sm font-medium text-slate-200 bg-slate-900/80 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all whitespace-nowrap active:scale-95"
          >
            風浪潮汐模擬器
          </button>
          <button
            onClick={onOpenQuiz}
            type="button"
            className="px-4 py-3 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4" />
            <span>尋找你的命定浪點</span>
          </button>
        </div>

        {/* Pacific Real-Time Marine Observation Strip */}
        <div className="mt-14 max-w-3xl rounded-xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide">
                太平洋今日實時浪海象觀測 (台東沿海)
              </span>
            </div>
            <div className="text-xs text-slate-400">
              氣象更新：今日 06:00 · 東北季風過境期
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
            <div>
              <div className="text-xs text-slate-400">湧浪高度 (Swell)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                1.8 — 2.2 <span className="text-xs font-sans font-normal text-slate-400">m</span>
              </div>
              <div className="text-[11px] text-cyan-400">適中厚實長浪</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">湧浪週期 (Period)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                11.4 <span className="text-xs font-sans font-normal text-slate-400">sec</span>
              </div>
              <div className="text-[11px] text-emerald-400">優良深海長波</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">岸邊風況 (Wind)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                SW 6-9 <span className="text-xs font-sans font-normal text-slate-400">kts</span>
              </div>
              <div className="text-[11px] text-amber-400">晨間微離岸風</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">潮汐狀態 (Tide)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                起漲潮 <span className="text-xs font-sans font-normal text-slate-400">+1.2m</span>
              </div>
              <div className="text-[11px] text-cyan-300">東河/金尊黃金期</div>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <a
        href="#spots"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-cyan-400 transition-colors p-2"
        aria-label="Scroll down to spots"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};
