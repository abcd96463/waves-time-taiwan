import React, { useMemo } from 'react';
import { SurfSpot } from '../types/surf';
import { getTideForecastForSpot } from '../utils/tideUtils';
import { Waves, ArrowUpRight, ArrowDownRight, Clock, Sparkles } from 'lucide-react';

interface TideChartSectionProps {
  spot: SurfSpot;
}

export const TideChartSection: React.FC<TideChartSectionProps> = ({ spot }) => {
  const tideData = useMemo(() => getTideForecastForSpot(spot), [spot.id]);

  // Dimensions for SVG curve
  const svgWidth = 720;
  const svgHeight = 220;
  const padX = 45;
  const padY = 35;
  const chartW = svgWidth - padX * 2;
  const chartH = svgHeight - padY * 2;

  // Min and max height from curve
  const heights = tideData.hourlyCurve.map((p) => p.height);
  const minH = Math.min(...heights) - 0.2;
  const maxH = Math.max(...heights) + 0.2;
  const rangeH = maxH - minH || 1;

  // Map hour (0~24) and height to SVG (x, y)
  const getX = (hour: number) => padX + (hour / 24) * chartW;
  const getY = (h: number) => padY + chartH - ((h - minH) / rangeH) * chartH;

  // Build SVG smooth path using Bézier curves
  const pathD = useMemo(() => {
    const pts = tideData.hourlyCurve.map((p) => ({
      x: getX(p.hour),
      y: getY(p.height),
    }));

    if (pts.length === 0) return '';

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [tideData]);

  // Closed path for gradient area under curve
  const areaD = useMemo(() => {
    if (!pathD) return '';
    const lastX = getX(24);
    const firstX = getX(0);
    const bottomY = padY + chartH;
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD]);

  // Golden Surf Window coordinates (around 06:00 to 10:30)
  const windowStartX = getX(6);
  const windowEndX = getX(10.5);
  const windowWidth = windowEndX - windowStartX;

  return (
    <section className="bg-slate-900/70 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Waves className="h-4 w-4 text-cyan-400" />
            <span>24小時潮位節律與即時水深曲線</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            滿潮與退潮時間預報
          </h2>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs text-slate-300 font-medium">
            {tideData.todaySummary}
          </span>
        </div>
      </div>

      {/* 4 High & Low Tide Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
        {tideData.events.map((evt, idx) => {
          const isHigh = evt.type === 'high';
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isHigh
                  ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  {isHigh ? (
                    <ArrowUpRight className="h-4 w-4 text-cyan-400" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-amber-400" />
                  )}
                  <span>{isHigh ? '滿潮 (High)' : '乾潮 (Low)'}</span>
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80">
                  {evt.label.includes('1') ? '第 1 潮' : '第 2 潮'}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                {evt.time}
              </div>

              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">預報水深</span>
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

      {/* Visual SVG Tide Curve Chart */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            24小時連續水位曲線預測圖 (小時 00:00 ~ 24:00)
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-amber-300">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-400/40 border border-amber-400"></span>
              最佳衝浪時段
            </span>
            <span className="flex items-center gap-1 text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              潮位推波線
            </span>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full min-w-[560px] h-[200px] select-none"
          >
            <defs>
              {/* Gradient for water area fill */}
              <linearGradient id="tideWaterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </linearGradient>

              {/* Pattern for surf window */}
              <pattern
                id="surfWindowPattern"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 8 L 8 0 M -2 2 L 2 -2 M 6 10 L 10 6"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </pattern>
            </defs>

            {/* Horizontal Grid lines */}
            <g stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6">
              <line x1={padX} y1={getY(maxH - 0.2)} x2={padX + chartW} y2={getY(maxH - 0.2)} />
              <line x1={padX} y1={getY((maxH + minH) / 2)} x2={padX + chartW} y2={getY((maxH + minH) / 2)} />
              <line x1={padX} y1={getY(minH + 0.2)} x2={padX + chartW} y2={getY(minH + 0.2)} />
            </g>

            {/* Golden Surf Window highlighted background */}
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
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Peak and Trough Markers */}
            {/* High Tide 1 Marker */}
            <g transform={`translate(${getX(9.5)}, ${getY(heights[9])})`}>
              <circle r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="11"
                fontWeight="900"
              >
                ▲ 滿潮 {tideData.events[1].height}
              </text>
            </g>

            {/* Low Tide 1 Marker */}
            <g transform={`translate(${getX(3.5)}, ${getY(heights[3])})`}>
              <circle r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.8" />
              <text
                x="0"
                y="18"
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="10"
                fontWeight="bold"
              >
                ▼ 乾潮 {tideData.events[0].height}
              </text>
            </g>

            {/* Low Tide 2 Marker */}
            <g transform={`translate(${getX(15.7)}, ${getY(heights[16])})`}>
              <circle r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.8" />
              <text
                x="0"
                y="18"
                textAnchor="middle"
                fill="#f59e0b"
                fontSize="10"
                fontWeight="bold"
              >
                ▼ 乾潮 {tideData.events[2].height}
              </text>
            </g>

            {/* High Tide 2 Marker */}
            <g transform={`translate(${getX(22)}, ${getY(heights[22])})`}>
              <circle r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="11"
                fontWeight="900"
              >
                ▲ 滿潮 {tideData.events[3].height}
              </text>
            </g>

            {/* X-Axis Time Ticks */}
            {[0, 4, 8, 12, 16, 20, 24].map((hour) => (
              <g key={hour} transform={`translate(${getX(hour)}, ${padY + chartH})`}>
                <line y1="0" y2="5" stroke="#64748b" strokeWidth="1" />
                <text
                  y="18"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {`${hour.toString().padStart(2, '0')}:00`}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Surfer Golden Tide Window Callout */}
      <div className="mt-4 bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-4 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-200">
          <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
          <span>
            <strong>今日下水黃金時段：</strong>
            <span className="text-cyan-300 font-semibold">{tideData.bestSurfingWindow}</span>
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          最佳配合：{spot.bestTide}
        </span>
      </div>
    </section>
  );
};
