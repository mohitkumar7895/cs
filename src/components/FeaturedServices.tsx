'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useService } from '@/context/ServiceContext';
import { useBooking } from '@/context/BookingContext';
import { CATEGORY_LABELS } from '@/lib/services-data';
import { Flame, FileText, ArrowRight, BookOpen, UserCheck, Clock } from 'lucide-react';

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

                  {/* Pricing & Actions */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-amber-50 rounded-lg p-2 border border-amber-200/70">
                        <span className="text-[10px] text-amber-800 font-semibold block">{t.diyLabel}</span>
                        <span className="text-sm font-black text-amber-700">₹{service.pricing.diyPrice}</span>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-200/70">
                        <span className="text-[10px] text-emerald-800 font-semibold block">{t.assistedLabel}</span>
                        <span className="text-sm font-black text-emerald-700">₹{service.pricing.assistedPrice}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openBooking(service, 'diy')}
                        className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition"
                        title="Download verified DIY guide"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>DIY गाइड</span>
                      </button>

                      <button
                        onClick={() => openBooking(service, 'assisted')}
                        className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
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
