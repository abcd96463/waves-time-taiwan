import React from 'react';
import { Waves, Heart, Phone, LifeBuoy } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Brand & Mission */}
        <div className="max-w-md">
          <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <Waves className="h-5 w-5 text-cyan-400" />
            <span>東浪紀行 · Taitung Surf</span>
          </div>
          <p className="mt-3 text-xs text-slate-400 leading-relaxed">
            獻給每一位熱愛太平洋浪壁的海人。紀錄台東金尊、東河、都蘭、基翬與長濱的真實海象與浪人日常。出海前請審慎評估水性與潮汐，共同守護東海岸純淨海洋。
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
            <span>© 2026 東浪紀行 Taitung Surf Guide</span>
            <span>·</span>
            <span>無痕海洋 Clean Waves Initiative</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-12 text-xs">
          <div>
            <div className="font-semibold text-slate-200 uppercase tracking-wider mb-3">
              浪點分佈
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#spots" className="hover:text-cyan-400 transition-colors">金尊漁港 (WSL主場)</a></li>
              <li><a href="#spots" className="hover:text-cyan-400 transition-colors">東河河口 (長板定點)</a></li>
              <li><a href="#spots" className="hover:text-cyan-400 transition-colors">都蘭黑沙灘 (新手友善)</a></li>
              <li><a href="#spots" className="hover:text-cyan-400 transition-colors">基翬礁石管浪 (進階)</a></li>
              <li><a href="#spots" className="hover:text-cyan-400 transition-colors">長濱烏石鼻 (秘境右浪)</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-200 uppercase tracking-wider mb-3">
              浪人導航
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#simulator" className="hover:text-cyan-400 transition-colors">風浪潮汐模擬器</a></li>
              <li><a href="#seasons" className="hover:text-cyan-400 transition-colors">台東四季水文年曆</a></li>
              <li><a href="#academy" className="hover:text-cyan-400 transition-colors">海洋禮儀與優先權</a></li>
              <li><a href="#planner" className="hover:text-cyan-400 transition-colors">公路旅行與裝備清單</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-200 uppercase tracking-wider mb-3">
              海域安全與緊急專線
            </div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 text-cyan-300 font-mono">
                <Phone className="h-3.5 w-3.5" />
                <span>海巡署報案：118</span>
              </li>
              <li className="flex items-center gap-1.5 font-mono">
                <LifeBuoy className="h-3.5 w-3.5" />
                <span>緊急救護：119</span>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                中央氣象署海象即時觀測 · 東部海岸國家風景區
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
