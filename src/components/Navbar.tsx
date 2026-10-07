import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Compass, Waves, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '../context/LanguageContext';

interface NavbarProps {
  onOpenQuiz: () => void;
  onNavigateTaiwanIntro?: () => void;
  onNavigateSpots?: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz, onNavigateTaiwanIntro, onNavigateSpots, onGoHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t('nav.taiwanIntro'), href: '#taiwan-intro', isTaiwanIntroLink: true },
    { label: t('nav.spots'), href: '#spots', isSpotLink: true },
    { label: t('nav.seasons'), href: '#seasons' },
    { label: t('nav.etiquette'), href: '#academy' },
    { label: t('nav.planner'), href: '#planner' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isTaiwanIntroLink && onNavigateTaiwanIntro) {
      e.preventDefault();
      onNavigateTaiwanIntro();
    } else if (link.isSpotLink && onNavigateSpots) {
      e.preventDefault();
      onNavigateSpots();
    } else if (onGoHome) {
      onGoHome();
    }
  };

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === lang) || LANGUAGE_OPTIONS[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={onGoHome}
          type="button"
          className="flex items-baseline gap-2.5 transition-opacity hover:opacity-90 text-left cursor-pointer"
        >
          <Waves className="h-5 w-5 text-cyan-400 shrink-0 self-center" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {t('nav.brand')}
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-cyan-400 uppercase hidden min-[440px]:inline">
            WAVES TIME TAIWAN
          </span>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="transition-colors hover:text-cyan-400 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions + Multi-Language Dropdown */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Multi-Language Dropdown Selector (Desktop) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-cyan-500/40 bg-slate-900/90 hover:bg-slate-850 text-cyan-300 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-expanded={langDropdownOpen}
              aria-label="Language selector"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>{currentOption.flag}</span>
              <span className="font-sans font-bold hidden sm:inline">{currentOption.nativeName}</span>
              <ChevronDown className="h-3 w-3 text-cyan-400/80 transition-transform duration-200" style={{ transform: langDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  {t('common.langSelect')}
                </div>
                {LANGUAGE_OPTIONS.map((opt) => {
                  const isSelected = lang === opt.code;
                  return (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLang(opt.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-xs font-semibold flex items-center justify-between text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{opt.flag}</span>
                        <span>{opt.nativeName}</span>
                      </span>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quiz Button */}
          <button
            onClick={onOpenQuiz}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shadow-sm shadow-cyan-950 cursor-pointer"
          >
            <Compass className="h-3.5 w-3.5 shrink-0" />
            <span>{t('nav.quiz')}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {/* Mobile Language Selector */}
          <div className="pb-3 border-b border-slate-800/80">
            <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5 font-medium">
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t('common.langSelect')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = lang === opt.code;
                return (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLang(opt.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleLinkClick(e, link);
              }}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
