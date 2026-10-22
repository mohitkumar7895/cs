'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { ShieldCheck, Zap, Lock, Users, Sparkles, ArrowRight, Download } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { openTracker } = useBooking();

  const scrollToServices = () => {
    const el = document.getElementById('wizard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-100/60 via-teal-100/50 to-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t.centerLocation}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
              {t.heroTitle}{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToServices}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl shimmer-btn text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{language === 'hi' ? 'सेवा चुनें व शुरू करें' : 'Explore & Start Service'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openTracker()}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>{t.downloadEGuideBtn}</span>
              </button>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">{t.trust1}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">{t.trust2}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <Lock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">{t.trust3}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <Users className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">{t.trust4}</span>
              </div>
            </div>
          </div>

          {/* Right Banner Image Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl group bg-white p-2">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/images/hero-banner.jpg"
                  alt="DigAssist India E-Governance Kiosk"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Float Overlay Badge */}
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                      MSME
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>UDYAM-UP-27-0070488</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {language === 'hi' ? 'उत्तर प्रदेश सरकार एवं सूक्ष्म, लघु उद्योग प्रमाणित' : 'Govt of UP & MSME Registered Facilitation'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700">58+ Services</span>
                    <p className="text-[10px] text-slate-500 font-medium">1-Click Assisted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
