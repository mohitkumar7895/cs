'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { ShieldCheck, MapPin, Mail, MessageCircle, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCockpit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCockpit }) => {
  const { language } = useLanguage();
  const { openTracker } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 text-slate-600 text-xs border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand & Registration */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 flex-shrink-0 bg-white shadow-xs">
                <Image
                  src="/images/security-seal.jpg"
                  alt="DigAssist India"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 flex items-center gap-1">
                  <span>DigAssist</span>
                  <span className="text-emerald-700">India</span>
                </span>
                <span className="text-[11px] font-mono text-amber-700 font-bold block">
                  UDYAM-UP-27-0070488
                </span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-sm font-medium">
              {language === 'hi'
                ? 'अधिकृत ई-गवर्नेंस एवं परामर्श सुविधा केंद्र। नागरिकों व व्यापारियों को सरकारी व कानूनी प्रक्रियाओं में सटीक एवं पारदर्शी डिजिटल सहायता।'
                : 'Authorized E-Governance & Consultancy facilitation center empowering citizens and businesses with transparent, error-free online solutions.'}
            </p>

            <div className="space-y-1.5 text-slate-700 text-xs font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>डाकखाना चौराहा / रामगढ़ रोड, दीदामई, फ़िरोज़ाबाद (उ.प्र.) - 283203</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <a href="mailto:digassist786@gmail.com" className="text-emerald-700 font-bold hover:underline">
                  digassist786@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {language === 'hi' ? 'महत्वपूर्ण लिंक्स' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#wizard-section" className="hover:text-emerald-700 transition">
                  {language === 'hi' ? '⚡ 1-क्लिक स्मार्ट विज़ार्ड (सेवा खोजें)' : '⚡ 1-Click Smart Wizard'}
                </a>
              </li>
              <li>
                <a href="#directory-section" className="hover:text-emerald-700 transition">
                  {language === 'hi' ? '🔎 सम्पूर्ण 58+ सेवा निर्देशिका' : '🔎 Full 58+ Service Directory'}
                </a>
              </li>
              <li>
                <button onClick={() => openTracker()} className="hover:text-emerald-700 transition text-left">
                  {language === 'hi' ? '📥 ई-गाइड डाउनलोड व UTR सत्यापन' : '📥 E-Guide Download & UTR Verification'}
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/919457217048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 transition flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'शान मोहम्मद - WhatsApp लाइव डेस्क' : 'Shan Mohammad - WhatsApp Desk'}</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenCockpit} className="hover:text-emerald-700 transition flex items-center gap-1 text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>🔒 Operator Cockpit</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Badge & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {language === 'hi' ? 'कार्य समय व प्रमाणन' : 'Working Hours & Seals'}
            </h4>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
              <span className="text-emerald-800 font-bold block">सोमवार - शनिवार:</span>
              <p className="text-slate-700 font-medium">09:00 AM - 08:00 PM</p>
              <span className="text-slate-500 block text-[11px]">रविवार: केवल पूर्व अपॉइंटमेंट</span>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>MSME Registered Facilitation</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            DigAssist India • Authorized E-Governance Facilitation Center • Ramgarh Road, Firozabad (U.P.)
            <br />
            MSME Registration: <span className="font-mono text-slate-700 font-bold">UDYAM-UP-27-0070488</span> • Founder: <span className="text-slate-900 font-bold">Shan Mohammad (शान मोहम्मद)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 transition shadow-xs font-semibold"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
