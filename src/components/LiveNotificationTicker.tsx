'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BellRing, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const LiveNotificationTicker: React.FC = () => {
  const { language } = useLanguage();

  const updatesHi = [
    '⚡ लोक अदालत ई-चालान सेटलमेंट हेतु ऑनलाइन टोकन बुकिंग प्रारंभ।',
    '🛡️ 100% सुरक्षित प्रक्रिया: MSME अधिकृत ई-गवर्नेंस केंद्र (UDYAM-UP-27-0070488)।',
    '👮 UPCOP पुलिस चरित्र प्रमाण पत्र व सत्यापन फॉर्म समयबद्ध उपलब्ध।',
    '🌾 भूलेख खतौनी नकल व डिजिटल भू-नक्शा तत्काल 15 मिनट में उपलब्ध।',
    '🟢 शान मोहम्मद (संस्थापक) सीधे ऑपरेटर डेस्क पर परामर्श हेतु उपलब्ध।'
  ];

  const updatesEn = [
    '⚡ National Lok Adalat traffic challan settlement tokens open now.',
    '🛡️ 100% Secure Process: MSME Authorized E-Governance (UDYAM-UP-27-0070488).',
    '👮 UPCOP Police Verification & Character Certificate online filing.',
    '🌾 UP Bhulekh Khatauni nakal & certified land map instant download.',
    '🟢 Shan Mohammad (Founder) available for live direct consultation.'
  ];

  const updates = language === 'hi' ? updatesHi : updatesEn;

  return (
    <div className="bg-emerald-50 border-y border-emerald-200/80 overflow-hidden py-2 text-xs">
      <div className="flex items-center">
        {/* Fixed Label Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white font-bold rounded-r-full shadow-xs flex-shrink-0 z-10 text-[11px]">
          <BellRing className="w-3.5 h-3.5 animate-bounce" />
          <span>{language === 'hi' ? 'लाइव अलर्ट' : 'LIVE ALERT'}</span>
        </div>

        {/* Scrolling Ticker */}
        <div className="overflow-hidden whitespace-nowrap w-full relative">
          <div className="animate-marquee flex items-center gap-8 text-emerald-950 font-semibold">
            {updates.concat(updates).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>{item}</span>
                <span className="text-emerald-300 font-bold ml-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
