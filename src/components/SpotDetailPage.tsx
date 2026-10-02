import React, { useEffect } from 'react';
import { SurfSpot } from '../types/surf';
import { SURF_SPOTS } from '../data/surfData';
import { TideChartSection } from './TideChartSection';
import { SpotSimulatorSidebarCard } from './SpotSimulatorSidebarCard';
import { 
  ArrowLeft, 
  MapPin, 
  Waves, 
  Wind, 
  Thermometer, 
  Compass, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Car, 
  ChevronRight,
  Sliders,
  Anchor
} from 'lucide-react';

interface SpotDetailPageProps {
  spot: SurfSpot;
  onBack: () => void;
  onOpenSimulator: (spot: SurfSpot) => void;
  onSelectSpot: (spot: SurfSpot) => void;
}

export const SpotDetailPage: React.FC<SpotDetailPageProps> = ({
  spot,
  onBack,
  onOpenSimulator,
  onSelectSpot,
}) => {
  // Scroll to top when spot detail mounts or changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [spot.id]);

  // Find other spots in the same or nearby region
  const relatedSpots = SURF_SPOTS.filter((s) => s.id !== spot.id && (s.region === spot.region || SURF_SPOTS.indexOf(s) < 4)).slice(0, 4);

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-16 z-30 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors py-1 px-2.5 -ml-2.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>返回全臺浪點地圖</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              {spot.regionLabel} · {spot.township}
            </span>
            <button
              onClick={() => onOpenSimulator(spot)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>海況模擬</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header with Visual Imagery */}
      <div className="relative w-full h-[380px] sm:h-[460px] overflow-hidden bg-slate-900">
        <img
          src={spot.image}
          alt={spot.nameZh}
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />

        {/* Hero Content */}
        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 px-3 py-1 rounded-md shadow-md">
              {spot.regionLabel || '全臺浪點'}
            </span>
            <span className="text-xs font-semibold bg-slate-900/90 text-slate-200 border border-slate-700 px-3 py-1 rounded-md backdrop-blur-md">
              {spot.levelLabel}
            </span>
            {spot.isWSLSpot && (
              <span className="text-xs font-bold bg-amber-500/90 text-slate-950 px-3 py-1 rounded-md flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                WSL 國際公開賽主場
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {spot.nameZh}
          </h1>
          <p className="text-sm sm:text-lg font-mono text-cyan-300/90 mt-1 uppercase tracking-wider">
            {spot.nameEn}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-cyan-400" />
              {spot.township} · {spot.highwayKm}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Waves className="h-4 w-4 text-cyan-400" />
              {spot.waveTypeLabel} · {spot.directionLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Deep Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Live Sea Conditions Banner */}
            <div className="bg-gradient-to-r from-cyan-950/60 to-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-widest">
                  <Waves className="h-4 w-4 text-cyan-400" />
                  <span>即時海況觀測數值</span>
                </div>
                <span className="text-[11px] text-slate-400">更新於太平洋標準氣象資料流</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="block text-xs text-slate-400">湧浪大小</span>
                  <span className="block text-xl sm:text-2xl font-black text-cyan-300 mt-1">
                    {spot.liveCondition?.swell || '1.6m'}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">常態 {spot.waveHeightRange}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="block text-xs text-slate-400">週期</span>
                  <span className="block text-xl sm:text-2xl font-black text-cyan-300 mt-1">
                    {spot.liveCondition?.period || '11s'}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">長週期推進力</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="block text-xs text-slate-400">風向風速</span>
                  <span className="block text-sm sm:text-base font-black text-cyan-300 mt-2 truncate" title={spot.liveCondition?.wind}>
                    {spot.liveCondition?.wind || '10kt 離岸風'}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">最佳: {spot.bestWind.split('·')[0]}</span>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="block text-xs text-slate-400">水溫</span>
                  <span className="block text-xl sm:text-2xl font-black text-cyan-300 mt-1 flex items-center justify-center gap-1">
                    <Thermometer className="h-4 w-4 text-cyan-400" />
                    {spot.liveCondition?.waterTemp || '24°C'}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">{spot.liveCondition?.tideStatus || '中潮起漲'}</span>
                </div>
              </div>
            </div>

            {/* Section 1: Detailed Overview (該浪點的詳細介紹) */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 mb-4">
                <span className="h-5 w-1.5 bg-cyan-400 rounded-full"></span>
                <span>浪點深度介紹與地形剖析</span>
              </h2>
              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
                <p className="font-normal text-slate-200 text-base sm:text-lg leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {spot.briefIntro}
                </p>
                <p className="text-slate-300 leading-loose">
                  {spot.description}
                </p>
              </div>

              {/* Insider Tip Box */}
              <div className="mt-6 bg-cyan-950/30 border border-cyan-500/40 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
                <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    在地浪人私房實戰守則 (Insider Tip)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {spot.insiderTip}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Oceanography & Conditions Matrix */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 mb-6">
                <span className="h-5 w-1.5 bg-cyan-400 rounded-full"></span>
                <span>黃金出浪指標 (Best Surfing Window)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Compass className="h-4 w-4" />
                    最佳湧向 (Best Swell)
                  </span>
                  <p className="text-sm font-semibold text-white">{spot.bestSwell}</p>
                  <p className="text-xs text-slate-400 mt-1">此方位湧浪推入時，折射角度最乾淨完整。</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Wind className="h-4 w-4" />
                    最佳風向 (Best Wind)
                  </span>
                  <p className="text-sm font-semibold text-white">{spot.bestWind}</p>
                  <p className="text-xs text-slate-400 mt-1">離岸風（Offshore）吹拂時，浪壁最為陡峭鏡面。</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Waves className="h-4 w-4" />
                    最佳潮汐 (Best Tide)
                  </span>
                  <p className="text-sm font-semibold text-white">{spot.bestTide}</p>
                  <p className="text-xs text-slate-400 mt-1">需嚴密配合潮汐漲退，避免乾潮觸底或滿潮過深。</p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <Anchor className="h-4 w-4" />
                    海床底質 (Seabed)
                  </span>
                  <p className="text-sm font-semibold text-white">{spot.seabed}</p>
                  <p className="text-xs text-slate-400 mt-1">決定起浪的形狀與下水/跌落安全性。</p>
                </div>
              </div>
            </section>

            {/* Section 3: Tide Forecast & 24h Tide Chart (滿潮與退潮時間及圖表) */}
            <TideChartSection spot={spot} />
          </div>

          {/* Right Column (4 cols): Sticky Quick Facts & Transportation */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. 實時海象浪況模擬分析儀（置於右側欄最上方） */}
            <SpotSimulatorSidebarCard spot={spot} />

            {/* Quick Specs Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>浪點規格速覽</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">適合板型推薦</span>
                  <div className="flex flex-wrap gap-1.5">
                    {spot.idealBoard.map((board, i) => (
                      <span key={i} className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded font-medium border border-slate-700">
                        {board}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">地理座標</span>
                  <span className="font-mono text-slate-300">
                    {spot.lat.toFixed(4)}°N, {spot.lng.toFixed(4)}°E
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">交通公路里程</span>
                  <span className="text-slate-300">{spot.highwayKm}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenSimulator(spot)}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-950"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>使用此浪點進行海洋模擬</span>
                </button>
              </div>
            </div>

            {/* Access & Transportation Guide */}
            {spot.accessGuide && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Car className="h-4 w-4 text-cyan-400" />
                  <span>交通抵達與停車指引</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {spot.accessGuide}
                </p>
              </div>
            )}

            {/* Other Nearby Spots in Taiwan */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-3">
                <span>周邊/推薦其他浪點</span>
                <span className="text-[11px] text-cyan-400">全臺切換</span>
              </h3>
              <div className="space-y-2">
                {relatedSpots.map((rSpot) => (
                  <button
                    key={rSpot.id}
                    onClick={() => onSelectSpot(rSpot)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-xs transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors block">
                        {rSpot.nameZh.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {rSpot.township} · {rSpot.levelLabel}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
