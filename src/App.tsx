import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { Hero } from './components/Hero';
import { SpotExplorer } from './components/SpotExplorer';
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

  const handleSelectSpotForSimulation = (spot: SurfSpot) => {
    setSelectedSpotForSim(spot);
    const simElement = document.getElementById('simulator');
    if (simElement) {
      simElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContent = () => {
    const el = document.getElementById('content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSpots = () => {
    const el = document.getElementById('spots');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Full-Screen Video Hero at the very top */}
        <VideoHero onScrollDown={handleScrollToContent} />

        {/* Text & Intro Hero Section (Revealed when scrolling down) */}
        <Hero
          onExploreSpots={handleExploreSpots}
          onOpenSimulator={handleOpenSimulator}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 6 Major Spots Explorer with Filters & Detail Modal */}
        <SpotExplorer onSelectSpotForSimulation={handleSelectSpotForSimulation} />

        {/* Interactive Oceanography Simulator (Tide, Period, Wind, Height) */}
        <SurfForecastSimulator initialSpot={selectedSpotForSim} />

        {/* Four Seasons in Taitung & WSL Taiwan Open of Surfing Feature */}
        <SeasonGuide />

        {/* Ocean Etiquette & Surfboard Selection Academy */}
        <SurferAcademy />

        {/* Taitung Highway 11 Road Trip Planner & Packing Checklist */}
        <TripPlanner />
      </main>

      {/* Spot Matcher Quiz Modal */}
      <SpotMatcherModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectSpot={(spot) => {
          handleSelectSpotForSimulation(spot);
        }}
      />

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}
