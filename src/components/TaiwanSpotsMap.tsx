import React, { useState, useMemo } from 'react';
import { SURF_SPOTS } from '../data/surfData';
import { SurfSpot } from '../types/surf';
import { calculateSpotSurfScore } from '../utils/surfScoreUtils';
import { Compass, Waves, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface TaiwanSpotsMapProps {
  onSelectSpot: (spot: SurfSpot) => void;
}

interface SpotMarkerConfig {
  id: string;
  name: string;
  pin: { x: number; y: number };
  badge: { x: number; y: number; w: number; h: number };
}

// 20 spots calibrated to the high-precision geographical coastline
const ILLUSTRATION_SPOTS: SpotMarkerConfig[] = [
  // 北部 / 東北部
  { id: 'shazhubay', name: '中角灣', pin: { x: 478, y: 126 }, badge: { x: 445, y: 65, w: 104, h: 44 } },
  { id: 'baishawan', name: '白沙灣', pin: { x: 445, y: 124 }, badge: { x: 330, y: 110, w: 104, h: 44 } },
  { id: 'feicuiwan', name: '翡翠灣', pin: { x: 518, y: 142 }, badge: { x: 550, y: 110, w: 104, h: 44 } },
  { id: 'fulong', name: '福隆', pin: { x: 568, y: 175 }, badge: { x: 615, y: 155, w: 86, h: 44 } },
  { id: 'honeymoon_bay', name: '蜜月灣', pin: { x: 576, y: 218 }, badge: { x: 625, y: 202, w: 104, h: 44 } },
  { id: 'waiao', name: '雙獅', pin: { x: 560, y: 252 }, badge: { x: 610, y: 248, w: 86, h: 44 } },
  { id: 'wushi', name: '烏石港', pin: { x: 546, y: 288 }, badge: { x: 618, y: 295, w: 104, h: 44 } },
  { id: 'wuweigang', name: '無尾港', pin: { x: 532, y: 355 }, badge: { x: 605, y: 355, w: 104, h: 44 } },

  // 花蓮 / 東部
  { id: 'hualien_park', name: '環保公園', pin: { x: 482, y: 492 }, badge: { x: 560, y: 468, w: 132, h: 44 } },
  { id: 'beibin', name: '北濱', pin: { x: 470, y: 526 }, badge: { x: 540, y: 518, w: 86, h: 44 } },
  { id: 'shuangqiao', name: '雙橋', pin: { x: 450, y: 575 }, badge: { x: 520, y: 568, w: 86, h: 44 } },
  { id: 'donghe', name: '東河', pin: { x: 418, y: 650 }, badge: { x: 485, y: 638, w: 86, h: 44 } },
  { id: 'jinzun', name: '金樽', pin: { x: 400, y: 715 }, badge: { x: 460, y: 695, w: 86, h: 44 } },
  { id: 'dulan', name: '都蘭', pin: { x: 382, y: 750 }, badge: { x: 425, y: 755, w: 86, h: 44 } },

  // 南部 (恆春半島)
  { id: 'jialeshui', name: '佳樂水', pin: { x: 330, y: 895 }, badge: { x: 395, y: 875, w: 104, h: 44 } },
  { id: 'kenting_southbay', name: '南灣', pin: { x: 286, y: 928 }, badge: { x: 245, y: 948, w: 86, h: 44 } },

  // 西部
  { id: 'cijin', name: '旗津', pin: { x: 216, y: 755 }, badge: { x: 105, y: 765, w: 86, h: 44 } },
  { id: 'yuguang_island', name: '漁光島', pin: { x: 196, y: 655 }, badge: { x: 55, y: 650, w: 104, h: 44 } },
  { id: 'songbo_harbour', name: '松柏港', pin: { x: 248, y: 415 }, badge: { x: 45, y: 405, w: 104, h: 44 } },
  { id: 'zhunan_holiday_forest', name: '假日之森', pin: { x: 305, y: 335 }, badge: { x: 70, y: 325, w: 128, h: 44 } },
];

export const TaiwanSpotsMap: React.FC<TaiwanSpotsMapProps> = ({ onSelectSpot }) => {
  // LATCHED/FIXED STATE: Starts at 金樽, permanently updates when hovering or clicking ANY spot
  // 「我不要自動回歸，我要固定在我滑鼠移動到的那個浪點」
  const [activeSpot, setActiveSpot] = useState<SurfSpot>(() => {
    return SURF_SPOTS.find((s) => s.id === 'jinzun') || SURF_SPOTS[0];
  });

  // Calculate live surf score for the active spot
  const activeSpotAnalysis = useMemo(() => {
    return calculateSpotSurfScore(activeSpot);
  }, [activeSpot]);

  const handleSpotInteract = (spotId: string) => {
    const found = SURF_SPOTS.find((s) => s.id === spotId);
    if (found) {
      setActiveSpot(found);
    }
  };

  return (
    <section id="spots" className="relative py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-500/30 px-4 py-1.5 rounded-full mb-3 shadow-md">
          <Compass className="h-3.5 w-3.5 text-cyan-400" />
          <span>全臺浪點地圖 · LET'S SURF TAIWAN</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          全臺經典衝浪地圖
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          細緻台灣地理輪廓與環島 20 大浪點標籤，滑鼠移動即時固定顯示海況數值與簡介。
        </p>
      </div>

      {/* Main Map & Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hand-drawn / VAST-style Illustrated Taiwan Island Map with REFINED COASTLINE */}
        <div className="lg:col-span-7 relative bg-[#0e3b4d] border-2 border-[#164e63] rounded-3xl p-3 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden">
          {/* Oceanic Texture & Watermarks */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 text-cyan-300/80 text-[11px] font-mono pointer-events-none">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>PACIFIC OCEAN SWELLS</span>
          </div>

          {/* SVG Map Container (ViewBox 0 0 760 1020) */}
          <div className="relative w-full max-w-[550px] aspect-[760/1020] select-none py-1">
            <svg
              viewBox="0 0 760 1020"
              className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-visible"
            >
              <defs>
                {/* 1. Celadon / Ice Blue Island Base Color */}
                <linearGradient id="vastIslandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b6d8dd" />
                  <stop offset="50%" stopColor="#c5e2e6" />
                  <stop offset="100%" stopColor="#aed3d9" />
                </linearGradient>

                {/* 2. Shaded Mountain Elevation Tint */}
                <linearGradient id="ridgeElevationGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#98c5cb" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#82b6be" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#98c5cb" stopOpacity="0.4" />
                </linearGradient>

                {/* 3. Soft Drop Shadow for Badge Pills */}
                <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.5" />
                </filter>

                {/* 4. Active Glow for Selected Badge */}
                <filter id="activeBadgeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22d3ee" floodOpacity="0.95" />
                </filter>
              </defs>

              {/* ============================================================ */}
              {/* VAST-STYLE BACKGROUND DRAWINGS: Seagulls, Waves, Title Script */}
              {/* ============================================================ */}

              {/* Top-Left Handwritten Title Banner: "Let's Surf Taiwan!" */}
              <g transform="translate(45, 60)" className="select-none pointer-events-none">
                <text
                  x="0"
                  y="45"
                  fill="#ffffff"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="42"
                  fontWeight="900"
                  fontStyle="italic"
                  letterSpacing="-1"
                  className="drop-shadow-lg"
                >
                  Let's Surf
                </text>
                <text
                  x="6"
                  y="110"
                  fill="#ffffff"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="62"
                  fontWeight="900"
                  fontStyle="italic"
                  letterSpacing="-2"
                  className="drop-shadow-xl"
                >
                  Taiwan!
                </text>
                {/* Shaka sign 🤙 & Sparkle stars */}
                <text x="215" y="45" fontSize="28">🤙</text>
                <circle cx="240" cy="80" r="3" fill="#fde047" />
                <circle cx="20" cy="130" r="2.5" fill="#fde047" />
                <circle cx="210" cy="115" r="2.5" fill="#fde047" />

                {/* Yellow Rounded Badge: "• 全台浪點 •" */}
                <rect x="10" y="130" width="180" height="42" rx="21" fill="#fde047" />
                <text
                  x="100"
                  y="157"
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="22"
                  fontWeight="900"
                  letterSpacing="3"
                >
                  • 全台浪點 •
                </text>
              </g>

              {/* Seagulls in flight (V shapes) */}
              <g stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 52 360 Q 62 350 72 360 Q 82 350 92 360" />
                <path d="M 360 110 Q 368 102 376 110 Q 384 102 392 110" />
                <path d="M 45 460 Q 55 450 65 460 Q 75 450 85 460" />
                <path d="M 640 420 Q 650 410 660 420 Q 670 410 680 420" />
              </g>

              {/* Ocean Waves Ripple lines around Taiwan */}
              <g stroke="#38bdf8" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round">
                <path d="M 60 415 Q 75 405 90 415 T 120 415 T 150 415" />
                <path d="M 50 650 Q 65 640 80 650 T 110 650 T 140 650" />
                <path d="M 620 595 Q 635 585 650 595 T 680 595" />
                <path d="M 460 830 Q 475 820 490 830 T 520 830" />
              </g>

              {/* Ocean Barrel Wave & Surfer in lower right */}
              <g transform="translate(560, 720)" opacity="0.95" className="pointer-events-none">
                <path
                  d="M 120 180 C 70 170, 20 140, 20 100 C 20 60, 60 40, 90 50 C 70 70, 75 110, 110 120 C 130 125, 140 140, 120 180 Z"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <path
                  d="M 60 130 Q 110 90 140 140"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <ellipse cx="65" cy="115" rx="28" ry="6" fill="#0369a1" transform="rotate(-15 65 115)" />
                <circle cx="85" cy="85" r="7" fill="#fde047" />
                <path d="M 85 92 L 80 105 L 65 112" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 82 98 L 96 92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <path d="M 80 105 L 90 115" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              </g>

              {/* Sailboat icon in southwest sea */}
              <g transform="translate(160, 660)" opacity="0.85">
                <path d="M 0 35 L 30 35 L 25 45 L 5 45 Z" fill="#ffffff" />
                <path d="M 15 32 L 15 5 L 28 32 Z" fill="#fde047" />
                <path d="M 12 32 L 12 12 L 2 32 Z" fill="#ffffff" />
              </g>

              {/* ============================================================ */}
              {/* HIGH-PRECISION REFINED GEOGRAPHICAL TAIWAN COASTLINE PATH    */}
              {/* ============================================================ */}
              <path
                id="refinedTaiwanLand"
                d="
                  M 452 115
                  C 465 115, 474 121, 482 126
                  C 492 130, 502 128, 510 134
                  C 518 140, 528 148, 536 152
                  C 550 158, 565 168, 576 182
                  C 585 192, 588 205, 582 216
                  C 575 224, 568 236, 560 250
                  C 552 266, 546 284, 542 304
                  C 536 324, 532 344, 530 365
                  C 528 385, 532 400, 526 415
                  C 520 430, 514 448, 506 465
                  C 498 480, 488 498, 478 518
                  C 470 535, 462 550, 454 570
                  C 446 590, 436 612, 426 635
                  C 418 655, 410 675, 404 695
                  C 398 710, 402 722, 394 734
                  C 386 746, 376 765, 368 785
                  C 358 805, 348 830, 338 855
                  C 330 875, 336 892, 328 910
                  C 322 925, 312 942, 302 940
                  C 294 938, 286 925, 278 920
                  C 272 918, 264 928, 258 920
                  C 252 905, 248 880, 242 855
                  C 236 830, 230 805, 224 780
                  C 218 755, 212 730, 206 705
                  C 200 680, 196 655, 194 630
                  C 192 605, 194 580, 198 555
                  C 202 530, 208 505, 218 480
                  C 228 455, 240 430, 254 410
                  C 268 388, 282 365, 302 340
                  C 320 315, 338 290, 355 268
                  C 372 245, 388 220, 404 196
                  C 416 178, 424 162, 428 152
                  C 434 138, 442 124, 452 115
                  Z
                "
                fill="url(#vastIslandGrad)"
                stroke="#0e3a4e"
                strokeWidth="3.2"
                strokeLinejoin="round"
                className="drop-shadow-2xl"
              />

              {/* Shaded Central Mountain Range Relief Layer inside the island */}
              <path
                d="
                  M 445 150
                  C 460 170, 470 210, 460 250
                  C 450 300, 435 360, 415 425
                  C 395 490, 375 560, 350 630
                  C 335 675, 315 745, 298 795
                  C 290 820, 280 845, 275 870
                  C 270 850, 260 810, 262 770
                  C 265 720, 280 660, 295 595
                  C 310 530, 330 460, 350 390
                  C 370 320, 390 250, 415 195
                  Z
                "
                fill="url(#ridgeElevationGrad)"
                opacity="0.8"
              />

              {/* Interior County & Ridge Lines (Delicate dashed and continuous boundaries) */}
              <g fill="none" stroke="#475569" strokeWidth="1.2" opacity="0.65" strokeDasharray="3 4">
                {/* Central Mountain Ridge Spine */}
                <path d="M 450 150 Q 418 280 376 440 Q 338 600 308 775 Q 295 850 286 925" stroke="#334155" strokeWidth="1.8" />
                {/* Yilan / New Taipei Boundary */}
                <path d="M 435 200 C 475 215, 515 225, 558 245" />
                {/* Hualien / Ilan Boundary (Suhua Cliffs) */}
                <path d="M 526 415 C 485 410, 440 395, 390 380" />
                {/* Hualien / Taitung Boundary */}
                <path d="M 450 575 C 410 570, 360 565, 330 570" />
                {/* Taitung / Pingtung Boundary (South Link) */}
                <path d="M 338 855 C 310 850, 270 840, 238 845" />
                {/* Western Plains County Lines */}
                <path d="M 256 405 C 290 415, 330 420, 370 420" />
                <path d="M 218 480 C 260 485, 305 490, 345 485" />
                <path d="M 198 555 C 240 560, 285 565, 325 560" />
                <path d="M 194 630 C 235 635, 275 640, 310 635" />
                <path d="M 206 705 C 245 710, 280 715, 305 710" />
              </g>

              {/* Illustrated Elements ON the Island (Coconut palms, peaks, tent, crab, shell) */}
              {/* Coconut Palm Trees in South */}
              <g transform="translate(265, 605)" opacity="0.9">
                <path d="M 20 48 Q 15 24 10 0" stroke="#0f172a" strokeWidth="3" fill="none" />
                <path d="M 10 0 Q -5 -10 -15 0" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                <path d="M 10 0 Q 25 -10 35 0" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                <path d="M 10 0 Q 10 -15 10 -25" stroke="#0f172a" strokeWidth="2.5" fill="none" />
              </g>
              <g transform="translate(245, 480)" opacity="0.85">
                <path d="M 15 38 Q 10 18 8 0" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                <path d="M 8 0 Q -5 -8 -12 0" stroke="#0f172a" strokeWidth="2" fill="none" />
                <path d="M 8 0 Q 20 -8 28 0" stroke="#0f172a" strokeWidth="2" fill="none" />
              </g>

              {/* Mountain Ridge Peaks in Central Island */}
              <g transform="translate(382, 440)" stroke="#0f172a" strokeWidth="2" fill="none" opacity="0.8">
                <path d="M 0 20 L 15 0 L 30 20" />
                <path d="M 22 20 L 35 5 L 48 20" />
              </g>
              {/* Pine Trees in North-Central */}
              <g transform="translate(445, 335)" stroke="#0f172a" strokeWidth="2" fill="none" opacity="0.8">
                <path d="M 0 16 L 8 0 L 16 16" />
                <path d="M 8 16 L 8 22" />
                <path d="M 14 18 L 22 4 L 30 18" />
                <path d="M 22 18 L 22 24" />
              </g>
              {/* Camping Tent in East-Central */}
              <g transform="translate(385, 530)" stroke="#0f172a" strokeWidth="2" fill="none" opacity="0.8">
                <path d="M 0 16 L 14 0 L 28 16 Z" fill="#ffffff" fillOpacity="0.4" />
                <line x1="14" y1="0" x2="14" y2="16" />
              </g>
              {/* Little Crab Icon */}
              <g transform="translate(330, 445)" opacity="0.75">
                <ellipse cx="10" cy="8" rx="7" ry="5" fill="#ef4444" />
                <line x1="3" y1="8" x2="-2" y2="5" stroke="#ef4444" strokeWidth="2" />
                <line x1="17" y1="8" x2="22" y2="5" stroke="#ef4444" strokeWidth="2" />
              </g>
              {/* Little Sea Shell */}
              <g transform="translate(390, 615)" opacity="0.75">
                <path d="M 0 10 Q 8 0 16 10 Z" fill="#fde047" stroke="#0f172a" strokeWidth="1" />
              </g>

              {/* ============================================================ */}
              {/* 20 ALL-TAIWAN SURF SPOT BADGES (Large 2x Font + Red Pins)    */}
              {/* ============================================================ */}
              {ILLUSTRATION_SPOTS.map((spotCfg) => {
                const isSelected = activeSpot?.id === spotCfg.id;

                // Center of the badge pill
                const badgeCenterX = spotCfg.badge.x + spotCfg.badge.w / 2;
                const badgeCenterY = spotCfg.badge.y + spotCfg.badge.h / 2;

                return (
                  <g
                    key={spotCfg.id}
                    onMouseEnter={() => handleSpotInteract(spotCfg.id)}
                    onClick={() => {
                      handleSpotInteract(spotCfg.id);
                      const found = SURF_SPOTS.find((s) => s.id === spotCfg.id);
                      if (found) onSelectSpot(found);
                    }}
                    className="cursor-pointer group"
                    style={{ transition: 'transform 0.2s ease' }}
                  >
                    {/* Connecting guide line from pin to badge */}
                    <line
                      x1={spotCfg.pin.x}
                      y1={spotCfg.pin.y}
                      x2={badgeCenterX}
                      y2={badgeCenterY}
                      stroke={isSelected ? '#22d3ee' : '#94a3b8'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                      opacity={isSelected ? 0.95 : 0.6}
                    />

                    {/* RED COASTAL PIN with White Star (★) */}
                    <circle
                      cx={spotCfg.pin.x}
                      cy={spotCfg.pin.y}
                      r={isSelected ? 11 : 8.5}
                      fill="#ef4444"
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200 shadow-md"
                    />
                    <text
                      x={spotCfg.pin.x}
                      y={spotCfg.pin.y + (isSelected ? 3.5 : 3)}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={isSelected ? '10' : '8'}
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      ★
                    </text>

                    {/* Outer Pulsing Ping Ring when selected */}
                    {isSelected && (
                      <circle
                        cx={spotCfg.pin.x}
                        cy={spotCfg.pin.y}
                        r="18"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2.5"
                        className="animate-ping"
                        opacity="0.85"
                      />
                    )}

                    {/* 
                      SPOT NAME BADGE PILL (Cream / Ivory background)
                      TEXT FONT DOUBLED IN SIZE (21px bold)
                    */}
                    <rect
                      x={spotCfg.badge.x}
                      y={spotCfg.badge.y}
                      width={spotCfg.badge.w}
                      height={spotCfg.badge.h}
                      rx={spotCfg.badge.h / 2}
                      fill={isSelected ? '#fef08a' : '#fffbeb'}
                      stroke={isSelected ? '#0284c7' : '#d97706'}
                      strokeWidth={isSelected ? 3.5 : 2}
                      filter={isSelected ? 'url(#activeBadgeGlow)' : 'url(#badgeShadow)'}
                      className="transition-all duration-200 group-hover:scale-105"
                      style={{ transformOrigin: `${badgeCenterX}px ${badgeCenterY}px` }}
                    />

                    {/* Large 2X Bold Black Text (21px bold font) */}
                    <text
                      x={badgeCenterX}
                      y={badgeCenterY + 7}
                      textAnchor="middle"
                      fill="#0f172a"
                      fontSize="21"
                      fontWeight="900"
                      letterSpacing="0.5"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      className="pointer-events-none select-none"
                    >
                      {spotCfg.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom hint banner */}
          <div className="mt-2 text-xs text-white/90 flex items-center justify-between w-full max-w-[550px] px-3 bg-black/35 py-2 rounded-xl border border-white/10">
            <span className="flex items-center gap-1.5 font-bold text-cyan-300">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
              滑鼠移到浪點即可固定觀看該浪點海況
            </span>
            <span className="text-[11px] text-amber-300 font-semibold">
              目前固定：{activeSpot.shortName || activeSpot.nameZh.slice(0, 3)}
            </span>
          </div>
        </div>

        {/* Right Column: LATCHED / FIXED SPOT INFO PANEL */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main Info Card */}
          <div className="bg-slate-900 border-2 border-cyan-500/70 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-2xl transition-all">
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  {activeSpot.regionLabel || '全臺經典浪點'} · {activeSpot.township}
                </span>
                <div className="flex items-center gap-1.5">
                  {activeSpot.id === 'jinzun' && (
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      WSL國際主場
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-200 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full">
                    {activeSpot.levelLabel}
                  </span>
                </div>
              </div>

              {/* 1. 浪點名稱 (Spot Name) 與 浪況綜合評分 (Score) */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
                    <span>{activeSpot.nameZh}</span>
                  </h3>
                  <p className="text-xs font-medium text-cyan-300/90 uppercase tracking-wider mt-0.5 font-mono truncate">
                    {activeSpot.nameEn}
                  </p>
                </div>

                {/* 浪況綜合評分 (放在浪點名稱旁/右上) */}
                <div className="shrink-0 bg-slate-950/90 border border-cyan-400/50 rounded-2xl px-3 py-1.5 shadow-lg flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">浪況綜合評分</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
                      {activeSpotAnalysis.finalScore}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/100</span>
                  </div>
                </div>
              </div>

              {/* 2. 湧浪大小 週期 風速 (Swell Size, Period, Wind Speed) - Ordered Exactly As Requested */}
              <div className="bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-4 shadow-inner">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Waves className="h-3.5 w-3.5 text-cyan-400" />
                    即時海況預報數值
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {activeSpot.liveCondition?.tideStatus || '中潮'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-800">
                  <div className="px-1">
                    <span className="block text-[11px] text-slate-400 font-medium">湧浪大小</span>
                    <span className="block text-lg sm:text-xl font-extrabold text-cyan-300 mt-0.5">
                      {activeSpot.liveCondition?.swell || '1.8m'}
                    </span>
                  </div>
                  <div className="px-1">
                    <span className="block text-[11px] text-slate-400 font-medium">週期</span>
                    <span className="block text-lg sm:text-xl font-extrabold text-cyan-300 mt-0.5">
                      {activeSpot.liveCondition?.period || '11s'}
                    </span>
                  </div>
                  <div className="px-1">
                    <span className="block text-[11px] text-slate-400 font-medium">風速</span>
                    <span className="block text-xs sm:text-sm font-extrabold text-cyan-300 mt-1 truncate" title={activeSpot.liveCondition?.wind}>
                      {activeSpot.liveCondition?.wind || '12kt 偏北風'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. 浪點簡介 (Brief Intro) */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  浪點簡介
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                  {activeSpot.briefIntro || activeSpot.description.slice(0, 110) + '...'}
                </p>
              </div>

              {/* Wave Characteristics */}
              <div className="flex flex-wrap gap-2 text-xs text-slate-300 pt-1">
                <span className="bg-slate-800/90 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                  {activeSpot.waveTypeLabel}
                </span>
                <span className="bg-slate-800/90 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                  {activeSpot.directionLabel}
                </span>
                <span className="bg-slate-800/90 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                  板型：{activeSpot.idealBoard[0]}
                </span>
              </div>

              {/* 4. Action Button: 點進去後進入詳細介紹分頁 */}
              <button
                onClick={() => onSelectSpot(activeSpot)}
                className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>進入「{activeSpot.shortName || activeSpot.nameZh.split(' ')[0]}」詳細介紹分頁</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick 20 Spots Selector Grid */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>全臺 20 大浪點快速切換</span>
              <span className="text-[11px] text-cyan-400">點擊即固定</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-1.5">
              {ILLUSTRATION_SPOTS.map((spotCfg) => {
                const isSelected = activeSpot?.id === spotCfg.id;
                return (
                  <button
                    key={spotCfg.id}
                    onClick={() => handleSpotInteract(spotCfg.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center truncate ${
                      isSelected
                        ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-md font-black'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {spotCfg.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
