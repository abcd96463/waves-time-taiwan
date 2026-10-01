import React, { useState } from 'react';
import { SEASONAL_GUIDE } from '../data/surfData';
import { Calendar, Thermometer, ShieldAlert, Sparkles, Trophy, Award, MapPin } from 'lucide-react';

export const SeasonGuide: React.FC = () => {
  const [activeSeasonId, setActiveSeasonId] = useState<string>('autumn-winter');

  const currentSeason = SEASONAL_GUIDE.find((s) => s.id === activeSeasonId) || SEASONAL_GUIDE[0];

  return (
    <section id="seasons" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <span>太平洋四季水文紀律</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>什麼時候來台東衝浪最好？</span>
        </div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
          黑潮暖流與季風交會：台東四季浪況年曆
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          得益於太平洋深海的「黑潮」強烈暖流，台東即使在冬季最冷時，海水依然保持 22℃ 以上的舒適溫度。無論你是追求極限大浪還是悠閒享受陽光，台東每個月份都有專屬的起浪姿態。
        </p>
      </div>

      {/* Season Selection Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {SEASONAL_GUIDE.map((season) => (
          <button
            key={season.id}
            onClick={() => setActiveSeasonId(season.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeSeasonId === season.id
                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-sm'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>{season.seasonName}</span>
            <span className="text-xs font-normal text-slate-500">({season.months})</span>
          </button>
        ))}
      </div>

      {/* Active Season Detail Grid */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <span>最佳適宜：{currentSeason.bestFor}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {currentSeason.seasonName}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              湧浪動力來源：<span className="text-slate-200">{currentSeason.swellSource}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-850 border border-slate-800">
              <span className="text-slate-400">平均浪高範圍</span>
              <div className="text-base font-bold text-cyan-400 font-mono tabular-nums mt-0.5">
                {currentSeason.averageWaveSize}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-850 border border-slate-800">
              <span className="text-slate-400">海水平均溫度</span>
              <div className="text-base font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                {currentSeason.waterTemp}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-850 border border-slate-800">
              <span className="text-slate-400">防寒裝備建議</span>
              <div className="text-base font-bold text-amber-300 mt-0.5">
                {currentSeason.suitThickness}
              </div>
            </div>
          </div>
        </div>

        {/* Season specifics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3">
              當季核心浪況亮點
            </h4>
            <ul className="space-y-2.5">
              {currentSeason.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-850/50 p-3 rounded-lg border border-slate-800/80">
                  <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3">
              風向特徵與防寒穿著指南
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-lg bg-slate-850/50 border border-slate-800/80">
                <span className="text-slate-400 block mb-1">典型風向模式：</span>
                <p className="text-white leading-relaxed">{currentSeason.windPattern}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-850/50 border border-slate-800/80">
                <span className="text-slate-400 block mb-1">下水建議配備：</span>
                <p className="text-white leading-relaxed">{currentSeason.suitType}</p>
                <div className="text-[11px] text-slate-400 mt-2">
                  💡 溫馨提醒：台東冬季即使氣溫降至 16℃，在陽光照射與 22℃ 暖水浸泡下，一件合身的 2/3mm 防寒衣即可維持極佳體感靈活度。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Special Highlight: Taiwan Open of Surfing @ Jinzun */}
      <div className="mt-12 rounded-2xl border border-amber-900/40 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-950 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Trophy className="h-4 w-4" />
              <span>年度最高衝浪殿堂 · 每年11月金尊登場</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              臺灣國際衝浪公開賽 (Taiwan Open of Surfing)
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              台東金尊漁港是全台灣唯一連續多年獲得 WSL（世界衝浪聯盟）認證的世界巡迴積分賽主辦地。每年11月，來自澳洲、夏威夷、日本、印尼等全球頂尖長板與短板衝浪名將齊聚台東，在磅礡的太平洋湧浪中角逐冠軍榮銜。
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                金尊漁港雙陸連島起浪區
              </span>
              <span>·</span>
              <span>WSL QS / Longboard Tour 規格賽制</span>
              <span>·</span>
              <span className="text-amber-300 font-medium">觀賽免費入場開放</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-3 shrink-0 md:w-80">
            <div className="font-bold text-white text-sm">浪人觀賽最佳攻略</div>
            <div className="text-slate-300 leading-relaxed">
              最佳觀景視野位於「金尊遊憩區咖啡觀景台」，俯瞰整片沙灘左右浪壁一覽無遺；亦可攜帶野餐墊至防波堤旁沙灘近距離感受水花激盪。
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400">
              賽事期間同時舉辦東海岸文創浪人市集、原民音樂野台與衝浪體驗工作坊。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
