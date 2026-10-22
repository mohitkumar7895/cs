'use client';

import React, { useState, useEffect } from 'react';
import { getStoredBookings, getStoredUTRs } from '@/lib/storage';
import { BookingSubmission, UTRRecord } from '@/models/types';
import { X, ShieldCheck, Activity, User, Phone, CheckCircle, RefreshCw } from 'lucide-react';

interface LiveOperatorCockpitProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveOperatorCockpit: React.FC<LiveOperatorCockpitProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [utrs, setUtrs] = useState<UTRRecord[]>([]);

  const refreshData = () => {
    setBookings(getStoredBookings());
    setUtrs(getStoredUTRs());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Cockpit Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5 sm:gap-3 truncate">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-xs sm:text-base font-bold text-slate-900 truncate">
                  🔒 Operator Cockpit — Shan Mohammad
                </h3>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex-shrink-0">
                  LIVE DESK
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                Ramgarh Road / Post Office Chauraha, Deedamai, Firozabad (UP)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Verified UTRs</span>
              <span className="text-xl font-bold font-mono text-emerald-700">{utrs.length}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Client Queue</span>
              <span className="text-xl font-bold font-mono text-amber-700">{bookings.length}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Compliance</span>
              <span className="text-xl font-bold font-mono text-blue-700">100%</span>
            </div>
          </div>

          {/* Active UTRs List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified UTR Transactions</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-mono font-medium">{utrs.length} records</span>
            </div>

            <div className="space-y-2">
              {utrs.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs shadow-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 line-clamp-1">{item.serviceName}</div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      UTR: <span className="text-emerald-700 font-bold">{item.utrNumber}</span> • Mob: {item.mobile}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold font-mono text-amber-700 block">₹{item.amount}</span>
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          {bookings.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-600" />
                <span>Latest Service Bookings</span>
              </h4>
              <div className="space-y-2">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 shadow-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-900">{b.fullName}</span>
                      <span className="font-mono text-amber-700">₹{b.amount}</span>
                    </div>
                    <div className="text-slate-500 flex justify-between text-[11px] font-medium">
                      <span>{b.serviceName}</span>
                      <span className="font-mono text-slate-600">{b.id}</span>
                    </div>
                    {b.notes && (
                      <p className="text-[11px] text-slate-600 italic bg-white p-1.5 rounded border border-slate-200">
                        Note: &ldquo;{b.notes}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct WhatsApp Call */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="font-bold text-emerald-900 block">Chief Consultant Hotline</span>
              <span className="text-slate-600 font-medium">Available Mon-Sat: 09:00 AM - 08:00 PM</span>
            </div>
            <a
              href="tel:+919457217048"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Shan</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
