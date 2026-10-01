import React, { useState } from 'react';
import { Menu, X, Compass, Waves } from 'lucide-react';

interface NavbarProps {
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '經典浪點', href: '#spots' },
    { label: '浪況模擬', href: '#simulator' },
    { label: '四季湧浪', href: '#seasons' },
    { label: '浪人守則', href: '#academy' },
    { label: '旅行規劃', href: '#planner' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <Waves className="h-5 w-5 text-cyan-400 shrink-0" />
          <span className="font-extrabold tracking-tight">東浪紀行</span>
          <span className="text-xs font-normal tracking-wider text-cyan-400/90 uppercase hidden sm:inline">
            Taitung Surf
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-cyan-400 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuiz}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shadow-sm shadow-cyan-950"
          >
            <Compass className="h-3.5 w-3.5 shrink-0" />
            <span>命定浪點測驗</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-850">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 rounded-lg"
            >
              開啟命定浪點測驗
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
