'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { ShieldCheck, Download, Globe, MessageCircle, Headphones } from 'lucide-react';

interface NavbarProps {
  onOpenCockpit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCockpit }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { openTracker } = useBooking();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-sm">
      {/* Top Banner Alert Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold text-emerald-300">{t.liveOperator}:</span>
            <span className="text-slate-200">{t.operatorStatus}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-mono text-amber-200 font-bold">{t.udyamReg}</span>
            </div>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-200">{t.centerLocation}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm border border-emerald-500/30 flex-shrink-0 bg-slate-50">
            <Image
              src="/images/security-seal.jpg"
              alt="DigAssist India Seal"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <a href="#" className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                <span>DigAssist</span>
                <span className="text-emerald-600">India</span>
              </a>
              <span className="hidden sm:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                MSME VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-medium">
              {language === 'hi' ? 'अधिकृत ई-गवर्नेंस एवं परामर्श केंद्र • फ़िरोज़ाबाद' : 'Authorized E-Governance & Consultancy Center • Firozabad'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
            title="भाषा बदलें / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? '🌐 English' : '🌐 हिन्दी'}</span>
          </button>

          {/* Download E-Guide Tracker Button */}
          <button
            onClick={() => openTracker()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.downloadEGuideBtn}</span>
            <span className="sm:hidden">ई-गाइड</span>
          </button>

          {/* Live Operator WhatsApp Chat */}
          <a
            href="https://wa.me/919457217048?text=Namaste%20Shan%20ji,%20I%20need%20assistance%20with%20DigAssist%20India%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden md:inline">WhatsApp Help</span>
          </a>

          {/* Operator Cockpit Button */}
          <button
            onClick={onOpenCockpit}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
            title="Operator Cockpit"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">Cockpit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
