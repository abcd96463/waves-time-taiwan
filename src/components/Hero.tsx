import React from 'react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/images/taiwan_surf_paradise_1791375388913.jpg';

interface HeroProps {
  onExploreSpots: () => void;
  onOpenTaiwanIntro: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSpots, onOpenTaiwanIntro, onOpenQuiz }) => {
  const { lang, t } = useLanguage();

  return (
    <section id="content" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background visual asset with contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Surfing in Taiwan Formosa with majestic green mountains and turquoise Pacific waves"
          loading="eager"
          className="h-full w-full object-cover object-center brightness-90 contrast-105 scale-100"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/images/taiwan_surf_paradise.jpg') {
              target.src = '/images/taiwan_surf_paradise.jpg';
            }
          }}
        />
        {/* Measured dark scrim for WCAG AA compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
      </div>

      {/* Main hero content container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col justify-center">
        {/* Editorial unboxed kicker / trust marker */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-medium tracking-wide text-cyan-300 mb-4">
          <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 font-extrabold tracking-wider uppercase text-xs sm:text-sm shadow-md shadow-cyan-950/60">
            {t('hero.kickerBadge')}
          </span>
          <span>{t('hero.kickerCoast')}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{t('hero.kickerWater')}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{t('hero.kickerSafety')}</span>
        </div>

        {/* Headline with text-wrap balance - "臺灣" font size enlarged with refined slightly deeper golden amber */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl text-balance leading-[1.15]">
          {t('hero.titleLine1')}
          <span className="block mt-2 sm:mt-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-200">
              {t('hero.titleLine2Prefix')}
            </span>
            {/* Tone-down warm amber gold without glaring neon yellow */}
            <span className="inline-block text-[1.28em] sm:text-[1.34em] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 drop-shadow-[0_4px_14px_rgba(217,119,6,0.3)] ml-0.5 align-baseline">
              {t('hero.taiwanWord')}
            </span>
            <span className="text-amber-400/90">
              {['zh', 'ja'].includes(lang) ? '。' : '.'}
            </span>
          </span>
        </h1>

        {/* English inspiring subtitle for international travelers */}
        <p className="mt-2 text-xs sm:text-sm font-semibold tracking-widest text-cyan-400/90 uppercase">
          {t('hero.subtitleEn')}
        </p>

        {/* Value proposition paragraph - concise, irresistible Taiwan introduction */}
        <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal">
          {t('hero.desc')}
          <button
            onClick={onOpenTaiwanIntro}
            type="button"
            className="inline-flex items-center gap-1.5 ml-2.5 text-cyan-400 hover:text-cyan-300 font-bold hover:underline underline-offset-4 transition-colors cursor-pointer group align-baseline"
          >
            <span>
              {lang === 'zh'
                ? '—— 詳細了解台灣'
                : lang === 'ja'
                ? '—— 台湾を詳しく知る'
                : lang === 'ko'
                ? '—— 대만 자세히 알아보기'
                : lang === 'es'
                ? '—— Descubre más'
                : '—— Learn more'}
            </span>
            <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
          </button>
        </p>

        {/* Taiwan Unique Highlights Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-cyan-400">🏄‍♂️</span>
            <span>{t('hero.badge1')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-amber-400">🍜</span>
            <span>{t('hero.badge2')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-emerald-400">🛡️</span>
            <span>{t('hero.badge3')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-sky-400">♨️</span>
            <span>{t('hero.badge4')}</span>
          </div>
        </div>

        {/* Primary & secondary action group */}
        <div className="mt-7 flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <button
            onClick={onExploreSpots}
            type="button"
            className="px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-950/50 whitespace-nowrap active:scale-95 cursor-pointer"
          >
            {t('hero.btnExplore')}
          </button>
          <button
            onClick={onOpenTaiwanIntro}
            type="button"
            className="px-6 py-3 text-sm font-semibold text-white bg-slate-900/90 border border-cyan-400/60 rounded-lg hover:border-cyan-300 hover:bg-slate-800 transition-all shadow-lg shadow-cyan-950/40 whitespace-nowrap active:scale-95 cursor-pointer flex items-center gap-2 group"
          >
            <Compass className="h-4 w-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
            <span>{t('hero.btnLearnTaiwan')}</span>
          </button>
          <button
            onClick={onOpenQuiz}
            type="button"
            className="px-4 py-3 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>{t('hero.btnQuiz')}</span>
          </button>
        </div>

        {/* Pacific Real-Time Marine & Travel Island Observation Strip */}
        <div className="mt-12 max-w-3xl rounded-xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide">
                {t('hero.stripHeader')}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {t('hero.stripSub')}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
            <div>
              <div className="text-xs text-slate-400">{t('hero.waterTemp')} (Water Temp)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                24 — 28 <span className="text-xs font-sans font-normal text-slate-400">°C</span>
              </div>
              <div className="text-[11px] text-cyan-400">{t('hero.waterTempSub')}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">{t('hero.swell')} (Swell)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                1.6 — 2.4 <span className="text-xs font-sans font-normal text-slate-400">m</span>
              </div>
              <div className="text-[11px] text-emerald-400">{t('hero.swellSub')}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">{t('hero.transit')} (Transit)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                {t('hero.transitMode')}{' '}
                <span className="text-xs font-sans font-normal text-slate-400">
                  {t('hero.transitDetail')}
                </span>
              </div>
              <div className="text-[11px] text-amber-400">{t('hero.transitSub')}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">{t('hero.afterSurf')} (After Surf)</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums mt-0.5">
                {t('hero.afterSurfMode')}{' '}
                <span className="text-xs font-sans font-normal text-slate-400">
                  {t('hero.afterSurfDetail')}
                </span>
              </div>
              <div className="text-[11px] text-cyan-300">{t('hero.afterSurfSub')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <a
        href="#spots"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-cyan-400 transition-colors p-2"
        aria-label="Scroll down to spots"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};
