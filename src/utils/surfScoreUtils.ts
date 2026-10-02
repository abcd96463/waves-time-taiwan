import { SurfSpot, WindDirection } from '../types/surf';

export interface SurfSimulationResult {
  finalScore: number;
  status: string;
  badgeColor: string;
  waveFaceFt: number;
  waveFaceM: number;
  isOffshore: boolean;
  windSpeed: number;
  windDir: string;
  notes: string[];
  scoreBreakdown: {
    swellScore: number;
    periodScore: number;
    windScore: number;
    tideScore: number;
  };
}

/**
 * Extracts wind speed and wind direction from string like:
 * "9kt 南風 (離岸風)", "18kt 東北季風 (強向岸風)", "7kt 西南離岸風", "12kt 偏北風"
 */
function parseWindInfo(windStr?: string): { speed: number; dir: string; isOffshoreHint: boolean } {
  if (!windStr) return { speed: 8, dir: 'SW', isOffshoreHint: true };

  // Parse speed in knots
  const speedMatch = windStr.match(/(\d+)\s*kt/i);
  const speed = speedMatch ? parseInt(speedMatch[1], 10) : 8;

  // Check if wind text explicitly states offshore or onshore
  const isOffshoreHint = windStr.includes('離岸') || windStr.includes('鏡面');
  const isOnshoreHint = windStr.includes('向岸') || windStr.includes('東北季風') || windStr.includes('強風');

  // Parse direction
  let dir = 'SW';
  if (windStr.includes('東北') || windStr.includes('NE')) dir = 'NE';
  else if (windStr.includes('西北') || windStr.includes('NW')) dir = 'NW';
  else if (windStr.includes('東南') || windStr.includes('SE')) dir = 'SE';
  else if (windStr.includes('西南') || windStr.includes('SW')) dir = 'SW';
  else if (windStr.includes('東') || windStr.includes('E')) dir = 'E';
  else if (windStr.includes('西') || windStr.includes('W')) dir = 'W';
  else if (windStr.includes('南') || windStr.includes('S')) dir = 'S';
  else if (windStr.includes('北') || windStr.includes('N')) dir = 'N';

  if (isOnshoreHint) {
    return { speed, dir, isOffshoreHint: false };
  }
  return { speed, dir, isOffshoreHint };
}

/**
 * Scientific Surf Quality Scoring Algorithm (0 ~ 100)
 * Evaluates real-time live condition based on real oceanographic metrics:
 * 1. Swell Height & Energy (0~30 pts)
 * 2. Swell Period / Groundswell factor (0~30 pts)
 * 3. Wind Condition & Surface Texture (0~30 pts)
 * 4. Tide Match (0~10 pts)
 */
export function calculateSpotSurfScore(
  spot: SurfSpot,
  customParams?: {
    swellHeight?: number;
    wavePeriod?: number;
    windDir?: WindDirection;
    windSpeed?: number;
    tidePhase?: string;
  }
): SurfSimulationResult {
  // 1. Swell Height in meters
  let swellHeight = 1.8;
  if (customParams?.swellHeight !== undefined) {
    swellHeight = customParams.swellHeight;
  } else if (spot.liveCondition?.swell) {
    const m = spot.liveCondition.swell.match(/([\d.]+)/);
    if (m) swellHeight = parseFloat(m[1]);
  }

  // 2. Wave Period in seconds
  let wavePeriod = 11;
  if (customParams?.wavePeriod !== undefined) {
    wavePeriod = customParams.wavePeriod;
  } else if (spot.liveCondition?.period) {
    const p = spot.liveCondition.period.match(/(\d+)/);
    if (p) wavePeriod = parseInt(p[1], 10);
  }

  // 3. Wind parsing
  const parsedWind = parseWindInfo(spot.liveCondition?.wind);
  const windDir = customParams?.windDir ?? (parsedWind.dir as WindDirection);
  const windSpeed = customParams?.windSpeed ?? parsedWind.speed;

  // 4. Tide status
  const tideStr = customParams?.tidePhase ?? (spot.liveCondition?.tideStatus || '中潮');

  // ==========================================
  // SCORE CALCULATION (0 ~ 100)
  // ==========================================

  // A. Swell Height Score (0 ~ 30 pts)
  let swellScore = 20;
  if (swellHeight < 0.6) {
    swellScore = 10; // too flat
  } else if (swellHeight < 0.9) {
    swellScore = 18; // small waist high
  } else if (swellHeight >= 1.0 && swellHeight <= 2.2) {
    swellScore = 29; // sweet spot for almost all breaks
  } else if (swellHeight > 2.2 && swellHeight <= 3.2) {
    swellScore = spot.level === 'advanced' || spot.waveType === 'reef' || spot.waveType === 'point' ? 30 : 23;
  } else {
    swellScore = 20; // very massive storm wave
  }

  // B. Period Score (0 ~ 30 pts) - Long groundswell is King
  let periodScore = 15;
  if (wavePeriod >= 13) {
    periodScore = 30; // true ocean groundswell, immense clean push
  } else if (wavePeriod >= 11) {
    periodScore = 26; // solid Pacific groundswell
  } else if (wavePeriod >= 9) {
    periodScore = 20; // moderate swell
  } else if (wavePeriod >= 7) {
    periodScore = 12; // short choppy windswell
  } else {
    periodScore = 6; // weak wind chop
  }

  // C. Wind Condition Score (0 ~ 30 pts) - Surface Texture & Wave Face Shape
  const isOffshore = customParams
    ? spot.bestWind.includes(windDir) || windDir === 'SW' || windDir === 'W'
    : parsedWind.isOffshoreHint || spot.bestWind.includes(windDir);

  let windScore = 15;
  if (isOffshore) {
    if (windSpeed <= 6) {
      windScore = 30; // glassy, mirror surface with slight offshore
    } else if (windSpeed <= 12) {
      windScore = 28; // perfect clean grooming offshore
    } else if (windSpeed <= 18) {
      windScore = 22; // strong offshore, hard drop-in but very clean
    } else {
      windScore = 15; // howling offshore
    }
  } else {
    // Onshore or crosswind
    if (windSpeed <= 5) {
      windScore = 24; // nearly calm/glassy
    } else if (windSpeed <= 9) {
      windScore = 15; // mild crosswind
    } else if (windSpeed <= 14) {
      windScore = 8; // choppy texture
    } else {
      windScore = 3; // blown out, whitewash chaos
    }
  }

  // D. Tide Matching Score (0 ~ 10 pts)
  let tideScore = 6;
  if (spot.bestTide.includes('中潮') && (tideStr.includes('中潮') || tideStr.includes('推漲') || tideStr.includes('起漲'))) {
    tideScore = 10;
  } else if (spot.bestTide.includes('滿潮') && (tideStr.includes('滿潮') || tideStr.includes('漲潮'))) {
    tideScore = 10;
  } else if (spot.bestTide.includes('乾潮') && tideStr.includes('乾潮')) {
    tideScore = 10;
  } else {
    tideScore = 7;
  }

  // Total Score (0 ~ 100)
  const finalScore = Math.min(99, Math.max(25, swellScore + periodScore + windScore + tideScore));

  // Wave Face Height (Period Energy Refraction)
  const periodEnergy = 1 + (wavePeriod - 8) * 0.12;
  const waveFaceM = Number((swellHeight * periodEnergy).toFixed(1));
  const waveFaceFt = Number((waveFaceM * 3.28084).toFixed(1));

  // Qualitative rating and badge colors
  let status = '普通可衝 (Fair)';
  let badgeColor = 'text-amber-400 border-amber-800/60 bg-amber-950/30';
  if (finalScore >= 88) {
    status = '神級浪況 (Epic)';
    badgeColor = 'text-emerald-400 border-emerald-800/60 bg-emerald-950/30';
  } else if (finalScore >= 76) {
    status = '優良平整 (Good & Clean)';
    badgeColor = 'text-cyan-400 border-cyan-800/60 bg-cyan-950/30';
  } else if (finalScore < 55) {
    status = '風浪雜亂 (Poor / Choppy)';
    badgeColor = 'text-rose-400 border-rose-800/60 bg-rose-950/30';
  }

  // Diagnostic notes based on real components
  const notes: string[] = [];
  if (wavePeriod >= 11) {
    notes.push(`太平洋深海長週期湧浪 (${wavePeriod}s)，水下動能飽滿，起浪推進厚實`);
  } else {
    notes.push(`局部短週期波浪 (${wavePeriod}s)，浪型節奏偏快，建議挑浪起乘`);
  }

  if (isOffshore) {
    notes.push(`離岸風吹拂 (${windSpeed}kts)，削平浪頂碎白花，浪壁陡峭乾淨易做動作`);
  } else if (windSpeed >= 14) {
    notes.push(`向岸/強風吹拂 (${windSpeed}kts)，海面碎浪較多，注意水流與起浪點飄移`);
  } else {
    notes.push(`海面微風 (${windSpeed}kts)，海面質地平緩`);
  }

  if (spot.isWSLSpot) {
    notes.push('WSL世界巡迴賽地形加持，左右雙向浪壁延伸距離長且具推力');
  }

  return {
    finalScore,
    status,
    badgeColor,
    waveFaceFt,
    waveFaceM,
    isOffshore,
    windSpeed,
    windDir,
    notes,
    scoreBreakdown: {
      swellScore,
      periodScore,
      windScore,
      tideScore,
    },
  };
}
