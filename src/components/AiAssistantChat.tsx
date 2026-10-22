'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';
import { ALL_SERVICES } from '@/lib/services-data';
import { ServiceItem } from '@/models/types';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Clock, 
  FileText, 
  ArrowRight, 
  RotateCcw,
  Zap,
  CheckCircle2,
  HelpCircle,
  Minimize2,
  ChevronDown,
  Volume2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  matchedService?: ServiceItem;
  timestamp: string;
  quickActions?: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }[];
}

const PRESET_QUICK_QUESTIONS = [
  { labelHi: '🪪 नया पैन कार्ड', labelEn: '🪪 New PAN Card', query: 'पैन कार्ड' },
  { labelHi: '🚗 चालान लोक अदालत', labelEn: '🚗 Traffic Challan', query: 'ट्रैफिक चालान' },
  { labelHi: '👮 पुलिस चरित्र प्रमाण (UPCOP)', labelEn: '👮 Police Verification', query: 'UPCOP' },
  { labelHi: '🏥 5 लाख आयुष्मान कार्ड', labelEn: '🏥 Ayushman Card', query: 'आयुष्मान कार्ड' },
  { labelHi: '🌾 खतौनी / किसान eKYC', labelEn: '🌾 Khatauni / PM Kisan', query: 'खतौनी' },
  { labelHi: '📜 आय / जाति / निवास', labelEn: '📜 Income / Caste Cert', query: 'आय प्रमाण' },
  { labelHi: '📍 केंद्र का पता व टाइमिंग', labelEn: '📍 Location & Timing', query: 'पता और टाइमिंग' },
];

export const AiAssistantChat: React.FC = () => {
  const { language } = useLanguage();
  const { openBooking, triggerConfetti } = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText = language === 'hi'
        ? `नमस्ते! 🙏 मैं **DigiAI सहायक** हूँ — शान मोहम्मद (MSME प्रमाणित केंद्र, फ़िरोज़ाबाद) का डिजिटल गाइड।\n\nआप किसी भी सरकारी योजना, पैन, आधार, चालान, खतौनी या प्रमाण पत्र के बारे में पूछ सकते हैं। मैं आपको **आवश्यक दस्तावेज, सरकारी फीस और सही समय** तुरंत बताऊंगा!`
        : `Hello! 🙏 I am **DigiAI Assistant** — Digital Guide for Shan Mohammad's MSME Certified E-Governance Center, Firozabad.\n\nAsk me about any Govt scheme, PAN, Aadhaar, Challan, Khatauni or certificates. I will instantly guide you with **required documents, official fees, and turnaround time**!`;

      setMessages([
        {
          id: 'welcome-1',
          sender: 'ai',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [language, messages.length]);

  // Listen to external triggers (e.g. Navbar or MobileNav) & toggle
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('open-ai-chat', handleOpen);
    window.addEventListener('toggle-ai-chat', handleToggle);
    return () => {
      window.removeEventListener('open-ai-chat', handleOpen);
      window.removeEventListener('toggle-ai-chat', handleToggle);
    };
  }, []);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Teaser auto-hide after 9s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const findMatchingService = (query: string): ServiceItem | undefined => {
    const q = query.toLowerCase().trim();
    
    return ALL_SERVICES.find((s) => {
      const nameHi = s.nameHi.toLowerCase();
      const nameEn = s.nameEn.toLowerCase();
      const id = s.id.toLowerCase();
      const descHi = s.shortDescHi.toLowerCase();
      const descEn = s.shortDescEn.toLowerCase();

      if (q.includes('pan') || q.includes('पैन')) return id.includes('pan');
      if (q.includes('challan') || q.includes('चालान')) return id.includes('challan');
      if (q.includes('upcop') || q.includes('चरित्र') || q.includes('police') || q.includes('पुलिस')) return id.includes('upcop');
      if (q.includes('ayushman') || q.includes('आयुष्मान') || q.includes('5 लाख') || q.includes('इलाज')) return id.includes('ayushman') || nameHi.includes('आयुष्मान');
      if (q.includes('khatauni') || q.includes('खतौनी') || q.includes('भूलेख') || q.includes('जमीन')) return id.includes('khatauni') || nameHi.includes('खतौनी');
      if (q.includes('kisan') || q.includes('किसान') || q.includes('pm kisan') || q.includes('ekyc')) return id.includes('pm-kisan') || nameHi.includes('किसान');
      if (q.includes('aay') || q.includes('आय') || q.includes('income')) return id.includes('income') || nameHi.includes('आय');
      if (q.includes('jati') || q.includes('जाति') || q.includes('caste')) return id.includes('caste') || nameHi.includes('जाति');
      if (q.includes('niwas') || q.includes('निवास') || q.includes('domicile')) return id.includes('domicile') || nameHi.includes('निवास');
      if (q.includes('ration') || q.includes('राशन')) return id.includes('ration') || nameHi.includes('राशन');
      if (q.includes('license') || q.includes('लाइसेंस') || q.includes('dl') || q.includes('ड्राइविंग')) return id.includes('driving') || nameHi.includes('ड्राइविंग');
      if (q.includes('gst') || q.includes('जीएसटी')) return id.includes('gst');
      if (q.includes('pension') || q.includes('पेंशन')) return id.includes('pension') || nameHi.includes('पेंशन');
      if (q.includes('voter') || q.includes('वोटर') || q.includes('पहचान पत्र')) return id.includes('voter') || nameHi.includes('मतदाता');
      if (q.includes('passport') || q.includes('पासपोर्ट')) return id.includes('passport') || nameHi.includes('पासपोर्ट');
      if (q.includes('scholarship') || q.includes('छात्रवृत्ति')) return id.includes('scholarship') || nameHi.includes('छात्रवृत्ति');

      return (
        nameHi.includes(q) ||
        nameEn.includes(q) ||
        descHi.includes(q) ||
        descEn.includes(q)
      );
    });
  };

  const generateAiReply = (query: string): { text: string; matchedService?: ServiceItem } => {
    const q = query.toLowerCase();

    // Check for Location / Contact Intent
    if (
      q.includes('kahan') ||
      q.includes('address') ||
      q.includes('location') ||
      q.includes('पता') ||
      q.includes('shop') ||
      q.includes('timing') ||
      q.includes('समय') ||
      q.includes('phone') ||
      q.includes('contact') ||
      q.includes('shan') ||
      q.includes('शान')
    ) {
      const text = language === 'hi'
        ? `📍 **हमारा केंद्र पता एवं संपर्क विवरण:**\n\n• **संचालक:** शान मोहम्मद (Chief Consultant)\n• **पंजीकरण:** MSME Reg. UDYAM-UP-27-0070488\n• **पता:** रामगढ़ रोड / पोस्ट ऑफिस चौराहा, दीदामई, फ़िरोज़ाबाद (उत्तर प्रदेश)\n• **हेल्पलाइन:** +91 94572 17048\n• **कार्य समय:** सोमवार से शनिवार, सुबह 09:00 AM से रात 08:00 PM\n\nआप सीधे केंद्र पर आ सकते हैं या नीचे दिए गए बटन से WhatsApp पर सीधे शान जी से चैट कर सकते हैं!`
        : `📍 **Center Address & Contact Details:**\n\n• **Lead Consultant:** Shan Mohammad\n• **Certification:** MSME Reg. UDYAM-UP-27-0070488\n• **Address:** Ramgarh Road / Post Office Chauraha, Deedamai, Firozabad (UP)\n• **Hotline:** +91 94572 17048\n• **Timings:** Monday - Saturday, 09:00 AM - 08:00 PM\n\nYou can visit our center directly or message Shan Mohammad on WhatsApp below!`;
      
      return { text };
    }

    // Check for Matching Service
    const matched = findMatchingService(query);

    if (matched) {
      const sName = language === 'hi' ? matched.nameHi : matched.nameEn;
      const docs = language === 'hi' ? matched.documentsHi : matched.documentsEn;
      const time = language === 'hi' ? matched.estimatedTimeHi : matched.estimatedTimeEn;
      const docsList = docs.map((d) => `• ${d}`).join('\n');

      const text = language === 'hi'
        ? `✅ **${sName}** की पूरी जानकारी:\n\n📋 **जरूरी दस्तावेज (Checklist):**\n${docsList}\n\n⏱️ **समय:** ${time}\n🏛️ **आधिकारिक पोर्टल:** ${matched.officialPortal || 'Govt Portal'}\n\n✨ क्या आप इस सेवा के लिए अभी आवेदन शुरू करना चाहते हैं?`
        : `✅ Complete details for **${sName}**:\n\n📋 **Required Documents Checklist:**\n${docsList}\n\n⏱️ **Estimated Time:** ${time}\n🏛️ **Portal:** ${matched.officialPortal || 'Govt Portal'}\n\n✨ Would you like to start this application right now?`;

      return { text, matchedService: matched };
    }

    // Default Fallback
    const fallback = language === 'hi'
      ? `मैंने आपकी बात नोट कर ली है। हमारे केंद्र पर **58+ सरकारी व डिजिटल सेवाएं** उपलब्ध हैं (पैन, आधार, UPCOP, ई-चालान, खतौनी, आय/जाति प्रमाण, GST आदि)।\n\nकृपया नीचे दिए गए किसी विषय पर क्लिक करें या सीधे शान मोहम्मद से WhatsApp पर बात करें:`
      : `I noted your query. Our center offers **58+ Govt & Digital services** (PAN, Aadhaar, UPCOP, Traffic Challan, Khatauni, Income/Caste Certs, GST, etc.).\n\nSelect a topic below or chat directly with Shan Mohammad on WhatsApp:`;

    return { text: fallback };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI thinking delay (500ms)
    setTimeout(() => {
      const reply = generateAiReply(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply.text,
        matchedService: reply.matchedService,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const resetChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Teaser Pill (Shows briefly on page load) */}
      {!isOpen && showTeaser && (
        <div 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-36 sm:bottom-24 right-4 sm:right-5 z-40 max-w-xs bg-white/95 backdrop-blur-md text-slate-800 p-3 rounded-2xl border border-emerald-300 shadow-2xl flex items-center gap-3 cursor-pointer animate-float animate-in fade-in slide-in-from-bottom-4 transition-transform hover:scale-105"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white flex-shrink-0 relative shadow-sm">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute -top-0.5 -right-0.5 animate-ping" />
          </div>
          <div className="text-xs">
            <p className="font-black text-slate-900 flex items-center gap-1">
              <span>DigiAI सहायक</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">24/7 ONLINE</span>
            </p>
            <p className="text-slate-600 text-[11px] leading-tight line-clamp-1 font-medium">
              {language === 'hi' ? 'सवालों के जवाब • जरूरी कागजात तुरंत जानें' : 'Instant answers • Required checklist'}
            </p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toggle Button (Smoothly toggles Open & Close - Above mobile bottom nav) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full text-white font-bold text-xs shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-900 ring-2 ring-emerald-400/50'
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-700/50 animate-pulse-glow'
        }`}
        title={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:rotate-90 transition-transform" />
          ) : (
            <>
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
            </>
          )}
        </div>
        <span className="tracking-wide text-[11px] sm:text-xs">
          {isOpen 
            ? (language === 'hi' ? 'बंद करें' : 'Close AI') 
            : (language === 'hi' ? 'AI से पूछें' : 'Ask AI')}
        </span>
        {!isOpen && <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-pulse" />}
      </button>

      {/* Backdrop overlay on mobile to easily close with 1 tap */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs sm:hidden animate-in fade-in"
        />
      )}

      {/* AI Chat Window Modal / Bottom-Right Drawer - Responsive & never clips top */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="fixed inset-x-2 sm:inset-auto bottom-16 sm:bottom-20 sm:right-5 z-50 sm:w-[420px] h-[72vh] sm:h-[580px] max-h-[580px] flex flex-col rounded-3xl bg-white/98 backdrop-blur-xl border border-emerald-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-emerald-700/40 relative shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md border border-emerald-300/40 flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                    <span>DigiAI सहायक</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200/80">
                  {/* Audio Wave Visualizer */}
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 bg-emerald-400 rounded-full animate-soundwave-1" />
                    <span className="w-0.5 bg-emerald-400 rounded-full animate-soundwave-2" />
                    <span className="w-0.5 bg-emerald-400 rounded-full animate-soundwave-3" />
                    <span className="w-0.5 bg-emerald-400 rounded-full animate-soundwave-4" />
                  </div>
                  <span className="font-medium">
                    {language === 'hi' ? '58+ सेवाएं • त्वरित जानकारी' : '58+ Services • Instant Guidance'}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Controls: Reset, Minimize, Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
                title="Reset Chat / चैट रीसेट करें"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition flex items-center gap-1 font-bold text-xs"
                title="Minimize / बंद करें"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white transition"
                title="Close / बंद करें"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-start gap-2 max-w-[88%]">
                    {isAi && (
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 shadow-2xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isAi
                          ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                          : 'bg-emerald-600 text-white rounded-tr-sm font-medium shadow-sm shadow-emerald-600/20'
                      }`}
                    >
                      <div className="whitespace-pre-line space-y-1">
                        {msg.text}
                      </div>

                      {/* If AI matched a specific service, render Interactive Action Card */}
                      {isAi && msg.matchedService && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                            <span>🏛️ {msg.matchedService.officialPortal || 'Govt Portal'}</span>
                            <span className="text-emerald-700">समय: {language === 'hi' ? msg.matchedService.estimatedTimeHi : msg.matchedService.estimatedTimeEn}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => {
                                triggerConfetti();
                                openBooking(msg.matchedService!, 'assisted');
                              }}
                              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black shadow-md shadow-emerald-600/20 transition hover:brightness-105 active:scale-95"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              <span>{language === 'hi' ? 'आवेदन करें' : 'Apply Now'}</span>
                            </button>

                            <a
                              href={`https://wa.me/919457217048?text=${encodeURIComponent(
                                `नमस्ते शान जी, मुझे "${msg.matchedService.nameHi}" सेवा के बारे में जानकारी व सहायता चाहिए।`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 transition"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 max-w-[200px] shadow-xs animate-in fade-in">
                <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Bot className="w-3 h-3 animate-spin" />
                </div>
                <span className="font-medium animate-pulse">
                  {language === 'hi' ? 'AI जांच रहा है...' : 'AI is checking...'}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Prompt Pills */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <p className="text-[10px] font-bold text-slate-500 mb-1.5 px-1 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>{language === 'hi' ? 'लोकप्रिय प्रश्न (1-क्लिक):' : 'Suggested Questions:'}</span>
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {PRESET_QUICK_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 hover:border-emerald-300 text-[11px] font-medium transition active:scale-95 flex-shrink-0"
                >
                  {language === 'hi' ? item.labelHi : item.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={language === 'hi' ? 'पूछें... उदा. पैन कार्ड के लिए क्या चाहिए?' : 'Ask anything... e.g. PAN card documents?'}
                className="flex-grow px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 border border-slate-300 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 outline-none transition font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-emerald-500 hover:to-teal-500 transition shadow-md shadow-emerald-600/20 active:scale-95 flex-shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1 border-t border-slate-100 pt-1.5">
              <span>🔒 MSME UDYAM-UP-27-0070488</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-emerald-700 hover:underline font-bold flex items-center gap-0.5"
              >
                <span>[✕ बंद करें]</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
