import React, { useState } from 'react';
import { SURF_SPOTS } from '../data/surfData';
import { SurfSpot } from '../types/surf';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Compass, MapPin } from 'lucide-react';

interface SpotMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpot: (spot: SurfSpot) => void;
}

export const SpotMatcherModal: React.FC<SpotMatcherModalProps> = ({ isOpen, onClose, onSelectSpot }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    experience: '',
    board: '',
    preference: '',
    season: '',
  });

  if (!isOpen) return null;

  const handleSelectOption = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5); // result
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({
      experience: '',
      board: '',
      preference: '',
      season: '',
    });
  };

  // Determine recommendation based on answers
  const recommendedSpot = (() => {
    if (answers.experience === 'beginner' || answers.preference === 'safe_sand') {
      return SURF_SPOTS.find((s) => s.id === 'dulan') || SURF_SPOTS[0];
    }
    if (answers.experience === 'expert' || answers.preference === 'extreme_tube') {
      return SURF_SPOTS.find((s) => s.id === 'jihui') || SURF_SPOTS[0];
    }
    if (answers.preference === 'secret_empty') {
      return SURF_SPOTS.find((s) => s.id === 'wushibi') || SURF_SPOTS[0];
    }
    if (answers.season === 'summer' && answers.preference === 'south_swell') {
      return SURF_SPOTS.find((s) => s.id === 'daxi') || SURF_SPOTS[0];
    }
    if (answers.board === 'shortboard' || answers.experience === 'advanced') {
      return SURF_SPOTS.find((s) => s.id === 'jinzun') || SURF_SPOTS[0];
    }
    // Default longboard / intermediate all-around
    return SURF_SPOTS.find((s) => s.id === 'donghe') || SURF_SPOTS[0];
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step indicator */}
        {step <= 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400 uppercase tracking-wide">
                <Compass className="h-3.5 w-3.5" />
                <span>浪人適性測驗</span>
              </span>
              <span className="font-mono tabular-nums">第 {step} / 4 題</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Question 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              01. 請問你目前的衝浪經驗與水性如何？
            </h3>
            <div className="space-y-2.5 pt-2">
              {[
                { id: 'beginner', title: '剛入門 / 想體驗人生第一道浪', desc: '需要教練指導，在白花浪練習趴板划水與站立平衡。' },
                { id: 'mid_beginner', title: '能自行起乘，正在練習斜滑綠浪', desc: '具備基礎水性，能在腰至胸高的小浪中划水起乘。' },
                { id: 'intermediate', title: '穩定起乘，擅長斜滑與走板漫步', desc: '熟悉起浪區優先權，能順暢抓浪並進行轉向。' },
                { id: 'advanced', title: '經驗豐富，渴望挑戰管浪與過頭大浪', desc: '能自如應對強勁水流、礁石地形與快速崩潰浪壁。' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('experience', opt.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-850 hover:border-cyan-400 hover:bg-slate-800 transition-colors text-xs"
                >
                  <div className="font-bold text-white text-sm">{opt.title}</div>
                  <div className="text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              02. 你這趟旅行主要攜帶或打算租借哪種板型？
            </h3>
            <div className="space-y-2.5 pt-2">
              {[
                { id: 'softboard', title: '8\'0+ 練習軟板 (高浮力安全首選)', desc: '容錯率高，撞到不痛，推力十足。' },
                { id: 'longboard', title: '9\'0+ 單舵/三舵長板 (長板經典)', desc: '追求優雅走板、修長平整的順暢軌跡。' },
                { id: 'midlength', title: 'Mid-length 中長板或 Fish 雙舵魚板', desc: '輕巧靈動，兼具滑行速度與轉向快感。' },
                { id: 'shortboard', title: 'Performance 性能短板 / 槍板', desc: '追求垂直浪頂動作、速度感與浪管穿梭。' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('board', opt.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-850 hover:border-cyan-400 hover:bg-slate-800 transition-colors text-xs"
                >
                  <div className="font-bold text-white text-sm">{opt.title}</div>
                  <div className="text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              03. 你心目中最嚮往的海域環境與氛圍？
            </h3>
            <div className="space-y-2.5 pt-2">
              {[
                { id: 'safe_sand', title: '安全第一黑沙灘，沒有尖銳石頭暗礁', desc: '摔落水裡無壓力，浪況溫柔，氣氛悠閒隨興。' },
                { id: 'consistent_point', title: '出浪最穩定，起浪點明確的鵝卵石定點', desc: '浪壁長且規律，深水通道好划水出浪區。' },
                { id: 'extreme_tube', title: '磅礡厚實的大浪管壁，享受極限快感', desc: '即使是火山礁岩或世界級賽道也想勇於嘗試。' },
                { id: 'secret_empty', title: '人少清幽的秘境岬角，享受水質純淨與寧靜', desc: '避開擁擠等浪群，與自然和海龜獨處。' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('preference', opt.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-850 hover:border-cyan-400 hover:bg-slate-800 transition-colors text-xs"
                >
                  <div className="font-bold text-white text-sm">{opt.title}</div>
                  <div className="text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              04. 你預計主要在什麼季節抵達台東？
            </h3>
            <div className="space-y-2.5 pt-2">
              {[
                { id: 'autumn_winter', title: '秋冬黃金期 (10月 - 3月)', desc: '東北季風湧浪鼎盛，金尊賽季，黑潮溫水避寒。' },
                { id: 'spring', title: '春季過渡期 (4月 - 6月)', desc: '天氣舒適無雨，風浪溫和平整，最適合集訓。' },
                { id: 'summer', title: '夏日陽光期 (7月 - 9月)', desc: '免穿防寒衣，享受熱帶海島氛圍或追逐颱風長浪。' },
                { id: 'anytime', title: '隨性浪人，哪裡有浪就往哪裡出發', desc: '只要太平洋起浪，隨時帶上浪板跳上火車。' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('season', opt.id)}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-850 hover:border-cyan-400 hover:bg-slate-800 transition-colors text-xs"
                >
                  <div className="font-bold text-white text-sm">{opt.title}</div>
                  <div className="text-slate-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Screen (Step 5) */}
        {step === 5 && (
          <div className="text-center py-2 animate-fade-in">
            <div className="inline-flex p-3 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 mb-3">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              適性分析結果出爐
            </div>
            <h3 className="mt-1 text-2xl font-extrabold text-white">
              你的台東命定浪點是：{recommendedSpot.nameZh}
            </h3>

            {/* Spot card showcase */}
            <div className="mt-5 text-left rounded-xl border border-slate-800 bg-slate-850 overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={recommendedSpot.image}
                  alt={recommendedSpot.nameZh}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs text-white">
                  <span className="font-bold text-cyan-300">{recommendedSpot.township}</span> · {recommendedSpot.highwayKm}
                </div>
              </div>

              <div className="p-4 text-xs space-y-2">
                <div className="text-amber-300 font-semibold">{recommendedSpot.highlightTag}</div>
                <p className="text-slate-300 leading-relaxed">
                  {recommendedSpot.description}
                </p>
                <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                  浪人專屬建議：適合板型 <span className="text-slate-200">{recommendedSpot.idealBoard.join('、')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={resetQuiz}
                type="button"
                className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>重新測驗</span>
              </button>
              <button
                onClick={() => {
                  onSelectSpot(recommendedSpot);
                  onClose();
                }}
                type="button"
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>查看該浪點與模擬海象</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
