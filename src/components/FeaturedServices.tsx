'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useService } from '@/context/ServiceContext';
import { useBooking } from '@/context/BookingContext';
import { CATEGORY_LABELS } from '@/lib/services-data';
import { Flame, FileText, ArrowRight, BookOpen, UserCheck, Clock, Bot } from 'lucide-react';

export const FeaturedServices: React.FC = () => {
  const { language, t } = useLanguage();
  const { topServices } = useService();
  const { openBooking } = useBooking();

  return (
    <section className="py-14 bg-slate-50/70 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>{language === 'hi' ? 'सर्वाधिक लोकप्रिय' : 'Most Popular'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.topDemandTitle}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              {t.topDemandSub}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{language === 'hi' ? 'सीधे शान मोहम्मद द्वारा सत्यापित' : 'Supervised by Shan Mohammad'}</span>
          </div>
        </div>

        {/* 6 Cards Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topServices.map((service) => {
            const categoryObj = CATEGORY_LABELS[service.category];
            const categoryLabel = language === 'hi' ? categoryObj.hi : categoryObj.en;
            const name = language === 'hi' ? service.nameHi : service.nameEn;
            const docs = language === 'hi' ? service.documentsHi : service.documentsEn;
            const approxTime = language === 'hi' ? service.estimatedTimeHi : service.estimatedTimeEn;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-sm interactive-card flex flex-col justify-between overflow-hidden"
              >
                {/* Top Image Preview */}
                {service.image && (
                  <div className="relative aspect-[16/10] w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-700 shadow-xs border border-slate-200">
                      {categoryLabel}
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[11px] font-black shadow-xs">
                      {service.badge || '★ TOP'}
                    </div>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  
                  {/* Service Title & Time */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{approxTime}</span>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5 flex-grow text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t.requiredDocs}</span>
                    </div>
                    <ul className="text-slate-600 space-y-1">
                      {docs.slice(0, 3).map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span className="line-clamp-1">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Official Portal */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                      <span>{service.officialPortal || 'Govt Portal'}</span>
                      <span className="text-emerald-700 font-bold">100% सत्यापित</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-chat'))}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 text-xs font-bold border border-slate-300 hover:border-emerald-300 transition"
                      >
                        <Bot className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'hi' ? 'AI से पूछें' : 'Ask AI'}</span>
                      </button>

                      <button
                        onClick={() => openBooking(service, 'assisted')}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>{t.startServiceBtn}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
