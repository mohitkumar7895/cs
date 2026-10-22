export type Language = 'hi' | 'en';

export type ServiceCategory = 
  | 'all'
  | 'identity'
  | 'gst_business'
  | 'itr_banking'
  | 'women_child'
  | 'vehicle_court'
  | 'up_kisan';

export interface PricingOption {
  diyPrice: number;
  assistedPrice: number;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  nameHi: string;
  nameEn: string;
  shortDescHi: string;
  shortDescEn: string;
  documentsHi: string[];
  documentsEn: string[];
  pricing: PricingOption;
  isTopDemand?: boolean;
  officialPortal?: string;
  estimatedTimeHi: string;
  estimatedTimeEn: string;
  badge?: string;
  image?: string;
}

export interface UTRRecord {
  utrNumber: string;
  mobile: string;
  serviceId: string;
  serviceName: string;
  serviceType: 'diy' | 'assisted';
  amount: number;
  status: 'verified' | 'pending' | 'reviewing';
  timestamp: string;
  downloadUrl?: string;
}

export interface BookingSubmission {
  id: string;
  fullName: string;
  mobile: string;
  whatsapp: string;
  address?: string;
  serviceId: string;
  serviceName: string;
  serviceType: 'diy' | 'assisted';
  amount: number;
  utrNumber?: string;
  notes?: string;
  createdAt: string;
  status: 'pending_payment' | 'paid_verified' | 'in_progress' | 'completed';
}
