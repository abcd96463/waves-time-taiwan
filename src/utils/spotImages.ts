// Static image resolver using Vite's native URL resolution for production bundles and CDN reliability

export const SPOT_IMAGES: Record<string, string> = {
  baishawan: new URL('../assets/images/spots/baishawan.jpg', import.meta.url).href,
  beibin: new URL('../assets/images/spots/beibin.jpg', import.meta.url).href,
  cijin: new URL('../assets/images/spots/cijin.jpg', import.meta.url).href,
  daxi_taitung: new URL('../assets/images/spots/daxi_taitung.jpg', import.meta.url).href,
  donghe: new URL('../assets/images/spots/donghe.jpg', import.meta.url).href,
  dulan: new URL('../assets/images/spots/dulan.jpg', import.meta.url).href,
  feicuiwan: new URL('../assets/images/spots/feicuiwan.jpg', import.meta.url).href,
  fulong: new URL('../assets/images/spots/fulong.jpg', import.meta.url).href,
  honeymoon_bay: new URL('../assets/images/spots/honeymoon_bay.jpg', import.meta.url).href,
  hualien_park: new URL('../assets/images/spots/hualien_park.jpg', import.meta.url).href,
  jialeshui: new URL('../assets/images/spots/jialeshui.jpg', import.meta.url).href,
  jici: new URL('../assets/images/spots/jici.jpg', import.meta.url).href,
  jihui: new URL('../assets/images/spots/jihui.jpg', import.meta.url).href,
  jinzun: new URL('../assets/images/spots/jinzun.jpg', import.meta.url).href,
  kenting_southbay: new URL('../assets/images/spots/kenting_southbay.jpg', import.meta.url).href,
  shazhubay: new URL('../assets/images/spots/shazhubay.jpg', import.meta.url).href,
  shuangqiao: new URL('../assets/images/spots/shuangqiao.jpg', import.meta.url).href,
  songbo_harbour: new URL('../assets/images/spots/songbo_harbour.jpg', import.meta.url).href,
  waiao: new URL('../assets/images/spots/waiao.jpg', import.meta.url).href,
  wushibi: new URL('../assets/images/spots/wushibi.jpg', import.meta.url).href,
  wushi: new URL('../assets/images/spots/wushi.jpg', import.meta.url).href,
  wuweigang: new URL('../assets/images/spots/wuweigang.jpg', import.meta.url).href,
  yuguang_island: new URL('../assets/images/spots/yuguang_island.jpg', import.meta.url).href,
  zhunan_holiday_forest: new URL('../assets/images/spots/zhunan_holiday_forest.jpg', import.meta.url).href,
};

// Reliable external CDN fallback images for surf beaches in Taiwan
export const EXTERNAL_SPOT_FALLBACKS: Record<string, string> = {
  jinzun: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=80',
  wushi: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  waiao: 'https://images.unsplash.com/photo-1471922694855-fa59acdb3605?auto=format&fit=crop&w=1600&q=80',
  shazhubay: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80',
  baishawan: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  songbo_harbour: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  jialeshui: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
  yuguang_island: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  hualien_park: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  zhunan_holiday_forest: 'https://images.unsplash.com/photo-1471922694855-fa59acdb3605?auto=format&fit=crop&w=1600&q=80',
  default: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=80',
};

/**
 * Returns the highest-priority, production-bundled image URL for a surf spot.
 */
export function getSpotImageUrl(spotId: string, currentPath?: string): string {
  if (SPOT_IMAGES[spotId]) {
    return SPOT_IMAGES[spotId];
  }
  if (currentPath && !currentPath.startsWith('/src/')) {
    return currentPath;
  }
  return `/images/spots/${spotId}.jpg`;
}
