import React, { useState, useEffect } from 'react';
import { ITINERARY_PRESETS, PACKING_CHECKLIST_DATA, LOCAL_FOOD_AND_CHILL } from '../data/surfData';
import { Calendar, CheckSquare, Square, Utensils, Clock, MapPin, Compass, Car, Sparkles, CheckCircle2 } from 'lucide-react';

export const TripPlanner: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-weekend-starter');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('taitung_surf_packlist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save checklist to localStorage
  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('taitung_surf_packlist', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const currentPlan = ITINERARY_PRESETS.find((p) => p.id === selectedPlanId) || ITINERARY_PRESETS[0];
  const currentDaySchedule = currentPlan.schedule.find((s) => s.day === activeDay) || currentPlan.schedule[0];

  const totalChecklist = PACKING_CHECKLIST_DATA.length;
  const checkedCount = PACKING_CHECKLIST_DATA.filter((i) => checkedItems[i.id]).length;
  const progressPercent = Math.round((checkedCount / totalChecklist) * 100);

  return (
    <section id="planner" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <span>台11線公路浪旅</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>行程規劃與在地食光</span>
        </div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
          裝上浪板，出發台東：浪人公路旅行提案
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          台東衝浪不僅僅是泡在海水裡，更是一種依循日出與潮汐的生活節奏。挑選行程提案、勾選必備行囊，漫遊東海岸最具溫度的私房小館。
        </p>
      </div>

      {/* Itinerary Preset Tabs */}
      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
        {ITINERARY_PRESETS.map((plan) => (
          <button
            key={plan.id}
            onClick={() => {
              setSelectedPlanId(plan.id);
              setActiveDay(1);
            }}
            className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
              selectedPlanId === plan.id
                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div>{plan.title}</div>
            <div className="text-[11px] font-normal text-slate-500 mt-0.5">
              適合：{plan.targetLevel === 'beginner' ? '新手與都會休閒' : '中進階浪人'}
            </div>
          </button>
        ))}
      </div>

      {/* Itinerary Timeline Display */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white">{currentPlan.title}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">{currentPlan.summary}</p>
          </div>

          {/* Day Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-850 rounded-lg border border-slate-800 self-start sm:self-auto">
            {currentPlan.schedule.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeDay === day.day
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                第 {day.day} 天
              </button>
            ))}
          </div>
        </div>

        {/* Current Day Schedule Cards */}
        <div className="mt-6">
          <div className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>DAY 0{currentDaySchedule.day} · {currentDaySchedule.title}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Morning */}
            <div className="p-4 rounded-xl bg-slate-850/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-2">
                <Clock className="h-3.5 w-3.5" />
                <span>清晨 / 晨浪時光 ({currentDaySchedule.morning.time})</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                <MapPin className="h-3 w-3 text-slate-500" />
                <span>{currentDaySchedule.morning.location}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {currentDaySchedule.morning.activity}
              </p>
              <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                💡 {currentDaySchedule.morning.note}
              </div>
            </div>

            {/* Afternoon */}
            <div className="p-4 rounded-xl bg-slate-850/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-2">
                <Clock className="h-3.5 w-3.5" />
                <span>午後 / 潮位進階 ({currentDaySchedule.afternoon.time})</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                <MapPin className="h-3 w-3 text-slate-500" />
                <span>{currentDaySchedule.afternoon.location}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {currentDaySchedule.afternoon.activity}
              </p>
              <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                💡 {currentDaySchedule.afternoon.note}
              </div>
            </div>

            {/* Evening */}
            <div className="p-4 rounded-xl bg-slate-850/80 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-2">
                <Clock className="h-3.5 w-3.5" />
                <span>傍晚 / 浪人夜幕 ({currentDaySchedule.evening.time})</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                <MapPin className="h-3 w-3 text-slate-500" />
                <span>{currentDaySchedule.evening.location}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {currentDaySchedule.evening.activity}
              </p>
              <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                💡 {currentDaySchedule.evening.note}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Utility: Packing Checklist (Left) & Highway 11 Food & Chill (Right) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Packing Checklist */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                <CheckSquare className="h-4 w-4" />
                <span>行前裝備自我檢查清單</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-1">台東浪人必備行李</h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                已準備 {checkedCount} / {totalChecklist}
              </span>
              <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {PACKING_CHECKLIST_DATA.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors text-xs ${
                    isChecked
                      ? 'border-emerald-800/60 bg-emerald-950/20 text-slate-200'
                      : 'border-slate-800 bg-slate-850/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-500 shrink-0" />
                    )}
                    <span className={isChecked ? 'line-through text-slate-400' : 'text-slate-200'}>
                      {item.label}
                    </span>
                  </div>
                  {item.essential && (
                    <span className="text-[10px] text-amber-400 font-medium shrink-0">
                      必備
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highway 11 Food & Chill Spots */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7">
          <div className="pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
              <Utensils className="h-4 w-4" />
              <span>台11線浪人生活圈</span>
            </div>
            <h4 className="text-lg font-bold text-white mt-1">衝完浪去哪裡吃？私房清單</h4>
          </div>

          <div className="mt-4 space-y-3.5">
            {LOCAL_FOOD_AND_CHILL.map((spot, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-850/40 hover:border-slate-700 transition-colors text-xs"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-white text-sm">{spot.name}</h5>
                  <span className="text-[11px] text-cyan-400">{spot.type}</span>
                </div>
                <div className="text-slate-400 text-[11px] mt-1 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-slate-500" />
                  <span>{spot.location}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-amber-300 font-medium">{spot.tag}</span>
                </div>
                <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                  {spot.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
