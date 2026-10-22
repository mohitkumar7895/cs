import { BookingSubmission, UTRRecord } from '@/models/types';

const INITIAL_UTRS: UTRRecord[] = [
  {
    utrNumber: '123456789012',
    mobile: '9876543210',
    serviceId: 'upcop-character-cert',
    serviceName: 'पुलिस चरित्र प्रमाण पत्र सत्यापन (UPCOP)',
    serviceType: 'diy',
    amount: 29,
    status: 'verified',
    timestamp: '2026-10-22 09:30 AM',
    downloadUrl: '#'
  },
  {
    utrNumber: '998877665544',
    mobile: '9123456789',
    serviceId: 'gst-new-registration',
    serviceName: 'GST नया पंजीकरण (Regular/Composition)',
    serviceType: 'assisted',
    amount: 499,
    status: 'verified',
    timestamp: '2026-10-21 04:15 PM',
    downloadUrl: '#'
  },
  {
    utrNumber: '554433221100',
    mobile: '9988771122',
    serviceId: 'traffic-challan-lok-adalat',
    serviceName: 'ट्रैफिक चालान राष्ट्रीय लोक अदालत सेटलमेंट',
    serviceType: 'diy',
    amount: 49,
    status: 'verified',
    timestamp: '2026-10-20 02:45 PM',
    downloadUrl: '#'
  }
];

export const getStoredUTRs = (): UTRRecord[] => {
  if (typeof window === 'undefined') return INITIAL_UTRS;
  try {
    const data = localStorage.getItem('digassist_utrs');
    return data ? JSON.parse(data) : INITIAL_UTRS;
  } catch {
    return INITIAL_UTRS;
  }
};

export const saveUTRRecord = (record: UTRRecord): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredUTRs();
    const filtered = current.filter(item => item.utrNumber !== record.utrNumber);
    const updated = [record, ...filtered];
    localStorage.setItem('digassist_utrs', JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving UTR record:', err);
  }
};

export const getStoredBookings = (): BookingSubmission[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('digassist_bookings');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveBooking = (booking: BookingSubmission): void => {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem('digassist_bookings', JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving booking:', err);
  }
};
