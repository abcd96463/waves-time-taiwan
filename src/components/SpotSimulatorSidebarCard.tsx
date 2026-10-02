import React, { useState, useMemo, useEffect } from 'react';
import { SurfSpot, WindDirection } from '../types/surf';
import { calculateSpotSurfScore } from '../utils/surfScoreUtils';
import { Sliders, Sparkles, CheckCircle2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface SpotSimulatorSidebarCardProps {
  spot: SurfSpot;
}

export const SpotSimulatorSidebarCard: React.FC<SpotSimulatorSidebarCardProps> = ({ spot }) => {
  // Unit toggle for wave face height: 'metric' (公尺 m) vs 'imperial' (英呎 ft)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Simulation parameter states initialized from spot real live condition
  const defaultSwell = spot.liveCondition ? parseFloat(spot.liveCondition.swell) || 1.8 : 1.8;
  const defaultPeriod = spot.liveCondition ? parseInt(spot.liveCondition.period) || 11 : 11;
  const initialWindSpeed = spot.liveCondition?.wind?.match(/(\d+)\s*kt/i) 
    ? parseInt(spot.liveCondition.wind.match(/(\d+)\s*kt/i)![1], 10) 
    : 8;
  const initialWindDir: WindDirection = spot.liveCondition?.wind?.includes('東北') 
    ? 'NE' 
    : spot.liveCondition?.wind?.includes('東南') 
    ? 'SE' 
    : spot.liveCondition?.wind?.includes('西北') 
    ? 'NW' 
    : spot.liveCondition?.wind?.includes('西南') 
    ? 'SW' 
    : spot.liveCondition?.wind?.includes('南') 
    ? 'S' 
    : spot.liveCondition?.wind?.includes('北') 
    ? 'N' 
    : spot.liveCondition?.wind?.includes('東') 
    ? 'E' 
    : spot.liveCondition?.wind?.includes('西') 
    ? 'W' 
    : 'SW';

  const [swellHeight, setSwellHeight] = useState<number>(defaultSwell);
  const [wavePeriod, setWavePeriod] = useState<number>(defaultPeriod);
  const [windDir, setWindDir] = useState<WindDirection>(initialWindDir);
  const [windSpeed, setWindSpeed] = useState<number>(initialWindSpeed);
  const [tidePhase, setTidePhase] = useState<'low' | 'mid-rising' | 'high' | 'mid-falling'>('mid-rising');

  // Reset to current spot's real live conditions when spot changes
  useEffect(() => {
    setSwellHeight(defaultSwell);
    setWavePeriod(defaultPeriod);
    setWindSpeed(initialWindSpeed);
    setWindDir(initialWindDir);
  }, [spot.id]);

  // Collapsible drawer for advanced sliders
  const [showSliders, setShowSliders] = useState<boolean>(false);

  // Compute simulation analysis
  const analysis = useMemo(() => {
    return calculateSpotSurfScore(spot, {
      swellHeight,
      wavePeriod,
      windDir,
      windSpeed,
      tidePhase,
    });
  }, [spot, swellHeight, wavePeriod, windDir, windSpeed, tidePhase]);

  // Wave Face height display string according to active unit
  const waveFaceDisplay = useMemo(() => {
    if (unit === 'metric') {
      return {
        value: `${analysis.waveFaceM} m`,
        subText: analysis.waveFaceM <= 1.0 ? '腰胸浪 (Waist High)' : analysis.waveFaceM <= 2.0 ? '齊胸至一人高 (Chest to Head High)' : '過頭大浪 (Overhead+)',
      };
    } else {
      return {
        value: `${analysis.waveFaceFt} ft`,
        subText: analysis.waveFaceFt <= 3.5 ? '約 2~3 呎 (Waist High)' : analysis.waveFaceFt <= 6.5 ? '約 4~6 呎 (Chest to Head High)' : '7呎以上過頭巨浪 (Overhead+)',
      };
    }
  }, [analysis, unit]);

  // Quick preset loader
  const loadPreset = (type: 'epic' | 'dawn' | 'typhoon') => {
    if (type === 'epic') {
      setSwellHeight(2.2);
      setWavePeriod(13);
      setWindDir('SW');
      setWindSpeed(7);
      setTidePhase('mid-rising');
    } else if (type === 'dawn') {
      setSwellHeight(1.2);
      setWavePeriod(11);
      setWindDir('W');
      setWindSpeed(5);
      setTidePhase('mid-rising');
    } else if (type === 'typhoon') {
      setSwellHeight(3.2);
      setWavePeriod(14);
      setWindDir('SW');
      setWindSpeed(10);
      setTidePhase('mid-rising');
    }
  };

  return (
    <div className="bg-slate-900 border-2 border-cyan-500/70 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header: Title and Surf Condition Score */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-0.5">
            <Sliders className="h-3.5 w-3.5" />
            <span>海象浪況即時模擬儀</span>
          </div>
          <h3 className="text-lg font-black text-white">海況綜合評估</h3>
        </div>

        {/* 浪況綜合評分 */}
        <div className="text-right bg-slate-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">浪況綜合評分</span>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-2xl font-black font-mono text-cyan-300">
              {analysis.finalScore}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">/100</span>
          </div>
        </div>
      </div>

      {/* Quality Badge & Status */}
      <div className="mt-4 p-3 rounded-xl border flex items-center justify-between bg-slate-950/60">
        <span className="text-xs text-slate-400 font-medium">海象判定：</span>
        <span className={`text-xs font-black px-3 py-1 rounded-md border ${analysis.badgeColor}`}>
          {analysis.status}
        </span>
      </div>

      {/* Metric vs Imperial Toggle & Wave Face Height Card */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300">換算浪壁高度 (Wave Face)</span>
          {/* Unit Toggle: Metric (公制) vs Imperial (英制) */}
          <div className="flex items-center p-0.5 bg-slate-900 rounded-lg border border-slate-700">
            <button
              onClick={() => setUnit('metric')}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md transition-all ${
                unit === 'metric'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              公制 (m)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md transition-all ${
                unit === 'imperial'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              英制 (ft)
            </button>
          </div>
        </div>

        {/* Large Prominent Display */}
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 tracking-tight">
            約 {waveFaceDisplay.value}
          </div>
          <span className="text-xs text-amber-300 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
            {waveFaceDisplay.subText}
          </span>
        </div>
      </div>

      {/* Wind & Cleanliness Indicator */}
      <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">浪壁鏡面平整度：</span>
        <span className="font-bold text-white flex items-center gap-1.5">
          {analysis.isOffshore ? (
            <span className="text-emerald-400">🟢 完美離岸風 (平整無碎波)</span>
          ) : (
            <span className="text-amber-400">🟡 向岸側風 (浪壁稍有波紋)</span>
          )}
        </span>
      </div>

      {/* Instant Diagnosis Notes */}
      <div className="mt-4 space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          即時海況診斷重點：
        </span>
        {analysis.notes.map((note, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>{note}</span>
          </div>
        ))}
      </div>

      {/* Recommended Board */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">此浪況首選板型：</span>
        <span className="font-bold text-cyan-300 bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-500/40">
          {spot.idealBoard[0]}
        </span>
      </div>

      {/* Expandable Parameter Sliders Toggle */}
      <div className="mt-4">
        <button
          onClick={() => setShowSliders(!showSliders)}
          className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 flex items-center justify-between transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            <span>自訂微調海況數值 (Swell · Period · Wind)</span>
          </span>
          {showSliders ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {/* Collapsible Sliders Drawer */}
        {showSliders && (
          <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs animate-fadeIn">
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 text-[11px] mr-1">情境快速切換：</span>
              <button
                onClick={() => loadPreset('epic')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 font-semibold"
              >
                黃金大浪日 (2.2m·13s)
              </button>
              <button
                onClick={() => loadPreset('dawn')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-amber-300 font-semibold"
              >
                清晨鏡面 (1.2m·11s)
              </button>
              <button
                onClick={() => loadPreset('typhoon')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-rose-300 font-semibold"
              >
                遠洋長湧 (3.2m·14s)
              </button>
            </div>

            {/* Swell Height Slider */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-300">湧浪高度 (Swell Height)</span>
                <span className="text-cyan-400 font-mono font-bold">{swellHeight} m</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="4.0"
                step="0.1"
                value={swellHeight}
                onChange={(e) => setSwellHeight(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Wave Period Slider */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-300">湧浪週期 (Period)</span>
                <span className="text-emerald-400 font-mono font-bold">{wavePeriod} 秒 (s)</span>
              </div>
              <input
                type="range"
                min="6"
                max="16"
                step="1"
                value={wavePeriod}
                onChange={(e) => setWavePeriod(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Wind Direction Buttons */}
            <div>
              <div className="flex justify-between font-semibold mb-1.5">
                <span className="text-slate-300">岸邊風向 (Wind)</span>
                <span className="text-amber-400 font-mono font-bold">{windDir} · {windSpeed} 節</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {(['SW', 'W', 'NW', 'N', 'NE', 'E', 'SE', 'S'] as WindDirection[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setWindDir(d)}
                    className={`py-1 rounded text-center font-mono text-[11px] ${
                      windDir === d
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
