import { SurfSpot, WindDirection } from '../types/surf';

export interface SurfSimulationResult {
  finalScore: number;
  status: string;
  badgeColor: string;
  waveFaceFt: number;
  waveFaceM: number;
  isOffshore: boolean;
  notes: string[];
}

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
  // Parse defaults from spot.liveCondition if not provided
  const defaultSwell = spot.liveCondition ? parseFloat(spot.liveCondition.swell) || 1.8 : 1.8;
  const defaultPeriod = spot.liveCondition ? parseInt(spot.liveCondition.period) || 11 : 11;
  const defaultWindSpeed = 9;
  const defaultWindDir: WindDirection = 'SW';

  const swellHeight = customParams?.swellHeight ?? defaultSwell;
  const wavePeriod = customParams?.wavePeriod ?? defaultPeriod;
  const windDir = customParams?.windDir ?? defaultWindDir;
  const windSpeed = customParams?.windSpeed ?? defaultWindSpeed;
  const tidePhase = customParams?.tidePhase ?? 'mid-rising';

  let baseScore = 40;

  // 1. Period factor (Long groundswell is king)
  let periodBonus = 0;
  if (wavePeriod >= 13) periodBonus = 26;
  else if (wavePeriod >= 11) periodBonus = 20;
  else if (wavePeriod >= 9) periodBonus = 12;
  else if (wavePeriod >= 7) periodBonus = 4;
  else periodBonus = -10;

  // 2. Swell height factor
  let swellBonus = 0;
  if (swellHeight >= 1.2 && swellHeight <= 2.6) swellBonus = 18;
  else if (swellHeight > 2.6 && swellHeight <= 3.8) swellBonus = spot.level === 'advanced' ? 20 : 8;
  else if (swellHeight >= 0.8) swellBonus = 10;
  else swellBonus = -5;

  // 3. Offshore wind alignment factor
  const isOffshore = spot.bestWind.includes(windDir) || windDir === 'SW' || windDir === 'W';
  let windScore = 0;
  if (isOffshore) {
    if (windSpeed <= 6) windScore = 20; // glassy light offshore
    else if (windSpeed <= 13) windScore = 16; // steady offshore
    else windScore = 8; // strong offshore
  } else {
    if (windSpeed <= 6) windScore = 10; // light crosswind
    else if (windSpeed <= 14) windScore = -10; // choppy
    else windScore = -24; // blown out
  }

  // 4. Tide alignment
  let tideScore = 5;
  if (tidePhase === 'mid-rising' || spot.bestTide.includes('起漲') || spot.bestTide.includes('半潮')) {
    tideScore = 12;
  } else if (tidePhase === 'low' && spot.bestTide.includes('乾潮')) {
    tideScore = 10;
  } else if (tidePhase === 'high' && spot.bestTide.includes('滿潮')) {
    tideScore = 10;
  }

  const finalScore = Math.min(99, Math.max(28, baseScore + periodBonus + swellBonus + windScore + tideScore));

  // Wave Face Height: Energy calculation (Period * Swell * Reef refraction factor)
  const energyFactor = 1 + (wavePeriod - 8) * 0.12;
  const waveFaceMNum = Number((swellHeight * energyFactor).toFixed(1));
  const waveFaceFtNum = Number((waveFaceMNum * 3.28084).toFixed(1));

  let status = '普通可衝 (Fair)';
  let badgeColor = 'text-amber-400 border-amber-800/60 bg-amber-950/30';
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

  const notes: string[] = [];
  if (wavePeriod >= 11) notes.push(`遠洋深海長週期湧浪 (${wavePeriod}s)，浪壁推力深厚且有推板力道`);
  if (isOffshore) notes.push(`離岸風 (${windDir} ${windSpeed}kts) 修整浪面，開出鏡面斜滑浪壁`);
  else notes.push(`向岸或側風 (${windSpeed}kts)，浪壁稍有波紋，建議順浪走切`);
  if (spot.isWSLSpot) notes.push('WSL世界級起浪地形，起乘點立體陡峭，左右雙向浪成型率高');

  return {
    finalScore,
    status,
    badgeColor,
    waveFaceFt: waveFaceFtNum,
    waveFaceM: waveFaceMNum,
    isOffshore,
    notes,
  };
}
