'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { X, CheckCircle, ShieldCheck, QrCode, FileText, ArrowRight, Download, MessageCircle, AlertCircle } from 'lucide-react';

export const ServiceBookingModal: React.FC = () => {
  const { language } = useLanguage();
  const {
    isBookingModalOpen,
    closeBooking,
    selectedService,
    serviceType,
    submitBooking
  } = useBooking();

  const [currentMode, setCurrentMode] = useState<'diy' | 'assisted'>('assisted');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (serviceType) {
      setCurrentMode(serviceType);
    }
    setStep(1);
    setUtrNumber('');
    setErrorMsg('');
  }, [serviceType, isBookingModalOpen]);

  if (!isBookingModalOpen || !selectedService) return null;

  const currentPrice = currentMode === 'diy' 
    ? selectedService.pricing.diyPrice 
    : selectedService.pricing.assistedPrice;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim()) {
      setErrorMsg('कृपया नाम एवं मोबाइल नंबर भरें।');
      return;
    }
    if (mobile.replace(/\D/g, '').length < 10) {
      setErrorMsg('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim() || utrNumber.trim().length < 8) {
      setErrorMsg('कृपया भुगतान के बाद 12-अंक का वैध UTR नंबर दर्ज करें।');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitBooking({
        fullName,
        mobile,
        whatsapp: whatsapp || mobile,
        notes,
        utrNumber: utrNumber.trim()
      });
      setBookingId(res.id);
      setStep(3);
    } catch {
      setErrorMsg('सबमिशन में त्रुटि हुई, कृपया पुनः प्रयास करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadEGuideMock = () => {
    const content = `=====================================================
DIGASSIST INDIA - OFFICIAL CERTIFIED E-GUIDE
MSME REGISTRATION: UDYAM-UP-27-0070488
CHIEF CONSULTANT: SHAN MOHAMMAD
=====================================================
BOOKING ID: ${bookingId || 'DA-OFFICIAL'}
SERVICE: ${selectedService.nameHi} (${selectedService.nameEn})
APPLICANT: ${fullName}
MOBILE: ${mobile}
UTR REF: ${utrNumber}
MODE: ${currentMode === 'diy' ? 'DIY E-Guide' : 'Full Assisted Service'}
PRICE PAID: ₹${currentPrice}

REQUIRED DOCUMENTS CHECKLIST:
${selectedService.documentsHi.map((d, i) => `${i + 1}. ${d}`).join('\n')}

OFFICIAL INSTRUCTIONS & COMPLIANCE:
1. Please keep original identity documents ready for biometric / physical inspection if requested by respective departmental authorities.
2. Official portal reference: ${selectedService.officialPortal || 'State Government Portal'}.
3. For status queries or operator help, message WhatsApp at +91 94572 17048.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DigAssist_${selectedService.id}_Guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
              DA
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-800 font-bold block">
                UDYAM-UP-27-0070488
              </span>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                {language === 'hi' ? selectedService.nameHi : selectedService.nameEn}
              </h3>
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector (DIY vs Assisted) */}
        {step < 3 && (
          <div className="p-4 bg-slate-100/70 border-b border-slate-200">
            <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setCurrentMode('diy')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  currentMode === 'diy'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>DIY ई-गाइड (₹{selectedService.pricing.diyPrice})</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentMode('assisted')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  currentMode === 'assisted'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>असिस्टेड सेवा (₹{selectedService.pricing.assistedPrice})</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-grow">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Applicant Details */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>आवश्यक दस्तावेज सूची:</span>
                </span>
                <ul className="text-slate-700 space-y-1">
                  {selectedService.documentsHi.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    आवेदक का पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="उदा. राहुल शर्मा"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 outline-none shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      मोबाइल नंबर (10 अंक) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 outline-none font-mono shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp नंबर (वैकल्पिक)
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 outline-none font-mono shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    टिप्पणी या विशेष आवश्यकता (Optional Notes)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="उदा. तत्काल अपॉइंटमेंट या नाम सुधार..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-emerald-500 outline-none shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-2"
              >
                <span>आगे बढ़ें (₹{currentPrice} का भुगतान)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: UPI QR Payment & 12-digit UTR Input */}
          {step === 2 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                  <span>आधिकारिक UPI QR कोड</span>
                </div>

                <div className="relative mx-auto w-36 h-36 bg-white p-2 rounded-xl shadow-md flex flex-col items-center justify-center border-2 border-slate-200">
                  <div className="w-full h-full border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-2 text-slate-900 text-center">
                    <span className="font-mono text-[10px] font-bold text-emerald-800">DigAssist India</span>
                    <QrCode className="w-16 h-16 text-slate-900 my-1" />
                    <span className="text-[10px] font-bold font-mono">₹{currentPrice}</span>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-slate-800 font-semibold">
                    UPI ID: <span className="font-mono text-emerald-700 font-bold">digassist@upi</span>
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    PhonePe / Google Pay / Paytm / BHIM द्वारा स्कैन करें
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  भुगतान का 12-अंक का UTR / Transaction Ref नंबर दर्ज करें *
                </label>
                <input
                  type="text"
                  required
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="उदा. 432109876543 (12 अंक)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 outline-none font-mono tracking-wider shadow-xs"
                />
                <p className="text-[11px] text-slate-500 font-medium">
                  पेमेंट रसीद में &apos;Bank Ref No&apos; या &apos;UTR&apos; 12 अंकों का होता है।
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-300"
                >
                  पीछे
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>सत्यापन हो रहा है...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>सत्यापित करें व अनलॉक करें</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Success & Download */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">
                  आवेदन व UTR सफलतापूर्वक दर्ज!
                </h4>
                <p className="text-xs text-emerald-800 font-mono font-bold">
                  रजिस्ट्रेशन टोकन: {bookingId}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-xs text-left text-slate-700 space-y-1.5 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">सेवा:</span>
                  <span className="font-bold text-slate-900">{selectedService.nameHi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">आवेदक:</span>
                  <span>{fullName} ({mobile})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">UTR संदर्भ:</span>
                  <span className="font-mono text-emerald-800 font-bold">{utrNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">परामर्शदाता:</span>
                  <span className="text-amber-800 font-bold">शान मोहम्मद (सीधा पर्यवेक्षण)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={downloadEGuideMock}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>📥 अधिकृत ई-गाइड व प्रक्रिया रसीद डाउनलोड करें</span>
                </button>

                <a
                  href={`https://wa.me/919457217048?text=Namaste%20Shan%20ji,%20I%20have%20submitted%20my%20application%20for%20${encodeURIComponent(selectedService.nameHi)}%20with%20Token%20${bookingId}%20and%20UTR%20${utrNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>सीधे ऑपरेटर को WhatsApp पर टोकन भेजें</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
