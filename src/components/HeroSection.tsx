'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { ALL_SERVICES } from '@/lib/services-data';
import { ServiceItem } from '@/models/types';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  MessageCircle,
  Award,
  Star
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const { openBooking, triggerConfetti } = useBooking();

  // Curated Top Demanded Services for Instant 1-Click Inspection
  const quickServices: ServiceItem[] = [
    ALL_SERVICES[1], // PAN Card
    ALL_SERVICES[0], // UPCOP Character Cert
    ALL_SERVICES[3], // Traffic Challan Lok Adalat
    ALL_SERVICES[2], // GST Registration
    ALL_SERVICES[4], // PM Kisan / Khatauni
  ].filter(Boolean);

  const [activeService, setActiveService] = useState<ServiceItem>(quickServices[0] || ALL_SERVICES[0]);

  const scrollToServices = () => {
    const el = document.getElementById('wizard-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceName = language === 'hi' ? activeService.nameHi : activeService.nameEn;
  const docs = language === 'hi' ? activeService.documentsHi : activeService.documentsEn;
  const approxTime = language === 'hi' ? activeService.estimatedTimeHi : activeService.estimatedTimeEn;

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Background ambient lighting aura */}
      <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[450px] bg-gradient-to-br from-emerald-200/50 via-teal-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] bg-gradient-to-bl from-amber-200/40 via-emerald-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Main 2-Column Split: One Side Writing & Actions | Other Side Big Majestic Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Information */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>डाकखाना चौराहा, दीदामई, फ़िरोज़ाबाद</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs font-bold shadow-2xs">
                <Bot className="w-3.5 h-3.5 text-amber-300" />
                <span>अधिकृत AI जन सेवा केंद्र</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
              {language === 'hi' ? (
                <>
                  सरकारी व डिजिटल सेवाएं{' '}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                    अब AI से आसान व 100% सटीक
                  </span>
                </>
              ) : (
                <>
                  Govt & Citizen Services{' '}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                    Fast & Verified by AI
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              {language === 'hi' 
                ? 'नया पैन कार्ड, UPCOP पुलिस चरित्र सत्यापन, ई-चालान, खतौनी, आय/जाति/निवास व 58+ ई-गवर्नेंस सेवाएं — बिना गलती, सीधे मुख्य परामर्शदाता शान मोहम्मद की देखरेख में।' 
                : 'PAN Card, UPCOP Police Verification, Traffic Challan, Land records & 58+ government services with zero rejection guarantee under Shan Mohammad.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl shimmer-btn text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{language === 'hi' ? 'सभी 58 सेवाएं देखें' : 'Explore All 58 Services'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-chat'))}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 font-bold text-xs sm:text-sm border border-slate-300 hover:border-emerald-300 shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'AI से सवाल पूछें' : 'Ask AI Assistant'}</span>
              </button>

              <a
                href="https://wa.me/919457217048?text=Namaste%20Shan%20ji,%20I%20need%20assistance%20with%20Govt%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-300 transition active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Shan</span>
              </a>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">त्वरित AI जांच</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">MSME प्रमाणित</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <Lock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">100% सुरक्षित</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <Award className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">0% रिजेक्शन</span>
              </div>
            </div>
          </div>

          {/* Right Column: Big Impressive Image Showcase */}
          <div className="lg:col-span-6 relative">
            
            {/* Top Floating Badge */}
            <div className="hidden sm:flex absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-300 shadow-xl items-center gap-2.5 animate-float">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">AI Document Inspector</span>
                <span className="text-[11px] text-emerald-700 font-bold">100% सही दस्तावेज जांच</span>
              </div>
            </div>

            {/* Bottom Right Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-4 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-300 shadow-xl items-center gap-2.5 animate-float-slow">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">10,000+ संतुष्ट नागरिक</span>
                <span className="text-[11px] text-amber-700 font-bold">फ़िरोज़ाबाद का सबसे भरोसेमंद केंद्र</span>
              </div>
            </div>

            {/* Big Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl group bg-white p-2.5 sm:p-3">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                <Image
                  src="/images/hero-modern-kiosk.jpg"
                  alt="DigAssist India E-Governance & Jan Seva Kendra Kiosk"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Bottom Certificate Pill */}
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 via-emerald-50/40 to-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-black text-xs shadow-md">
                      MSME
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="font-mono">UDYAM-UP-27-0070488</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">
                        संचालक: शान मोहम्मद • फ़िरोज़ाबाद (उ.प्र.)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-700">58+ सेवाएं</span>
                    <p className="text-[10px] text-slate-500 font-medium">1-क्लिक सहायता</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 1-Click Interactive AI Service & Document Inspector */}
        <div className="rounded-3xl bg-white border border-emerald-200/90 p-4 sm:p-6 shadow-md shadow-emerald-600/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>⚡ 1-क्लिक सेवा व दस्तावेज चेकलिस्ट</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    AI FAST CHECK
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  सेवा पर टैप करें — आवश्यक दस्तावेज और समय तुरंत देखें
                </p>
              </div>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {quickServices.map((s) => {
                const isSelected = activeService.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveService(s)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {language === 'hi' ? s.nameHi.split('(')[0] : s.nameEn.split('(')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="md:col-span-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                {activeService.badge || '★ OFFICIAL SERVICE'}
              </span>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {serviceName}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{approxTime}</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">{activeService.officialPortal || 'Govt Portal'}</span>
              </div>
            </div>

            {/* Required Docs Pills */}
            <div className="md:col-span-5 space-y-1.5">
              <span className="text-xs font-bold text-slate-700 block">
                📋 जरूरी दस्तावेज (Checklist):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {docs.map((doc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-medium shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="md:col-span-3 flex justify-start md:justify-end">
              <button
                onClick={() => {
                  triggerConfetti();
                  openBooking(activeService, 'assisted');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition active:scale-95"
              >
                <span>आवेदन शुरू करें</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
