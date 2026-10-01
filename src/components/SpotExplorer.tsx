import React, { useState, useMemo } from 'react';
import { SURF_SPOTS } from '../data/surfData';
import { SurfSpot, SurfLevel, WaveType } from '../types/surf';
import { MapPin, Waves, Compass, Wind, AlertTriangle, ChevronRight, X, Sparkles, Trophy } from 'lucide-react';

interface SpotExplorerProps {
  onSelectSpotForSimulation: (spot: SurfSpot) => void;
}

export const SpotExplorer: React.FC<SpotExplorerProps> = ({ onSelectSpotForSimulation }) => {
  const [selectedLevel, setSelectedLevel] = useState<SurfLevel | 'all'>('all');
  const [selectedType, setSelectedType] = useState<WaveType | 'all'>('all');
  const [activeSpot, setActiveSpot] = useState<SurfSpot | null>(null);

  const filteredSpots = useMemo(() => {
    return SURF_SPOTS.filter((spot) => {
      const matchLevel = selectedLevel === 'all' || spot.level === selectedLevel;
      const matchType = selectedType === 'all' || spot.waveType === selectedType;
      return matchLevel && matchType;
    });
  }, [selectedLevel, selectedType]);

  return (
    <section id="spots" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <span>台東浪點地圖與指南</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>台11線東海岸與南迴線</span>
        </div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
          六大經典浪點 · 太平洋的每一次浪湧
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          從初學者踏出第一步的都蘭溫柔黑沙灘，到世界衝浪公開賽激戰的金尊長浪，再到考驗技術的基翬火山礁石管浪。挑選適合你當前階段的海域，安全享受浪壁馳騁。
        </p>
      </div>

      {/* Interactive Filter Bars */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        {/* Level filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto text-xs font-medium">
          <span className="text-slate-400 px-2 py-1 shrink-0">程度分類：</span>
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedLevel === 'all'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            全部 ({SURF_SPOTS.length})
          </button>
          <button
            onClick={() => setSelectedLevel('beginner')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedLevel === 'beginner'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            新手入門
          </button>
          <button
            onClick={() => setSelectedLevel('intermediate')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedLevel === 'intermediate'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            中階好手
          </button>
          <button
            onClick={() => setSelectedLevel('advanced')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedLevel === 'advanced'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            進階 / 大浪
          </button>
        </div>

        {/* Wave Type filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto text-xs font-medium">
          <span className="text-slate-400 px-2 py-1 shrink-0">浪底質地：</span>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedType === 'all'
                ? 'bg-slate-750 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            不拘
          </button>
          <button
            onClick={() => setSelectedType('beach')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedType === 'beach'
                ? 'bg-slate-750 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            黑沙灘浪
          </button>
          <button
            onClick={() => setSelectedType('point')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedType === 'point'
                ? 'bg-slate-750 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            鵝卵石定點浪
          </button>
          <button
            onClick={() => setSelectedType('reef')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedType === 'reef'
                ? 'bg-slate-750 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            珊瑚礁管浪
          </button>
          <button
            onClick={() => setSelectedType('rivermouth')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              selectedType === 'rivermouth'
                ? 'bg-slate-750 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            河口定點
          </button>
        </div>
      </div>

      {/* East Coast Route & Geographic Mini Indicator */}
      <div className="mt-6 mb-8 p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
          <span className="font-semibold text-slate-200">台11線由北至南浪點分佈：</span>
          <span className="hidden sm:inline">烏石鼻 (長濱 98K) → 基翬 (成功 116K) → 東河河口 (131.5K) → 金尊 (136.5K) → 都蘭 (146K) ；南迴：大溪 (台9線 409K)</span>
        </div>
        <span className="text-cyan-400 font-medium">共顯示 {filteredSpots.length} 個符合條件海域</span>
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => setActiveSpot(spot)}
            className="group relative cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/50 transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-cyan-950/30"
          >
            {/* Visual Image container with fallback */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-850">
              <img
                src={spot.image}
                alt={spot.nameZh}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Tag overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded">
                {spot.isWSLSpot && <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                <span>{spot.township}</span>
                <span className="text-slate-500">·</span>
                <span className="text-cyan-300">{spot.highwayKm}</span>
              </div>

              {/* Level indicator */}
              <div className="absolute bottom-3 left-3 text-xs font-semibold text-white drop-shadow">
                <span className={
                  spot.level === 'beginner' ? 'text-emerald-400' :
                  spot.level === 'intermediate' ? 'text-sky-400' : 'text-amber-400'
                }>
                  ● {spot.levelLabel}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {spot.nameZh}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  {spot.nameEn}
                </div>

                {/* Unboxed metadata row with typographic separators */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                  <span>{spot.waveTypeLabel}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{spot.directionLabel}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-mono tabular-nums text-cyan-300">{spot.waveHeightRange}</span>
                </div>

                {/* Excerpt */}
                <p className="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {spot.description}
                </p>
              </div>

              {/* Card Footer / Affordance */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Wind className="h-3.5 w-3.5 text-slate-500" />
                  <span>最佳風向：{spot.bestWind.split('·')[0]}</span>
                </span>
                <span className="font-medium text-cyan-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  詳細剖析 <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spot Deep Dive Modal */}
      {activeSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8">
            {/* Close button */}
            <button
              onClick={() => setActiveSpot(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <span>{activeSpot.township}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{activeSpot.highwayKm}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-amber-400">{activeSpot.highlightTag}</span>
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                {activeSpot.nameZh}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{activeSpot.nameEn}</p>
            </div>

            {/* Image banner inside modal */}
            <div className="mt-5 relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-800">
              <img
                src={activeSpot.image}
                alt={activeSpot.nameZh}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs text-slate-200">
                浪型級別：<span className="font-semibold text-cyan-300">{activeSpot.levelLabel}</span> · 浪高範圍：<span className="font-mono tabular-nums text-white">{activeSpot.waveHeightRange}</span>
              </div>
            </div>

            {/* Comprehensive Spot Specifications Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-850 border border-slate-800">
                <div className="text-slate-400 font-medium">起浪方向與浪型</div>
                <div className="text-white font-semibold mt-1">{activeSpot.directionLabel} ({activeSpot.waveTypeLabel})</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-850 border border-slate-800">
                <div className="text-slate-400 font-medium">最佳潮位 (Tide Phase)</div>
                <div className="text-white font-semibold mt-1">{activeSpot.bestTide}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-850 border border-slate-800">
                <div className="text-slate-400 font-medium">最佳離岸風向 (Offshore Wind)</div>
                <div className="text-cyan-300 font-semibold mt-1">{activeSpot.bestWind}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-850 border border-slate-800">
                <div className="text-slate-400 font-medium">最佳湧浪角度 (Swell Window)</div>
                <div className="text-emerald-300 font-semibold mt-1">{activeSpot.bestSwell}</div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-2">浪點地理與波浪特性</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeSpot.description}
              </p>
            </div>

            {/* Board recommendations & Hazards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-850/60 border border-slate-800">
                <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
                  <Waves className="h-4 w-4 text-cyan-400" />
                  <span>建議適用板型</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeSpot.idealBoard.map((board, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      <span>{board}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
                <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span>危險因素與注意安全</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-amber-200/90">
                  {activeSpot.hazards.map((hazard, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      <span>{hazard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Insider Pro Tip */}
            <div className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                <Sparkles className="h-4 w-4" />
                <span>浪人私房觀察日誌</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeSpot.insiderTip}
              </p>
            </div>

            {/* Action buttons inside modal */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveSpot(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                關閉
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectSpotForSimulation(activeSpot);
                  setActiveSpot(null);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Compass className="h-4 w-4" />
                <span>載入此浪點至模擬器</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
