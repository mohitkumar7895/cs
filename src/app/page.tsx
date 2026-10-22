'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { BookingProvider } from '@/context/BookingContext';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { QuickWizard } from '@/components/QuickWizard';
import { FeaturedServices } from '@/components/FeaturedServices';
import { AllServicesGrid } from '@/components/AllServicesGrid';
import { FounderProfile } from '@/components/FounderProfile';
import { ComplianceDisclaimer } from '@/components/ComplianceDisclaimer';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { ServiceBookingModal } from '@/components/ServiceBookingModal';
import { LiveOperatorCockpit } from '@/components/LiveOperatorCockpit';
import { AiAssistantChat } from '@/components/AiAssistantChat';

function MainApp() {
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar onOpenCockpit={() => setIsCockpitOpen(true)} />
      <main className="flex-grow pb-28 md:pb-0">
        <HeroSection />
        <QuickWizard />
        <FeaturedServices />
        <AllServicesGrid />
        <FounderProfile />
        <ComplianceDisclaimer />
      </main>
      <Footer onOpenCockpit={() => setIsCockpitOpen(true)} />
      
      {/* Mobile Sticky Quick Navigation */}
      <MobileBottomNav onOpenCockpit={() => setIsCockpitOpen(true)} />

      {/* Interactive Modals & AI Floating Chat */}
      <ServiceBookingModal />
      <LiveOperatorCockpit
        isOpen={isCockpitOpen}
        onClose={() => setIsCockpitOpen(false)}
      />
      <AiAssistantChat />
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
