export type SurfLevel = 'beginner' | 'intermediate' | 'advanced';
export type WaveType = 'beach' | 'point' | 'reef' | 'rivermouth';
export type WaveDirection = 'left' | 'right' | 'both';
export type TidePreference = 'low' | 'mid-rising' | 'high' | 'mid-falling' | 'all';
export type WindDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';
export type SurfRegion = 'north' | 'northeast' | 'east' | 'south' | 'west';

export interface SpotLiveCondition {
  swell: string;       // 湧浪大小，例如 "1.8m"
  period: string;      // 週期，例如 "11s"
  wind: string;        // 風速與風向，例如 "12kt 偏北風"
  waterTemp?: string;  // 水溫，例如 "24°C"
  tideStatus?: string; // 潮位，例如 "中潮起漲"
}

export interface TideEvent {
  type: 'high' | 'low';
  time: string;
  height: string;
  label: string;
}

export interface TideForecastData {
  todaySummary: string;
  currentTideHeight: string;
  currentPhase: string;
  events: TideEvent[];
  bestSurfingWindow: string;
  hourlyCurve: { hour: number; height: number; timeStr: string }[];
}

export interface SurfSpot {
  id: string;
  nameZh: string;
  shortName?: string; // 2~3字精簡浪點名稱（如：金樽、東河、烏石港）
  nameEn: string;
  region?: SurfRegion;
  regionLabel?: string;
  township: string;
  highwayKm: string;
  level: SurfLevel;
  levelLabel: string;
  waveType: WaveType;
  waveTypeLabel: string;
  direction: WaveDirection;
  directionLabel: string;
  bestSwell: string;
  bestWind: string;
  bestTide: string;
  seabed: string;
  waveHeightRange: string;
  idealBoard: string[];
  hazards: string[];
  description: string;
  briefIntro?: string; // 浪點簡介（浮動框顯示）
  liveCondition?: SpotLiveCondition; // 湧浪大小 週期 風速
  tideForecast?: TideForecastData; // 潮汐滿退潮時間與圖表預報
  insiderTip: string;
  image: string;
  lat: number;
  lng: number;
  highlightTag: string;
  isWSLSpot?: boolean;
  facilities?: string[];
  accessGuide?: string;
}

export interface SurfCondition {
  spotId: string;
  swellHeightM: number;
  wavePeriodSec: number;
  windSpeedKts: number;
  windDir: WindDirection;
  tide: 'low' | 'rising' | 'high' | 'falling';
  waterTempC: number;
}

export interface SeasonInfo {
  id: string;
  seasonName: string;
  months: string;
  swellSource: string;
  averageWaveSize: string;
  windPattern: string;
  waterTemp: string;
  suitThickness: string;
  suitType: string;
  highlights: string[];
  bestFor: string;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  days: number;
  targetLevel: SurfLevel;
  summary: string;
  schedule: {
    day: number;
    title: string;
    morning: { time: string; activity: string; location: string; note: string };
    afternoon: { time: string; activity: string; location: string; note: string };
    evening: { time: string; activity: string; location: string; note: string };
  }[];
}
