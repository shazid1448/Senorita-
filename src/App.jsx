import React, { useState } from 'react';
import Navbar from './components/navigation/Navbar';
import HeroSection from './components/hero/HeroSection';
import TimelineSection from './components/timeline/TimelineSection';
import GallerySection from './components/gallery/GallerySection';
import LoveLetterSection from './components/letter/LoveLetterSection';
import SongPlayerSection from './components/player/SongPlayerSection';
import SpecialDatesSection from './components/specialDates/SpecialDatesSection';
import FuturePlansSection from './components/futurePlans/FuturePlansSection';
import PrivateSpaceSection from './components/privateSpace/PrivateSpaceSection';
import Footer from './components/footer/Footer';
import HeartCursor from './components/common/HeartCursor';
import FloatingPetals from './components/common/FloatingPetals';

import { useContent } from './context/ContentContext';

const AdminModal = React.lazy(() => import('./components/admin/AdminModal'));

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const { syncToast } = useContent();

  return (
    <div className="relative min-h-[100svh] bg-romantic-bg text-romantic-text overflow-x-hidden selection:bg-romantic-rose/30 selection:text-white">
      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-romantic-burgundy-dark/90 border border-romantic-rose/60 text-white text-xs shadow-glow-rose backdrop-blur-md flex items-center gap-2 animate-pulse">
          <span>{syncToast}</span>
        </div>
      )}

      {/* Desktop Heart Cursor Follower */}
      <HeartCursor />

      {/* Ambient Drifting Rose Petals & Atmospheric Glow */}
      <FloatingPetals />

      {/* Floating Pill Top Header */}
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />

      {/* Main Sections in Exact Required Order */}
      <main className="relative z-10 space-y-10 sm:space-y-16 md:space-y-24">
        {/* 1. Hero with Day Counter */}
        <HeroSection />

        {/* 2. Love Story Timeline */}
        <TimelineSection />

        {/* 3. Gallery with Lightbox */}
        <GallerySection onOpenAdmin={() => setAdminOpen(true)} />

        {/* 4. Love Letter (Royal Envelope) */}
        <LoveLetterSection />

        {/* 5. Song Player */}
        <SongPlayerSection />

        {/* 6. Special Dates */}
        <SpecialDatesSection />

        {/* 7. Future Plans (Bucket List) */}
        <FuturePlansSection />

        {/* 8. Private Space (AES-GCM Encrypted Secret Vault) */}
        <PrivateSpaceSection />
      </main>

      {/* 9. Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Admin Studio 8-Tab Modal (Lazy Loaded) */}
      {adminOpen && (
        <React.Suspense fallback={null}>
          <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
        </React.Suspense>
      )}
    </div>
  );
}
