'use client';

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Download, MessageCircle, ShieldCheck } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenCockpit: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenCockpit }) => {
  const { openTracker } = useBooking();
  const { language } = useLanguage();

  const scrollToServices = () => {
    const el = document.getElementById('wizard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2 shadow-lg shadow-black/10">
      <div className="grid grid-cols-4 gap-1 items-center text-center">
        
        {/* Services */}
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl hover:bg-slate-100 transition active:scale-95 text-slate-700"
        >
          <Sparkles className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-bold">
            {language === 'hi' ? 'सेवाएं' : 'Services'}
          </span>
        </button>

        {/* E-Guide Unlock */}
        <button
          onClick={() => openTracker()}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition active:scale-95 text-emerald-800 border border-emerald-200"
        >
          <Download className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-black">
            {language === 'hi' ? 'ई-गाइड' : 'E-Guide'}
          </span>
        </button>

        {/* WhatsApp Live */}
        <a
          href="https://wa.me/919457217048?text=Namaste%20Shan%20ji,%20I%20need%20assistance%20with%20DigAssist%20India%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl hover:bg-slate-100 transition active:scale-95 text-slate-700"
        >
          <MessageCircle className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* Operator Desk */}
        <button
          onClick={onOpenCockpit}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl hover:bg-slate-100 transition active:scale-95 text-slate-700"
        >
          <ShieldCheck className="w-5 h-5 text-amber-600 mb-0.5" />
          <span className="text-[10px] font-bold">
            {language === 'hi' ? 'डेस्क' : 'Desk'}
          </span>
        </button>

      </div>
    </nav>
  );
};
