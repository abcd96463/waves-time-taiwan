import React, { useState, useMemo } from 'react';
import { SURF_SPOTS } from '../data/surfData';
import { SurfSpot, WindDirection, TidePreference } from '../types/surf';
import { Wind, Waves, Gauge, AlertCircle, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface SurfForecastSimulatorProps {
  initialSpot?: SurfSpot | null;
}

export const SurfForecastSimulator: React.FC<SurfForecastSimulatorProps> = ({ initialSpot }) => {
  const [selectedSpotId, setSelectedSpotId] = useState<string>(initialSpot?.id || 'jinzun');
  const [swellHeight, setSwellHeight] = useState<number>(1.8); // meters
  const [wavePeriod, setWavePeriod] = useState<number>(11); // seconds
  const [windDir, setWindDir] = useState<WindDirection>('SW');
  const [windSpeed, setWindSpeed] = useState<number>(8); // knots
  const [tidePhase, setTidePhase] = useState<'low' | 'mid-rising' | 'high' | 'mid-falling'>('mid-rising');

  // Sync if initialSpot changes externally
  React.useEffect(() => {
    if (initialSpot) {
      setSelectedSpotId(initialSpot.id);
    }
  }, [initialSpot]);

  const currentSpot = useMemo(() => {
    return SURF_SPOTS.find((s) => s.id === selectedSpotId) || SURF_SPOTS[0];
  }, [selectedSpotId]);

  // Compute Wave Dynamics based on real Taitung oceanography
  const analysis = useMemo(() => {
    let score = 70;
    const notes: string[] = [];

    // Period evaluation
    if (wavePeriod >= 12) {
      score += 18;
      notes.push('長週期深海湧浪 (Groundswell)，浪壁推力充沛且間隔分明');
    } else if (wavePeriod >= 9) {
      score += 8;
      notes.push('中長週期湧浪，浪型規律適中');
    } else {
      score -= 15;
      notes.push('短週期風浪 (Windswell)，浪與浪之間距離緊密推力較弱');
    }

    // Wind direction vs spot orientation
    // East coast spots (Jinzun, Donghe, Dulan, Jihui, Wushibi) face East/Northeast
    // Offshore winds are W, SW, NW (coming from land/Central Mountain Range)
    // Onshore winds are E, NE, SE (coming from Pacific directly)
    const isOffshore = windDir === 'SW' || windDir === 'W' || windDir === 'NW';
    const isOnshore = windDir === 'NE' || windDir === 'E' || windDir === 'SE';

    if (isOffshore) {
      if (windSpeed <= 12) {
        score += 15;
        notes.push('完美離岸風撫平浪壁，海面鏡面 (Glassy)，捲管極佳');
      } else {
        score += 5;
        notes.push('強離岸風抑制浪崩潰，下水起乘需多加一至兩下划水');
      }
    } else if (isOnshore) {
      if (windSpeed > 15) {
        score -= 25;
        notes.push('強向岸風吹亂浪面 (Chop)，浪花破碎雜亂無整齊浪壁');
      } else {
        score -= 10;
        notes.push('輕微向岸風，水面有些微細碎風波');
      }
    } else {
      // Crosswind (N, S)
      score -= 5;
      notes.push('側風吹拂，一側浪壁較斜');
    }

    // Swell size check for spot level
    const waveFaceFt = Math.round(swellHeight * 3.28 * (wavePeriod >= 11 ? 1.4 : 1.15));
    if (currentSpot.level === 'beginner' && swellHeight > 2.0) {
      notes.push('⚠️ 此浪高已超過初學者安全標準，建議轉往避風淺灘');
    } else if (currentSpot.level === 'advanced' && swellHeight < 1.0) {
      score -= 10;
      notes.push('礁石定點需一定浪高方能推升，此浪高稍顯不足');
    }

    // Tide compatibility
    if (currentSpot.id === 'jihui' && tidePhase === 'low') {
      score -= 20;
      notes.push('⚠️ 基翬乾潮底暗礁露出嚴重，極易受傷！');
    } else if (currentSpot.id === 'donghe' && (tidePhase === 'mid-rising' || tidePhase === 'high')) {
      score += 8;
      notes.push('東河河口水深適當，水流平緩出浪長');
    }

    // Clamp score 0 - 100
    const finalScore = Math.max(20, Math.min(98, score));

    let status = '普通尚可 (Fair)';
    let badgeColor = 'text-amber-400 border-amber-800/60 bg-amber-950/20';

    if (finalScore >= 88) {
      status = '神級浪況 (Epic Conditions)';
      badgeColor = 'text-emerald-400 border-emerald-800/60 bg-emerald-950/30';
    } else if (finalScore >= 75) {
      status = '優良平整 (Clean & Glassy)';
      badgeColor = 'text-cyan-400 border-cyan-800/60 bg-cyan-950/30';
    } else if (finalScore < 50) {
      status = '雜亂吹爛 (Blown Out)';
      badgeColor = 'text-rose-400 border-rose-800/60 bg-rose-950/30';
    }

    return {
      finalScore,
      status,
      badgeColor,
      waveFaceFt,
      notes,
      isOffshore,
    };
  }, [swellHeight, wavePeriod, windDir, windSpeed, tidePhase, currentSpot]);

  // Quick condition presets
  const applyPreset = (preset: 'epic' | 'dawn' | 'typhoon' | 'blown') => {
    if (preset === 'epic') {
      setSelectedSpotId('jinzun');
      setSwellHeight(2.2);
      setWavePeriod(13);
      setWindDir('SW');
      setWindSpeed(7);
      setTidePhase('mid-rising');
    } else if (preset === 'dawn') {
      setSelectedSpotId('donghe');
      setSwellHeight(1.2);
      setWavePeriod(11);
      setWindDir('W');
      setWindSpeed(4);
      setTidePhase('mid-rising');
    } else if (preset === 'typhoon') {
      setSelectedSpotId('jihui');
      setSwellHeight(3.2);
      setWavePeriod(14);
      setWindDir('SW');
      setWindSpeed(9);
      setTidePhase('mid-rising');
    } else if (preset === 'blown') {
      setSelectedSpotId('dulan');
      setSwellHeight(2.5);
      setWavePeriod(7);
      setWindDir('NE');
      setWindSpeed(24);
      setTidePhase('high');
    }
  };

  return (
    <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <span>實時海象演算法</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>台東浪況模擬分析儀</span>
        </div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
          風、浪、潮的微妙交織：即時模擬浪況
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          台東衝浪最迷人之處在於多變的地貌與風向。調校湧浪高度、週期、風向與潮位，即時運算各浪點的浪壁質量與可衝指數。
        </p>
      </div>

      {/* Quick Presets Row */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 mr-2">經典場景一鍵載入：</span>
        <button
          onClick={() => applyPreset('epic')}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-cyan-400 hover:text-white transition-colors"
        >
          金樽 WSL 國際賽日 (2.2m · 13s)
        </button>
        <button
          onClick={() => applyPreset('dawn')}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-cyan-400 hover:text-white transition-colors"
        >
          東河破曉玻璃鏡面浪 (1.2m · 11s)
        </button>
        <button
          onClick={() => applyPreset('typhoon')}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-cyan-400 hover:text-white transition-colors"
        >
          基翬太平洋颱風長浪 (3.2m · 14s)
        </button>
        <button
          onClick={() => applyPreset('blown')}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-md hover:border-cyan-400 hover:text-white transition-colors"
        >
          冬日強東北風吹爛 (2.5m · 7s)
        </button>
      </div>

      {/* Main Simulator Layout: Controls (Left) + Real-time Analysis (Right) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-6">
          {/* Spot Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
              選擇測試浪點 (Target Surf Spot)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SURF_SPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpotId(spot.id)}
                  className={`p-2.5 rounded-lg text-left border transition-all text-xs ${
                    selectedSpotId === spot.id
                      ? 'border-cyan-400 bg-cyan-950/30 text-white font-semibold'
                      : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-medium text-slate-200 truncate">{spot.nameZh.split(' ')[0]}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{spot.township.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Swell Height Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">湧浪高度 (Swell Height)</span>
              <span className="font-mono tabular-nums text-cyan-400 text-sm font-bold">
                {swellHeight.toFixed(1)} 公尺 <span className="text-slate-400 font-normal">({(swellHeight * 3.28).toFixed(1)} 呎)</span>
              </span>
            </div>
            <input
              type="range"
              min="0.4"
              max="4.0"
              step="0.1"
              value={swellHeight}
              onChange={(e) => setSwellHeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0.4m (平靜小膝浪)</span>
              <span>1.8m (經典肩頭浪)</span>
              <span>4.0m+ (極限巨浪)</span>
            </div>
          </div>

          {/* Swell Period Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">湧浪週期 (Wave Period)</span>
              <span className="font-mono tabular-nums text-emerald-400 text-sm font-bold">
                {wavePeriod} 秒 <span className="text-slate-400 font-normal">{wavePeriod >= 11 ? '(長週期優良湧浪)' : '(短週期風波)'}</span>
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="16"
              step="1"
              value={wavePeriod}
              onChange={(e) => setWavePeriod(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>6s (雜亂短風浪)</span>
              <span>11s (深海湧浪黃金期)</span>
              <span>16s (太平洋遠洋巨湧)</span>
            </div>
          </div>

          {/* Wind Direction & Wind Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                岸邊風向 (Wind Direction)
              </label>
              <div className="grid grid-cols-4 gap-1 text-xs">
                {(['SW', 'W', 'NW', 'N', 'NE', 'E', 'SE', 'S'] as WindDirection[]).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setWindDir(dir)}
                    className={`py-2 px-1 rounded-md text-center border font-mono transition-colors ${
                      windDir === dir
                        ? 'border-amber-400 bg-amber-950/40 text-amber-300 font-bold'
                        : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5">
                {windDir === 'SW' || windDir === 'W' || windDir === 'NW'
                  ? '✨ 台東東海岸完美離岸風向'
                  : '向岸風或側風，影響海面平整度'}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-slate-300">風速 (Wind Speed)</span>
                <span className="font-mono tabular-nums text-amber-400 font-bold">{windSpeed} 節 (kts)</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-3"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                <span>微風無波 (2-6kts)</span>
                <span>清風良好 (7-12kts)</span>
                <span>強風吹散 (20+kts)</span>
              </div>
            </div>
          </div>

          {/* Tide Phase */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              當前潮汐階段 (Tide Stage)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'low', label: '乾潮底 (Low Tide)' },
                { id: 'mid-rising', label: '起漲潮 (Mid-Rising)' },
                { id: 'high', label: '滿潮 (High Tide)' },
                { id: 'mid-falling', label: '退潮半潮 (Mid-Falling)' },
              ].map((tide) => (
                <button
                  key={tide.id}
                  onClick={() => setTidePhase(tide.id as any)}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-colors ${
                    tidePhase === tide.id
                      ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                      : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-white'
                  }`}
                >
                  {tide.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Calculation Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400">當前浪點分析：</span>
                <h4 className="text-lg font-bold text-white">{currentSpot.nameZh}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">浪況綜合評分</span>
                <div className="text-2xl font-mono tabular-nums font-extrabold text-cyan-400">
                  {analysis.finalScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                </div>
              </div>
            </div>

            {/* Quality badge */}
            <div className="mt-5 p-3.5 rounded-xl border flex items-center justify-between bg-slate-950/50">
              <span className="text-xs text-slate-400">海象狀態判定：</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-md border ${analysis.badgeColor}`}>
                {analysis.status}
              </span>
            </div>

            {/* Wave Face & Board Metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-850 border border-slate-800">
                <div className="text-slate-400">換算浪壁高度 (Face)</div>
                <div className="text-base font-bold text-white font-mono tabular-nums mt-0.5">
                  約 {analysis.waveFaceFt} 呎
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {analysis.waveFaceFt <= 3 ? '齊腰左右' : analysis.waveFaceFt <= 6 ? '齊胸至頭頂' : '過頭大浪 (Overhead)'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-850 border border-slate-800">
                <div className="text-slate-400">離岸風鏡面狀態</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {analysis.isOffshore ? '🟢 離岸風 (平整)' : '🔴 向岸/側風 (有波紋)'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  風速 {windSpeed} 節 · {windDir}
                </div>
              </div>
            </div>

            {/* Observation Notes list */}
            <div className="mt-5 space-y-2">
              <div className="text-xs font-semibold text-slate-300">海象即時診斷重點：</div>
              {analysis.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-850/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-400">此浪況首選板型：</span>
            <div className="font-semibold text-cyan-300 mt-1">
              {analysis.waveFaceFt <= 3
                ? '9\'0+ 復古長板、Mid-length 中長板或初學軟板'
                : analysis.waveFaceFt <= 6
                ? 'Fish 雙舵魚板、All-around 性能短板或 9\'2 競賽長板'
                : 'Step-up 大浪板、Round Pin 性能短板 (進階限定)'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
