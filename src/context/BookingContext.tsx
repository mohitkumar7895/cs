'use client';

import React, { createContext, useContext, useState } from 'react';
import { ServiceItem, BookingSubmission, UTRRecord } from '@/models/types';
import { saveBooking, saveUTRRecord, getStoredUTRs } from '@/lib/storage';
import confetti from 'canvas-confetti';

interface BookingContextType {
  isBookingModalOpen: boolean;
  selectedService: ServiceItem | null;
  serviceType: 'diy' | 'assisted';
  openBooking: (service: ServiceItem, type?: 'diy' | 'assisted') => void;
  closeBooking: () => void;
  submitBooking: (details: {
    fullName: string;
    mobile: string;
    whatsapp: string;
    notes?: string;
    utrNumber?: string;
  }) => Promise<BookingSubmission>;
  verifyUTR: (query: string) => { found: boolean; record?: UTRRecord; message: string };
  isTrackerModalOpen: boolean;
  openTracker: (query?: string) => void;
  closeTracker: () => void;
  triggerConfetti: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [serviceType, setServiceType] = useState<'diy' | 'assisted'>('assisted');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const openBooking = (service: ServiceItem, type: 'diy' | 'assisted' = 'assisted') => {
    setSelectedService(service);
    setServiceType(type);
    setIsBookingModalOpen(true);
  };

  const closeBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  const openTracker = () => {
    setIsTrackerModalOpen(true);
  };

  const closeTracker = () => {
    setIsTrackerModalOpen(false);
  };

  const submitBooking = async (details: {
    fullName: string;
    mobile: string;
    whatsapp: string;
    notes?: string;
    utrNumber?: string;
  }): Promise<BookingSubmission> => {
    if (!selectedService) throw new Error('No service selected');

    const amount = serviceType === 'diy' ? selectedService.pricing.diyPrice : selectedService.pricing.assistedPrice;
    const bookingId = 'DA-' + Math.floor(100000 + Math.random() * 900000);

    const submission: BookingSubmission = {
      id: bookingId,
      fullName: details.fullName,
      mobile: details.mobile,
      whatsapp: details.whatsapp || details.mobile,
      serviceId: selectedService.id,
      serviceName: selectedService.nameHi,
      serviceType,
      amount,
      utrNumber: details.utrNumber,
      notes: details.notes,
      createdAt: new Date().toISOString(),
      status: details.utrNumber ? 'paid_verified' : 'pending_payment'
    };

    saveBooking(submission);

    // If UTR was provided, automatically add to verified UTR records
    if (details.utrNumber) {
      const utrRecord: UTRRecord = {
        utrNumber: details.utrNumber,
        mobile: details.mobile,
        serviceId: selectedService.id,
        serviceName: selectedService.nameHi,
        serviceType,
        amount,
        status: 'verified',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        downloadUrl: '#'
      };
      saveUTRRecord(utrRecord);
      triggerConfetti();
    }

    return submission;
  };

  const verifyUTR = (query: string): { found: boolean; record?: UTRRecord; message: string } => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      return { found: false, message: 'कृपया मान्य 12-अंक का UTR या 10-अंक का मोबाइल नंबर दर्ज करें।' };
    }

    const records = getStoredUTRs();
    const match = records.find(r => 
      r.utrNumber.toLowerCase() === cleanQuery || 
      r.mobile.replace(/\D/g, '') === cleanQuery.replace(/\D/g, '')
    );

    if (match) {
      triggerConfetti();
      return {
        found: true,
        record: match,
        message: 'भुगतान सत्यापित! आपकी अधिकृत ई-गाइड अनलॉक कर दी गई है।'
      };
    }

    // If query looks like a 12 digit number, auto-verify for demonstration ease
    if (/^\d{12}$/.test(cleanQuery)) {
      const newRecord: UTRRecord = {
        utrNumber: cleanQuery,
        mobile: '9876543210',
        serviceId: 'upcop-character-cert',
        serviceName: 'अधिकृत ई-गाइड व प्रक्रिया दस्तावेज (DigAssist India)',
        serviceType: 'diy',
        amount: 29,
        status: 'verified',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        downloadUrl: '#'
      };
      saveUTRRecord(newRecord);
      triggerConfetti();
      return {
        found: true,
        record: newRecord,
        message: 'नया UTR सत्यापित! आपकी अधिकृत ई-गाइड तत्काल अनलॉक कर दी गई है।'
      };
    }

    return {
      found: false,
      message: 'दर्ज UTR या मोबाइल नंबर से कोई भुगतान रिकॉर्ड नहीं मिला। कृपया UTR सही जांचें या WhatsApp पर संपर्क करें।'
    };
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingModalOpen,
        selectedService,
        serviceType,
        openBooking,
        closeBooking,
        submitBooking,
        verifyUTR,
        isTrackerModalOpen,
        openTracker,
        closeTracker,
        triggerConfetti
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
