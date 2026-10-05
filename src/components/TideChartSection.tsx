import React, { useMemo, useState } from 'react';
import { SurfSpot } from '../types/surf';
import { getTideForecastForSpot } from '../utils/tideUtils';
import { 
  Waves, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Sparkles, 
  Compass, 
  Navigation,
  Info,
  Calendar,
  Activity
} from 'lucide-react';

interface TideChartSectionProps {
  spot: SurfSpot;
}

export const TideChartSection: React.FC<TideChartSectionProps> = ({ spot }) => {
  // Use spot and current time to calculate live tide data
  const tideData = useMemo(() => getTideForecastForSpot(spot, new Date()), [spot.id]);
  const statusDesc = tideData.currentStatusDescription || '';

  // Hover state for interactive inspection
  const [hoverHour, setHoverHour] = useState<number | null>(null);

  // SVG Chart Dimensions
  const svgWidth = 760;
  const svgHeight = 240;
  const padX = 55;
  const padY = 40;
  const chartW = svgWidth - padX * 2;
  const chartH = svgHeight - padY * 2;

  // Min & Max Heights for dynamic scaling with safety padding
  const heights = tideData.hourlyCurve.map((p) => p.height);
  const minH = Math.floor((Math.min(...heights) - 0.3) * 10) / 10;
  const maxH = Math.ceil((Math.max(...heights) + 0.3) * 10) / 10;
  const rangeH = maxH - minH || 1;

  // Map hour (0 ~ 24) and height (m) to SVG (x, y) coordinates
  const getX = (hour: number) => padX + (Math.max(0, Math.min(24, hour)) / 24) * chartW;
  const getY = (h: number) => padY + chartH - ((h - minH) / rangeH) * chartH;

  // Current real-time tide coordinates
  const currentHour = tideData.currentHour ?? (new Date().getHours() + new Date().getMinutes() / 60);
  const currentX = getX(currentHour);
  const currentY = getY(tideData.currentHeightVal ?? heights[Math.round(currentHour * 2)] ?? 1.0);

  // Continuous smooth SVG path (Cubic Bézier interpolation across 49 sampled points)
  const pathD = useMemo(() => {
    const pts = tideData.hourlyCurve.map((p) => ({
      x: getX(p.hour),
      y: getY(p.height),
    }));

    if (pts.length === 0) return '';

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = ((p0.x + p1.x) / 2).toFixed(1);
      d += ` C ${cx} ${p0.y.toFixed(1)}, ${cx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  }, [tideData, minH, maxH]);

  // Closed path for the ocean gradient area under the curve
  const areaD = useMemo(() => {
    if (!pathD) return '';
    const lastX = getX(24).toFixed(1);
    const firstX = getX(0).toFixed(1);
    const bottomY = (padY + chartH).toFixed(1);
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD]);

  // Golden Surf Window coordinates (matched with bestSurfingWindow)
  const goldenWindowMatch = tideData.bestSurfingWindow.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);
  const windowStartHour = goldenWindowMatch 
    ? parseInt(goldenWindowMatch[1], 10) + parseInt(goldenWindowMatch[2], 10) / 60 
    : 6.0;
  const windowEndHour = goldenWindowMatch 
    ? parseInt(goldenWindowMatch[3], 10) + parseInt(goldenWindowMatch[4], 10) / 60 
    : 10.5;

  const windowStartX = getX(windowStartHour);
  const windowEndX = getX(windowEndHour);
  const windowWidth = Math.max(20, windowEndX - windowStartX);

  // Grid tick elevations
  const yTicks = [
    maxH - 0.2,
    (maxH + minH) / 2,
    minH + 0.2,
  ];

  // Hover point details
  const activeInspectHour = hoverHour !== null ? hoverHour : null;
  const activeInspectIndex = activeInspectHour !== null ? Math.min(48, Math.max(0, Math.round(activeInspectHour * 2))) : null;
  const activeInspectPoint = activeInspectIndex !== null ? tideData.hourlyCurve[activeInspectIndex] : null;

  return (
    <section className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 sm:p-7 backdrop-blur-md shadow-2xl">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span>24小時天文潮位節律 · 即時動態曲線</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>滿潮與乾潮時間預報</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300">
              {spot.shortName || spot.nameZh.split(' ')[0]} 專屬
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            <span>{tideData.tideDateStr} · {tideData.lunarPhaseDescription}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-2.5 rounded-xl border border-cyan-500/30 self-start lg:self-auto">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">即時潮水狀態觀測</div>
            <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>{tideData.currentStatusDescription}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Live Current Tide Dashboard (現在潮位狀態總覽) */}
      <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-r from-slate-950/90 via-cyan-950/20 to-slate-950/90 border border-cyan-500/40 rounded-2xl p-4 shadow-xl">
        {/* Metric 1: Current Time */}
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>現在時間</span>
          </div>
          <div className="my-1.5 text-2xl font-black text-white font-mono tracking-tight">
            {tideData.currentTimeStr}
          </div>
          <div className="text-[11px] text-slate-400">
            台灣標準時間 (UTC+8)
          </div>
        </div>

        {/* Metric 2: Current Tide Height (現在潮位位置) */}
        <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/50 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              現在潮位水深
            </span>
          </div>
          <div className="my-1.5 text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">
            {tideData.currentTideHeight}
          </div>
          <div className="text-[11px] text-cyan-200/80 font-medium">
            {tideData.currentHeightVal !== undefined && tideData.currentHeightVal < 0 
              ? '低於基準海平面 (退潮乾潮期)' 
              : '相對平均海平面'}
          </div>
        </div>

        {/* Metric 3: Current Trend */}
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            {statusDesc.includes('乾潮底') ? (
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            ) : tideData.currentTrend === 'rising' ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>潮水動態趨勢</span>
          </div>
          <div className="my-1.5 text-lg font-black text-white flex items-center gap-2">
            <span className={
              statusDesc.includes('乾潮底')
                ? 'text-amber-400'
                : tideData.currentTrend === 'rising'
                ? 'text-emerald-300'
                : 'text-amber-300'
            }>
              {statusDesc.includes('乾潮底')
                ? '乾潮底 (Low Tide)'
                : statusDesc.includes('滿潮前後')
                ? '滿潮期 (High Tide)'
                : tideData.currentTrend === 'rising'
                ? '起漲中 (漲潮)'
                : '退潮中 (退水)'}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {statusDesc.includes('乾潮底')
              ? '水深見底 · 待起漲推波'
              : tideData.currentTrend === 'rising'
              ? '推波力量持續增強'
              : '水深持續消退中'}
          </div>
        </div>

        {/* Metric 4: Next Event Countdown */}
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Navigation className="h-3.5 w-3.5 text-cyan-400" />
            <span>下次潮位轉折</span>
          </div>
          <div className="my-1 text-base font-black text-amber-300 truncate">
            {tideData.nextEvent?.label || '滿潮'} {tideData.nextEvent?.time}
          </div>
          <div className="text-[11px] text-cyan-400 font-medium">
            還有約 {tideData.nextEvent?.countdownStr}
          </div>
        </div>
      </div>

      {/* 4 High & Low Tide Turning Points of Today */}
      <div className="mb-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Waves className="h-3.5 w-3.5 text-cyan-400" />
            今日四大潮位極值時點 (滿潮 / 乾潮)
          </span>
          <span className="text-[11px] text-slate-500 font-normal">
            依時間先後排列 · 標註已過與即將到來時點
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tideData.events.map((evt, idx) => {
            const isHigh = evt.type === 'high';
            return (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all relative overflow-hidden ${
                  evt.isNext
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                    : evt.isPast
                    ? 'bg-slate-950/50 border-slate-800/80 opacity-70'
                    : isHigh
                    ? 'bg-cyan-950/20 border-cyan-500/30'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                {/* Active indicator */}
                {evt.isNext && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-ping"></span>
                    即將到來
                  </div>
                )}
                {evt.isPast && !evt.isNext && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                    已過
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                  {isHigh ? (
                    <ArrowUpRight className="h-4 w-4 text-cyan-400" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-amber-400" />
                  )}
                  <span className={isHigh ? 'text-cyan-300' : 'text-amber-300'}>
                    {evt.label}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight my-1">
                  {evt.time}
                </div>

                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800/60">
                  <span className="text-slate-400">極值水深</span>
                  <span
                    className={`font-black font-mono text-sm ${
                      isHigh ? 'text-cyan-300' : 'text-amber-300'
                    }`}
                  >
                    {evt.height}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual SVG Tide Curve Chart with Real-Time Position Indicator */}
      <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-hidden relative shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-white text-sm">
              24小時連續水位曲線預測圖 (00:00 ~ 24:00)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            {/* Real-time Indicator Legend */}
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/40">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              現在潮位位置
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-400/40 border border-amber-400"></span>
              最佳出浪窗口
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              潮位推浪曲線
            </span>
          </div>
        </div>

        {/* Responsive SVG Container */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full min-w-[620px] h-[220px] select-none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const relX = ((e.clientX - rect.left) / rect.width) * svgWidth;
              if (relX >= padX && relX <= padX + chartW) {
                const hour = ((relX - padX) / chartW) * 24;
                setHoverHour(Math.round(hour * 2) / 2);
              }
            }}
            onMouseLeave={() => setHoverHour(null)}
          >
            <defs>
              {/* Gradient for water fill under curve */}
              <linearGradient id="tideWaterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.0" />
              </linearGradient>

              {/* Diagonal striping for surf golden window */}
              <pattern
                id="surfWindowPattern"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 8 L 8 0 M -2 2 L 2 -2 M 6 10 L 10 6"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  opacity="0.35"
                />
              </pattern>

              {/* Glow filter for current tide marker */}
              <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizontal Grid lines with elevation values */}
            {yTicks.map((tickH, i) => (
              <g key={i}>
                <line
                  x1={padX}
                  y1={getY(tickH)}
                  x2={padX + chartW}
                  y2={getY(tickH)}
                  stroke="#334155"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />
                <text
                  x={padX - 8}
                  y={getY(tickH) + 3.5}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {tickH >= 0 ? `+${tickH.toFixed(1)}m` : `${tickH.toFixed(1)}m`}
                </text>
              </g>
            ))}

            {/* Golden Surf Window Highlight */}
            <rect
              x={windowStartX}
              y={padY}
              width={windowWidth}
              height={chartH}
              fill="url(#surfWindowPattern)"
            />
            <rect
              x={windowStartX}
              y={padY}
              width={windowWidth}
              height={chartH}
              fill="#fbbf24"
              fillOpacity="0.08"
              stroke="#f59e0b"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <text
              x={windowStartX + windowWidth / 2}
              y={padY + 16}
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="10"
              fontWeight="bold"
            >
              ★ 最佳出浪窗口
            </text>

            {/* Water Gradient Area Fill */}
            <path d={areaD} fill="url(#tideWaterGrad)" />

            {/* Continuous Smooth Tide Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3.4"
              strokeLinecap="round"
            />

            {/* Peaks & Troughs Exact Markers for the 4 Events */}
            {tideData.events.map((evt, idx) => {
              if (evt.hour === undefined || evt.hour < 0 || evt.hour > 24) return null;
              const isHigh = evt.type === 'high';
              const markerX = getX(evt.hour);
              const markerY = getY(evt.heightNum ?? 0);

              return (
                <g key={idx} transform={`translate(${markerX}, ${markerY})`}>
                  <circle
                    r={isHigh ? '5.5' : '5'}
                    fill={isHigh ? '#38bdf8' : '#f59e0b'}
                    stroke="#020617"
                    strokeWidth="2"
                  />
                  <text
                    x="0"
                    y={isHigh ? -10 : 18}
                    textAnchor="middle"
                    fill={isHigh ? '#38bdf8' : '#f59e0b'}
                    fontSize="10"
                    fontWeight="900"
                    fontFamily="monospace"
                  >
                    {isHigh ? `▲ 滿潮 ${evt.height}` : `▼ 乾潮 ${evt.height}`}
                  </text>
                </g>
              );
            })}

            {/* ======================================================== */}
            {/* ★ CURRENT TIDE POSITION (現在的潮汐位置 - USER'S MAIN REQUEST) ★ */}
            {/* ======================================================== */}
            {currentHour >= 0 && currentHour <= 24 && (
              <g id="currentTideGroup">
                {/* 1. Vertical timeline line across the chart */}
                <line
                  x1={currentX}
                  y1={padY}
                  x2={currentX}
                  y2={padY + chartH}
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  opacity="0.9"
                />

                {/* 2. Pulsing Glow Ring on the exact curve position */}
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="14"
                  fill="#06b6d4"
                  opacity="0.3"
                  className="animate-ping"
                />
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="8"
                  fill="#0891b2"
                  opacity="0.5"
                />
                <circle
                  cx={currentX}
                  cy={currentY}
                  r="5.5"
                  fill="#22d3ee"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  filter="url(#glowEffect)"
                />
                <circle cx={currentX} cy={currentY} r="2" fill="#ffffff" />

                {/* 3. Floating "現在" Badge directly above the marker */}
                {(() => {
                  const badgeY = currentY > padY + 45 ? currentY - 26 : currentY + 28;
                  // Clamp X so badge never clips off left or right edge
                  const clampedX = Math.max(padX + 55, Math.min(padX + chartW - 55, currentX));

                  return (
                    <g transform={`translate(${clampedX}, ${badgeY})`}>
                      {/* Connection leader line if badge was horizontally clamped */}
                      {Math.abs(clampedX - currentX) > 2 && (
                        <line
                          x1={currentX - clampedX}
                          y1={currentY > padY + 45 ? 12 : -12}
                          x2="0"
                          y2="0"
                          stroke="#06b6d4"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}
                      <rect
                        x="-74"
                        y="-12"
                        width="148"
                        height="24"
                        rx="12"
                        fill="#020617"
                        stroke="#22d3ee"
                        strokeWidth="1.8"
                        className="filter drop-shadow-xl"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill="#38bdf8"
                        fontSize="9.5"
                        fontWeight="900"
                      >
                        ● 現在 {tideData.currentTimeStr} · {tideData.currentTideHeight} ({statusDesc.includes('乾潮底') ? '乾潮底' : statusDesc.includes('滿潮前後') ? '滿潮期' : tideData.currentTrend === 'rising' ? '漲潮中' : '退潮中'})
                      </text>
                    </g>
                  );
                })()}

                {/* 4. Bottom X-Axis Current Indicator Arrow */}
                <g transform={`translate(${currentX}, ${padY + chartH + 2})`}>
                  <path d="M -4 6 L 0 0 L 4 6 Z" fill="#06b6d4" />
                  <text
                    y="18"
                    textAnchor="middle"
                    fill="#22d3ee"
                    fontSize="9.5"
                    fontWeight="bold"
                  >
                    現在
                  </text>
                </g>
              </g>
            )}

            {/* Hover Crosshair and dynamic tooltip */}
            {activeInspectHour !== null && activeInspectPoint && (
              <g id="hoverInspectGroup">
                <line
                  x1={getX(activeInspectHour)}
                  y1={padY}
                  x2={getX(activeInspectHour)}
                  y2={padY + chartH}
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.8"
                />
                <circle
                  cx={getX(activeInspectHour)}
                  cy={getY(activeInspectPoint.height)}
                  r="4"
                  fill="#ffffff"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <g transform={`translate(${Math.max(padX + 45, Math.min(padX + chartW - 45, getX(activeInspectHour)))}, ${padY + 16})`}>
                  <rect
                    x="-42"
                    y="-10"
                    width="84"
                    height="20"
                    rx="5"
                    fill="#0f172a"
                    stroke="#64748b"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontFamily="monospace"
                  >
                    {activeInspectPoint.timeStr} · {activeInspectPoint.height >= 0 ? `+${activeInspectPoint.height}` : activeInspectPoint.height}m
                  </text>
                </g>
              </g>
            )}

            {/* X-Axis Time Ticks */}
            {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((hour) => (
              <g key={hour} transform={`translate(${getX(hour)}, ${padY + chartH})`}>
                <line y1="0" y2="5" stroke="#475569" strokeWidth="1" />
                <text
                  y="18"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {`${hour.toString().padStart(2, '0')}:00`}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Hover scrub hint */}
        <div className="mt-2 text-right text-[11px] text-slate-500 font-medium">
          💡 提示：可將滑鼠懸停於潮位圖上，即時探查 24 小時任意時點之預報水深
        </div>
      </div>

      {/* Surfer Golden Tide Window & Spot Strategy Callout */}
      <div className="mt-5 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-cyan-950/40 border border-cyan-500/30 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-lg">
        <div className="flex items-start sm:items-center gap-3 text-slate-200">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">
              今日下水黃金時段：
              <span className="text-amber-300 font-mono text-base ml-1.5 font-black">
                {tideData.bestSurfingWindow}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
              根據{spot.shortName || spot.nameZh}最佳潮汐設定「<span className="text-cyan-300 font-semibold">{spot.bestTide}</span>」，在此潮位區間湧浪推力最足、浪型定點成型率最高。
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 bg-slate-950/60 px-3.5 py-2 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400">海域潮差屬性</div>
          <div className="text-xs font-bold text-cyan-300 mt-0.5">
            {spot.region === 'west' ? '巨潮區 (潮差逾 3.5m 需嚴格控管滿潮下水)' : '太平洋半日潮 (早晨清晨浪況常態最佳)'}
          </div>
        </div>
      </div>
    </section>
  );
};
