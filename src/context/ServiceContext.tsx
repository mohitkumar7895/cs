'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { ServiceCategory, ServiceItem } from '@/models/types';
import { ALL_SERVICES } from '@/lib/services-data';

interface ServiceContextType {
  activeCategory: ServiceCategory;
  setActiveCategory: (cat: ServiceCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredServices: ServiceItem[];
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  topServices: ServiceItem[];
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const topServices = useMemo(() => {
    return ALL_SERVICES.filter(s => s.isTopDemand);
  }, []);

  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter(service => {
      // Category match
      const categoryMatch = activeCategory === 'all' || service.category === activeCategory;
      if (!categoryMatch) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      
      const inHiName = service.nameHi.toLowerCase().includes(query);
      const inEnName = service.nameEn.toLowerCase().includes(query);
      const inHiDesc = service.shortDescHi.toLowerCase().includes(query);
      const inEnDesc = service.shortDescEn.toLowerCase().includes(query);
      const inHiDocs = service.documentsHi.some(d => d.toLowerCase().includes(query));
      const inEnDocs = service.documentsEn.some(d => d.toLowerCase().includes(query));
      const inPortal = service.officialPortal ? service.officialPortal.toLowerCase().includes(query) : false;

      return inHiName || inEnName || inHiDesc || inEnDesc || inHiDocs || inEnDocs || inPortal;
    });
  }, [activeCategory, searchQuery]);

  return (
    <ServiceContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        filteredServices,
        selectedService,
        setSelectedService,
        topServices
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
