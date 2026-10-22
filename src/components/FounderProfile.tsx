'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, MapPin, Award, CheckCircle, MessageSquare } from 'lucide-react';

export const FounderProfile: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-14 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-slate-50/80 border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Subtle background ambient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Image & Badges */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-slate-300/60 group">
                <Image
                  src="/images/shan-mohammad.jpg"
                  alt="Shan Mohammad - Founder & Chief Consultant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-emerald-300 text-[11px] font-bold text-emerald-800 flex items-center justify-center gap-1 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFIED CONSULTANT</span>
                </div>
              </div>

              {/* MSME Registered Pill */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>UDYAM-UP-27-0070488</span>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 inline-block">
                  {t.founderHeading}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {t.founderName}
                </h3>
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-600 pt-1 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{t.founderLocation}</span>
                </div>
              </div>

              {/* 100% Personal Accountability Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300/80 space-y-2 shadow-xs">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>100% व्यक्तिगत जवाबदेही (Direct Personal Accountability)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {t.founderGuarantee}
                </p>
              </div>

              {/* Highlights List */}
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2 font-medium">
                <li className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{language === 'hi' ? 'बिना किसी दलाल या बिचौलिए के पारदर्शी सरकारी फीस रसीद' : 'Direct transparent official government fee receipts without middlemen'}</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{language === 'hi' ? 'उत्तर प्रदेश शासन के ई-डिस्ट्रिक्ट, सारथी व राजस्व मानकों का पूर्ण अनुपालन' : 'Full compliance with UP eDistrict, Parivahan & Revenue standards'}</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{language === 'hi' ? 'गोपनीय डेटा सुरक्षा: बायोमेट्रिक या व्यक्तिगत डेटा शून्य लीकेज पॉलिसी' : 'Strict confidential data safety with zero leakage policy'}</span>
                </li>
              </ul>

              {/* Direct Reach Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="https://wa.me/919457217048?text=Namaste%20Shan%20ji,%20I%20would%20like%20guidance%20on%20my%20application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === 'hi' ? 'सीधे शान जी से WhatsApp पर पूछें' : 'Chat with Shan Mohammad on WhatsApp'}</span>
                </a>

                <a
                  href="mailto:digassist786@gmail.com"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 shadow-xs transition"
                >
                  <span>digassist786@gmail.com</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
