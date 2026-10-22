'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { BookingProvider } from '@/context/BookingContext';
import { Navbar } from '@/components/Navbar';
import { LiveNotificationTicker } from '@/components/LiveNotificationTicker';
import { HeroSection } from '@/components/HeroSection';
import { QuickWizard } from '@/components/QuickWizard';
import { FeaturedServices } from '@/components/FeaturedServices';
import { AllServicesGrid } from '@/components/AllServicesGrid';
import { EGuideTracker } from '@/components/EGuideTracker';
import { FounderProfile } from '@/components/FounderProfile';
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ServiceBookingModal } from '@/components/ServiceBookingModal';
import { LiveOperatorCockpit } from '@/components/LiveOperatorCockpit';

function MainApp() {
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar onOpenCockpit={() => setIsCockpitOpen(true)} />
      <LiveNotificationTicker />
      <main className="flex-grow pb-16 md:pb-0">
        <HeroSection />
        <QuickWizard />
        <FeaturedServices />
        <EGuideTracker />
        <AllServicesGrid />
        <FounderProfile />
        <ComplianceDisclaimer />
      </main>
      <Footer onOpenCockpit={() => setIsCockpitOpen(true)} />
      
      {/* Mobile Sticky Quick Navigation */}
      <MobileBottomNav onOpenCockpit={() => setIsCockpitOpen(true)} />

      {/* Interactive Modals */}
      <ServiceBookingModal />
      <LiveOperatorCockpit
        isOpen={isCockpitOpen}
        onClose={() => setIsCockpitOpen(false)}
      />
    </div>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <ServiceProvider>
        <BookingProvider>
          <MainApp />
        </BookingProvider>
      </ServiceProvider>
    </LanguageProvider>
  );
}
