'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useService } from '@/context/ServiceContext';
import { ServiceCategory } from '@/models/types';
import { Search, X, Zap } from 'lucide-react';

export const QuickWizard: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredServices
  } = useService();

  const categories: { id: ServiceCategory; icon: string; labelHi: string; labelEn: string }[] = [
    { id: 'all', icon: '🌟', labelHi: 'सभी सेवाएं', labelEn: 'All Services' },
    { id: 'vehicle_court', icon: '🚗', labelHi: 'वाहन व चालान', labelEn: 'Vehicles & Challan' },
    { id: 'up_kisan', icon: '🌾', labelHi: 'किसान व ज़मीन', labelEn: 'Farmers & Land' },
    { id: 'itr_banking', icon: '👴', labelHi: 'पेंशन व बैंकिंग', labelEn: 'Pension & Banking' },
    { id: 'gst_business', icon: '💼', labelHi: 'व्यापार व GST', labelEn: 'Business & GST' },
    { id: 'identity', icon: '🆔', labelHi: 'पहचान पत्र', labelEn: 'Citizen Identity' },
  ];

  const quickKeywords = [
    'UPCOP', 'पैन कार्ड', 'ई-चालान', 'खतौनी', 'वृद्धावस्था पेंशन', 'GST', 'राशन कार्ड', 'आय प्रमाण', 'HSRP प्लेट', 'ड्राइविंग लाइसेंस'
  ];

  return (
    <section id="wizard-section" className="py-8 bg-white border-y border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Wizard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-600 fill-amber-500" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              {t.quickWizardTitle}
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {language === 'hi' 
              ? `${filteredServices.length} सेवाएं उपलब्ध` 
              : `${filteredServices.length} services available`}
          </span>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{language === 'hi' ? cat.labelHi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder-slate-400 text-sm outline-none transition font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-slate-500 font-semibold mr-1">
            {language === 'hi' ? 'लोकप्रिय खोज:' : 'Quick Searches:'}
          </span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition text-[11px] font-medium"
            >
              {kw}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
