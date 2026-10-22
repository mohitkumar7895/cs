'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { X, CheckCircle, ShieldCheck, FileText, ArrowRight, MessageCircle, AlertCircle, Phone, UserCheck, Clock } from 'lucide-react';

export const ServiceBookingModal: React.FC = () => {
  const { language } = useLanguage();
  const {
    isBookingModalOpen,
    closeBooking,
    selectedService,
    submitBooking,
    triggerConfetti
  } = useBooking();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (isBookingModalOpen) {
      setIsSubmitted(false);
      setBookingId('');
      setErrorMsg('');
      setFullName('');
      setMobile('');
      setWhatsapp('');
      setNotes('');
    }
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen || !selectedService) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया नाम एवं मोबाइल नंबर भरें।' : 'Please enter your full name and mobile number.');
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await submitBooking({
        fullName: fullName.trim(),
        mobile: cleanMobile,
        whatsapp: whatsapp ? whatsapp.replace(/\D/g, '') : cleanMobile,
        notes: notes.trim(),
        utrNumber: 'DIRECT-FACILITATION'
      });
      setBookingId(res.id);
      setIsSubmitted(true);
      triggerConfetti();
    } catch {
      setErrorMsg(language === 'hi' ? 'सबमिशन में त्रुटि हुई, कृपया पुनः प्रयास करें।' : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceName = language === 'hi' ? selectedService.nameHi : selectedService.nameEn;
  const docs = language === 'hi' ? selectedService.documentsHi : selectedService.documentsEn;
  const approxTime = language === 'hi' ? selectedService.estimatedTimeHi : selectedService.estimatedTimeEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
              MSME
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold block">
                UDYAM-UP-27-0070488
              </span>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                {serviceName}
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

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-grow">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Document Checklist Pill Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'hi' ? 'जरूरी दस्तावेज चेकलिस्ट:' : 'Required Documents Checklist:'}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{approxTime}</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {docs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200/80 text-[11px] text-slate-700 font-medium">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="line-clamp-1">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicant Input Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'hi' ? 'आवेदक का पूरा नाम (Full Name) *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono font-medium transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'hi' ? 'व्हाट्सएप नंबर (वैकल्पिक)' : 'WhatsApp (Optional)'}
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder={mobile || '9876543210'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono font-medium transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'hi' ? 'कोई विशेष विवरण / नोट (वैकल्पिक)' : 'Special Note / Details (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === 'hi' ? 'उदा. नया आवेदन करना है / सुधार करवाना है' : 'Any specific requirement or urgency...'}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none font-medium transition"
                  />
                </div>
              </div>

              {/* Trust Box */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">
                  {language === 'hi' 
                    ? 'शान मोहम्मद द्वारा 100% व्यक्तिगत देखरेख व त्रुटिहीन दस्तावेज जांच।' 
                    : '100% individual verification & oversight under Shan Mohammad.'}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>{language === 'hi' ? 'आवेदन सबमिट करें व शान जी से जुड़ें' : 'Submit Application & Connect'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success Screen */
            <div className="space-y-5 text-center py-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">
                  {language === 'hi' ? 'आवेदन सफलतापूर्वक दर्ज हुआ!' : 'Application Successfully Registered!'}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {language === 'hi' 
                    ? 'शान मोहम्मद के ऑपरेटर डेस्क पर आपका विवरण प्राप्त हो गया है।' 
                    : 'Your details have been recorded on Shan Mohammad\'s operator desk.'}
                </p>
              </div>

              {/* Booking Reference Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reference ID:</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">सेवा:</span>
                  <span className="font-bold text-slate-900 line-clamp-1">{serviceName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">आवेदक:</span>
                  <span className="font-bold text-slate-900">{fullName} ({mobile})</span>
                </div>
              </div>

              {/* Direct WhatsApp Call Actions */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/919457217048?text=${encodeURIComponent(
                    `नमस्ते शान जी, मैंने "${serviceName}" के लिए आवेदन किया है।\nरेफरेंस ID: ${bookingId}\nनाम: ${fullName}\nकृपया आगे की प्रक्रिया बताएं।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'hi' ? 'WhatsApp पर दस्तावेज भेजें' : 'Send Documents on WhatsApp'}</span>
                </a>

                <a
                  href="tel:+919457217048"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'शान जी को सीधे कॉल करें: 9457217048' : 'Call Shan Directly: 9457217048'}</span>
                </a>
              </div>

              <button
                onClick={closeBooking}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline pt-2"
              >
                {language === 'hi' ? 'खिड़की बंद करें' : 'Close window'}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
