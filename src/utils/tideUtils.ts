import { SurfSpot, TideForecastData, TideEvent } from '../types/surf';

export function getTideForecastForSpot(spot: SurfSpot): TideForecastData {
  // Determine tidal range characteristics based on region
  // West coast (e.g., Taichung, Miaoli) has macro-tides (~3.5m)
  // East coast (Taitung, Hualien) has micro-semidiurnal tides (~1.2m - 1.5m)
  // North / Northeast (Yilan, New Taipei) has meso-tides (~1.8m - 2.2m)
  // South (Kenting) has mixed tides (~1.4m)
  const isWest = spot.region === 'west';
  const isNorth = spot.region === 'north' || spot.region === 'northeast';
  const isSouth = spot.region === 'south';

  let amp = 0.85; // default East coast amplitude (total range ~1.7m)
  let baseHeight = 0.6;
  let low1Time = '03:15';
  let high1Time = '09:28';
  let low2Time = '15:42';
  let high2Time = '22:05';
  let low1H = '-0.25m';
  let high1H = '+1.45m';
  let low2H = '-0.18m';
  let high2H = '+1.38m';

  if (isWest) {
    amp = 1.8;
    baseHeight = 1.2;
    low1Time = '02:40';
    high1Time = '08:50';
    low2Time = '15:10';
    high2Time = '21:30';
    low1H = '-1.20m';
    high1H = '+2.65m';
    low2H = '-0.95m';
    high2H = '+2.45m';
  } else if (isNorth) {
    amp = 1.1;
    baseHeight = 0.8;
    low1Time = '03:50';
    high1Time = '10:15';
    low2Time = '16:20';
    high2Time = '22:40';
    low1H = '-0.45m';
    high1H = '+1.85m';
    low2H = '-0.30m';
    high2H = '+1.72m';
  } else if (isSouth) {
    amp = 0.75;
    baseHeight = 0.55;
    low1Time = '04:10';
    high1Time = '10:35';
    low2Time = '16:50';
    high2Time = '23:15';
    low1H = '-0.20m';
    high1H = '+1.30m';
    low2H = '-0.15m';
    high2H = '+1.25m';
  }

  const events: TideEvent[] = [
    { type: 'low', time: low1Time, height: low1H, label: '第一次乾潮 (Low Tide 1)' },
    { type: 'high', time: high1Time, height: high1H, label: '第一次滿潮 (High Tide 1)' },
    { type: 'low', time: low2Time, height: low2H, label: '第二次乾潮 (Low Tide 2)' },
    { type: 'high', time: high2Time, height: high2H, label: '第二次滿潮 (High Tide 2)' },
  ];

  // Generate 25 points for 24-hour sinusoidal wave curve (00:00 to 24:00)
  // High around 9:30 and 22:00, Low around 3:30 and 16:00
  const hourlyCurve = [];
  for (let h = 0; h <= 24; h++) {
    // 12.4 hour lunar tidal cycle
    const angle = ((h - 3.5) / 12.4) * 2 * Math.PI;
    const heightVal = Number((baseHeight - amp * Math.cos(angle)).toFixed(2));
    const timeStr = `${h.toString().padStart(2, '0')}:00`;
    hourlyCurve.push({ hour: h, height: heightVal, timeStr });
  }

  // Best surfing window recommendation based on spot's optimal tide
  let bestWindow = '06:00 - 10:30 (清晨乾潮起漲至半潮)';
  if (spot.bestTide.includes('滿潮')) {
    bestWindow = '08:00 - 11:30 (近滿潮平穩浪厚時段)';
  } else if (spot.bestTide.includes('中潮')) {
    bestWindow = '06:30 - 11:00 (中潮起漲推力最飽滿)';
  }

  return {
    todaySummary: isWest ? '大潮期 · 潮差充沛 · 潮流推動快速' : '中潮至大潮 · 太平洋黑潮推浪順暢',
    currentTideHeight: high1H,
    currentPhase: '中潮起漲中 (Rising Tide)',
    events,
    bestSurfingWindow: bestWindow,
    hourlyCurve,
  };
}
