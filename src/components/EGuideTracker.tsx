'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { UTRRecord } from '@/models/types';
import { Download, Search, CheckCircle, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';

export const EGuideTracker: React.FC = () => {
  const { language, t } = useLanguage();
  const { verifyUTR } = useBooking();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ found: boolean; record?: UTRRecord; message: string } | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = verifyUTR(query.trim());
    setResult(res);
  };

  const copySampleUTR = (sample: string) => {
    setQuery(sample);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownload = (record: UTRRecord) => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      const content = `=====================================================
DIGASSIST INDIA - AUTHORIZED E-GOVERNANCE FACILITATION CENTER
MSME REGISTRATION: UDYAM-UP-27-0070488
CHIEF CONSULTANT: SHAN MOHAMMAD
ADDRESS: Ramgarh Road / Post Office Chauraha, Deedamai, Firozabad (U.P.)
EMAIL: digassist786@gmail.com
=====================================================

OFFICIAL VERIFIED E-GUIDE & STEP-BY-STEP PROCESS DOCUMENT
-----------------------------------------------------
Service: ${record.serviceName}
Reference UTR: ${record.utrNumber}
Payment Status: VERIFIED (₹${record.amount})
Timestamp: ${record.timestamp}

OFFICIAL STEP-BY-STEP INSTRUCTIONS:
1. Log in to the official state portal or visit the authorized kiosk.
2. Prepare scanned copies of your Aadhaar card and required identity proofs.
3. Keep your registration token and reference UTR receipt securely saved.
4. For police verification (UPCOP) or eDistrict submissions, physical verification will occur at your local jurisdiction.
5. In case of any clarification or tracking issues, message Shan Mohammad directly on WhatsApp or email digassist786@gmail.com.

PERSONAL ACCOUNTABILITY GUARANTEE:
100% individual oversight under Shan Mohammad.
=====================================================`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DigAssist_EGuide_${record.utrNumber}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <section id="trackDownloadSection" className="py-14 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Box Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-50 via-white to-slate-50 border border-slate-200 p-6 sm:p-10 shadow-lg shadow-slate-200/50 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'त्वरित डिजिटल सत्यापन' : 'Instant Digital Verification'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.trackerTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {t.trackerDesc}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="max-w-2xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.trackerPlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono shadow-xs"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>{t.trackerBtn}</span>
              </button>
            </div>

            {/* Quick Demo UTR Click */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1 font-medium">
              <span>{language === 'hi' ? 'परीक्षण हेतु नमूना UTR क्लिक करें:' : 'Try sample test UTR:'}</span>
              <button
                type="button"
                onClick={() => copySampleUTR('123456789012')}
                className="font-mono text-emerald-700 hover:text-emerald-800 underline font-bold flex items-center gap-1"
              >
                123456789012
                {hasCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
              <span className="text-slate-400">•</span>
              <button
                type="button"
                onClick={() => copySampleUTR('9876543210')}
                className="font-mono text-emerald-700 hover:text-emerald-800 underline font-bold"
              >
                9876543210
              </button>
            </div>
          </form>

          {/* Verification Result Display */}
          {result && (
            <div className="max-w-2xl mx-auto pt-2">
              {result.found && result.record ? (
                <div className="rounded-2xl bg-emerald-50/80 border border-emerald-300 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-300 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-200/70 flex items-center justify-center text-emerald-800 flex-shrink-0">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                          {language === 'hi' ? 'सत्यापित एवं अधिकृत' : 'VERIFIED & UNLOCKED'}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">
                          {result.record.serviceName}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                      ₹{result.record.amount} PAID
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-white rounded-xl p-3 border border-emerald-200">
                    <div>
                      <span className="text-slate-500 block">UTR Number:</span>
                      <span className="font-mono text-slate-900 font-bold">{result.record.utrNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Mobile:</span>
                      <span className="font-mono text-slate-900 font-medium">{result.record.mobile}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Service Type:</span>
                      <span className="capitalize text-slate-900 font-bold">{result.record.serviceType} Mode</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Verified On:</span>
                      <span className="text-slate-700 font-medium">{result.record.timestamp}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(result.record!)}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition active:scale-98"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>ई-गाइड जनरेट हो रही है...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>📥 अधिकृत ई-गाइड व प्रक्रिया डॉक्युमेंट डाउनलोड करें</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl bg-amber-50 border border-amber-300 p-5 flex items-start gap-3 text-amber-900 text-xs shadow-xs">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{result.message}</p>
                    <p className="text-amber-800">
                      यदि आपने अभी-अभी UPI पेमेंट किया है, तो कभी-कभी बैंक सर्वर से UTR अपडेट होने में 1-2 मिनट लग सकते हैं।
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
