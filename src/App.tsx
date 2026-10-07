import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { Hero } from './components/Hero';
import { TaiwanSpotsMap } from './components/TaiwanSpotsMap';
import { SpotDetailPage } from './components/SpotDetailPage';
import { TaiwanIntroPage } from './components/TaiwanIntroPage';
import { SeasonGuide } from './components/SeasonGuide';
import { SurferAcademy } from './components/SurferAcademy';
import { TripPlanner } from './components/TripPlanner';
import { SpotMatcherModal } from './components/SpotMatcherModal';
import { Footer } from './components/Footer';
import { SurfSpot } from './types/surf';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTaiwanIntroOpen, setIsTaiwanIntroOpen] = useState(false);
  const [selectedSpotDetail, setSelectedSpotDetail] = useState<SurfSpot | null>(null);

  const handleScrollToContent = () => {
    const el = document.getElementById('content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateTaiwanIntro = () => {
    setSelectedSpotDetail(null);
    setIsTaiwanIntroOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHero = () => {
    setSelectedSpotDetail(null);
    setIsTaiwanIntroOpen(false);
    setTimeout(() => {
      const el = document.getElementById('content');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }, 40);
  };

  const handleExploreSpots = () => {
    setSelectedSpotDetail(null);
    setIsTaiwanIntroOpen(false);
    setTimeout(() => {
      const el = document.getElementById('spots');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleGoHome = () => {
    setSelectedSpotDetail(null);
    setIsTaiwanIntroOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950">
        {/* Top Navigation Bar with 臺灣介紹 shortcut to the left of 全臺浪點 */}
        <Navbar
          onOpenQuiz={() => setIsQuizOpen(true)}
          onNavigateTaiwanIntro={handleNavigateTaiwanIntro}
          onNavigateSpots={handleExploreSpots}
          onGoHome={handleGoHome}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {isTaiwanIntroOpen ? (
            /* Dedicated Taiwan Intro Page (介紹台灣分頁) */
            <TaiwanIntroPage
              onBack={handleBackToHero}
              onExploreSpots={handleExploreSpots}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          ) : selectedSpotDetail ? (
            /* Dedicated Surf Spot Guide Page */
            <SpotDetailPage
              spot={selectedSpotDetail}
              onBack={handleExploreSpots}
              onSelectSpot={(spot) => setSelectedSpotDetail(spot)}
            />
          ) : (
            /* Main Surf Island Home Experience (Surf Forecast Simulator removed) */
            <>
              {/* Full-Screen Video Hero at the very top */}
              <VideoHero onScrollDown={handleScrollToContent} />

              {/* Text & Intro Hero Section with 詳細了解台灣 button */}
              <Hero
                onExploreSpots={handleExploreSpots}
                onOpenTaiwanIntro={handleNavigateTaiwanIntro}
                onOpenQuiz={() => setIsQuizOpen(true)}
              />

              {/* Taiwan Island Shape Map with Hover Popover Box & Direct Spot Navigation */}
              <TaiwanSpotsMap
                onSelectSpot={(spot) => {
                  setSelectedSpotDetail(spot);
                  setIsTaiwanIntroOpen(false);
                }}
              />

              {/* Four Seasons in Taiwan & WSL Open Feature */}
              <SeasonGuide />

              {/* Ocean Etiquette & Surfboard Selection Academy */}
              <SurferAcademy />

              {/* Road Trip Planner & Packing Checklist */}
              <TripPlanner />
            </>
          )}
        </main>

        {/* Spot Matcher Quiz Modal */}
        <SpotMatcherModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onSelectSpot={(spot) => {
            setSelectedSpotDetail(spot);
            setIsTaiwanIntroOpen(false);
          }}
        />

        {/* Quiet Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
