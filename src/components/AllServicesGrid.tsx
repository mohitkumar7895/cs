'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useService } from '@/context/ServiceContext';
import { useBooking } from '@/context/BookingContext';
import { ServiceCategory } from '@/models/types';
import { CATEGORY_LABELS } from '@/lib/services-data';
import { Layers, ChevronDown, ChevronUp, CheckCircle2, ExternalLink } from 'lucide-react';

export const AllServicesGrid: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    activeCategory,
    setActiveCategory,
    filteredServices,
    searchQuery
  } = useService();
  const { openBooking } = useBooking();
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: ServiceCategory[] = [
    'all',
    'identity',
    'gst_business',
    'itr_banking',
    'women_child',
    'vehicle_court',
    'up_kisan'
  ];

  const displayedServices = searchQuery || activeCategory !== 'all' || isExpanded 
    ? filteredServices 
    : filteredServices.slice(0, 9);

  return (
    <section id="directory-section" className="py-14 bg-slate-50/60 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? '58+ सत्यापित सेवाएं सूचीबद्ध' : '58+ Verified Services Indexed'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.allServicesTitle}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {t.allServicesSub}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {categories.map((catKey) => {
            const label = language === 'hi' ? CATEGORY_LABELS[catKey].hi : CATEGORY_LABELS[catKey].en;
            const isActive = activeCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Services List Grid */}
        {displayedServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3 shadow-xs">
            <p className="text-base text-slate-800 font-bold">
              {language === 'hi' ? 'कोई सेवा नहीं मिली।' : 'No matching service found.'}
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {language === 'hi'
                ? 'कृपया दूसरा कीवर्ड सर्च करें अथवा सीधे ऑपरेटर डेस्क पर WhatsApp द्वारा संपर्क करें।'
                : 'Please try another search keyword or contact Shan Mohammad directly on WhatsApp.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedServices.map((service) => {
              const name = language === 'hi' ? service.nameHi : service.nameEn;
              const desc = language === 'hi' ? service.shortDescHi : service.shortDescEn;
              const docs = language === 'hi' ? service.documentsHi : service.documentsEn;

              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 p-5 flex flex-col justify-between interactive-card shadow-xs"
                >
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {CATEGORY_LABELS[service.category][language === 'hi' ? 'hi' : 'en']}
                      </span>
                      {service.officialPortal && (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono font-medium">
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[120px]">{service.officialPortal}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {desc}
                    </p>

                    {/* Compact Documents Tag */}
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                      <div className="font-bold text-slate-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{t.requiredDocs}</span>
                      </div>
                      <p className="text-slate-500 line-clamp-1 font-medium">
                        {docs.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Pricing */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">
                        {t.diyLabel}: <span className="text-amber-600 font-bold">₹{service.pricing.diyPrice}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">
                        {t.assistedLabel}: <span className="text-emerald-700 font-bold">₹{service.pricing.assistedPrice}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openBooking(service, 'diy')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition"
                      >
                        DIY ई-गाइड
                      </button>
                      <button
                        onClick={() => openBooking(service, 'assisted')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition"
                      >
                        असिस्ट
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Expand / Collapse Toggle if not searched */}
        {!searchQuery && activeCategory === 'all' && filteredServices.length > 9 && (
          <div className="text-center pt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold border border-slate-300 shadow-sm transition"
            >
              <span>{isExpanded ? t.hideServices : t.viewAllServices}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
