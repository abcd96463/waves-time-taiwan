export type SurfLevel = 'beginner' | 'intermediate' | 'advanced';
export type WaveType = 'beach' | 'point' | 'reef' | 'rivermouth';
export type WaveDirection = 'left' | 'right' | 'both';
export type TidePreference = 'low' | 'mid-rising' | 'high' | 'mid-falling' | 'all';
export type WindDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

export interface SurfSpot {
  id: string;
  nameZh: string;
  nameEn: string;
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
  insiderTip: string;
  image: string;
  lat: number;
  lng: number;
  highlightTag: string;
  isWSLSpot?: boolean;
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
