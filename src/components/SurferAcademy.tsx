import React, { useState } from 'react';
import { OCEAN_ETIQUETTE_RULES } from '../data/surfData';
import { ShieldCheck, AlertTriangle, Heart, Waves, LifeBuoy, Check, Sparkles } from 'lucide-react';

export const SurferAcademy: React.FC = () => {
  const [activeRuleIdx, setActiveRuleIdx] = useState<number>(0);

  const activeRule = OCEAN_ETIQUETTE_RULES[activeRuleIdx];

  const boardTypes = [
    {
      name: '8\'0 ~ 9\'0 練習軟板 (Softboard)',
      level: '衝浪新手 / 初學體驗',
      desc: '極高浮力（80L+）、EVA柔軟材質防碰撞，即使落水碰撞也不易受傷，起乘推力極強，是踏上浪板的第一首選。',
      idealSpot: '都蘭黑沙灘、東河河口南口平穩浪區',
    },
    {
      name: '9\'0 ~ 9\'6 單舵長板 (Single Fin Longboard)',
      level: '休閒悠活 / 走板愛好者',
      desc: '滑行優雅、起步早、滑行速度平順。在台東長浪中適合練習 Cross-step（交叉走板）與 Hang Five / Hang Ten（板頭懸趾）。',
      idealSpot: '東河河口北口、烏石鼻岬角',
    },
    {
      name: '6\'6 ~ 7\'6 中長板 (Mid-Length / Funboard)',
      level: '初中階進階過渡',
      desc: '兼具長板划水輕鬆起步早的優勢，又擁有比長板更靈敏的轉向弧度，是浪況小至中等時最萬能的武器。',
      idealSpot: '金樽沙灘、都蘭海灘、大溪河口',
    },
    {
      name: '5\'4 ~ 5\'10 復古雙舵魚板 (Twin Fin Fish)',
      level: '中進階 / 速度玩家',
      desc: '寬平的板身與燕尾（Swallow Tail）能產生極致的下浪滑行速度，在稍軟但平整的浪壁上如滑雪般滑順暢快。',
      idealSpot: '東河河口、金樽小浪日',
    },
    {
      name: '5\'10 ~ 6\'2 性能短板 (Performance Shortboard)',
      level: '進階 / 激進動作好手',
      desc: '翹度高、板緣薄，反應敏銳，專為在浪壁最陡處做出垂直上浪（Snap/Top Turn）、挖浪管（Tube Riding）與空中迴轉而生。',
      idealSpot: '金樽大浪、基翬火山礁岩管浪',
    },
  ];

  return (
    <section id="academy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <span>浪人手札與海洋禮節</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>每一位海人都該銘記的守則</span>
        </div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
          安全是每一次划水的底線：海洋倫理與衝浪素養
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          大海不屬於任何一個人，但共享浪壁需要每一位浪人的自律與尊重。理解起浪優先權、不隨意拋板、友善海洋環境，是享受台東太平洋之美的第一課。
        </p>
      </div>

      {/* Etiquette Rules Interactive Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Rule Selectors */}
        <div className="lg:col-span-5 space-y-2">
          {OCEAN_ETIQUETTE_RULES.map((rule, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRuleIdx(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm ${
                activeRuleIdx === idx
                  ? 'border-cyan-400 bg-slate-900 text-white font-semibold shadow-md shadow-cyan-950/30'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{rule.rule}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded ${
                  activeRuleIdx === idx ? 'text-cyan-300 bg-cyan-950/60' : 'text-slate-500'
                }`}>
                  守則 0{idx + 1}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                {rule.summary}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Active Rule Deep Dive Display */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>核心安全規範</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {activeRule.rule}
          </h3>

          <p className="mt-2 text-sm text-cyan-300 font-medium">
            {activeRule.summary}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeRule.detail}
          </p>

          <div className="mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
              <Check className="h-4 w-4 text-cyan-400" />
              <span>實踐行動指引 (Action to Take)</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeRule.doAction}
            </p>
          </div>
        </div>
      </div>

      {/* Board Anatomy & Selection Guide */}
      <div className="mt-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>裝備配置指南</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>挑選合適的衝浪板型</span>
        </div>
        <h3 className="text-2xl font-extrabold text-white">
          哪塊板子最適合台東的浪？
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boardTypes.map((board, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-medium text-amber-400 mb-1">{board.level}</div>
                <h4 className="text-base font-bold text-white mb-2">{board.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{board.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-850 text-xs">
                <span className="text-slate-500">推薦浪點：</span>
                <span className="text-slate-300 font-medium">{board.idealSpot}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ocean Friendly & Reef-Safe Sunscreen Callout */}
      <div className="mt-12 p-6 sm:p-7 rounded-2xl border border-emerald-900/40 bg-emerald-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1">
            <Heart className="h-4 w-4" />
            <span>守護太平洋 · 海洋友善公約</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            杜絕化學防曬乳，守護台東珍貴珊瑚礁與海龜
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            進入大海前，請務必確認防曬產品不含 Oxybenzone 及 Octinoxate 等有害化學成分。建議採用純物理礦物氧化鋅（Zinc Paste）防曬泥，或穿著長袖防磨衣進行物理防曬。
          </p>
        </div>
        <div className="shrink-0">
          <div className="px-4 py-2 rounded-lg bg-emerald-900/40 border border-emerald-700/50 text-xs text-emerald-200 font-medium text-center">
            物理防曬泥 · 長衣物理防曬
          </div>
        </div>
      </div>
    </section>
  );
};
