import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { Hero } from './components/Hero';
import { TaiwanSpotsMap } from './components/TaiwanSpotsMap';
import { SpotDetailPage } from './components/SpotDetailPage';
import { SurfForecastSimulator } from './components/SurfForecastSimulator';
import { SeasonGuide } from './components/SeasonGuide';
import { SurferAcademy } from './components/SurferAcademy';
import { TripPlanner } from './components/TripPlanner';
import { SpotMatcherModal } from './components/SpotMatcherModal';
import { Footer } from './components/Footer';
import { SurfSpot } from './types/surf';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedSpotForSim, setSelectedSpotForSim] = useState<SurfSpot | null>(null);
  const [selectedSpotDetail, setSelectedSpotDetail] = useState<SurfSpot | null>(null);

  const handleSelectSpotForSimulation = (spot: SurfSpot) => {
    setSelectedSpotForSim(spot);
    setSelectedSpotDetail(null);
    setTimeout(() => {
      const simElement = document.getElementById('simulator');
      if (simElement) {
        simElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollToContent = () => {
    const el = document.getElementById('content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSpots = () => {
    setSelectedSpotDetail(null);
    setTimeout(() => {
      const el = document.getElementById('spots');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenSimulator = () => {
    setSelectedSpotDetail(null);
    setTimeout(() => {
      const el = document.getElementById('simulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleGoHome = () => {
    setSelectedSpotDetail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onNavigateSpots={handleExploreSpots}
        onGoHome={handleGoHome}
      />

      {/* Main Content: Either Dedicated Spot Detail Page OR Full Home Experience with Taiwan Map */}
      <main className="flex-1">
        {selectedSpotDetail ? (
          <SpotDetailPage
            spot={selectedSpotDetail}
            onBack={() => setSelectedSpotDetail(null)}
            onOpenSimulator={handleSelectSpotForSimulation}
            onSelectSpot={(spot) => setSelectedSpotDetail(spot)}
          />
        ) : (
          <>
            {/* Full-Screen Video Hero at the very top */}
            <VideoHero onScrollDown={handleScrollToContent} />

            {/* Text & Intro Hero Section */}
            <Hero
              onExploreSpots={handleExploreSpots}
              onOpenSimulator={handleOpenSimulator}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />

            {/* Taiwan Island Shape Map with Hover Popover Box & Direct Spot Navigation */}
            <TaiwanSpotsMap
              onSelectSpot={(spot) => {
                setSelectedSpotDetail(spot);
              }}
            />

            {/* Interactive Oceanography Simulator (Tide, Period, Wind, Height) */}
            <SurfForecastSimulator initialSpot={selectedSpotForSim} />

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
        }}
      />

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}
