'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldAlert, Info, Mail, Lock } from 'lucide-react';

export const ComplianceDisclaimer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white text-slate-700 border-t border-slate-200 text-xs leading-relaxed">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Disclaimer Card: Safe Independent Assistance */}
        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{t.safeAssistanceTitle}</span>
          </div>
          <p className="text-slate-700 text-xs leading-relaxed font-medium">
            {t.safeAssistanceText}
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-800 font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Data Leakage Guarantee • No passwords, OTPs, or biometric storage.</span>
          </div>
        </div>

        {/* Bottom Disclaimer Card: Hindi Statutory Notice */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{t.statutoryDisclaimerTitle}</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            {t.statutoryDisclaimerText}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Mail className="w-3.5 h-3.5" />
              <a href="mailto:digassist786@gmail.com" className="underline hover:text-emerald-800">
                digassist786@gmail.com
              </a>
            </span>
            <span className="text-slate-400">•</span>
            <span className="font-mono text-slate-600">MSME UDYAM-UP-27-0070488</span>
            <span className="text-slate-400">•</span>
            <span>फ़िरोज़ाबाद, उत्तर प्रदेश - 283203</span>
          </div>
        </div>

      </div>
    </section>
  );
};
