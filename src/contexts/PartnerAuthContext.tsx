import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Partner {
  id: string;
  email: string;
  company_name: string;
  contact_person: string;
  phone?: string;
  status: 'active' | 'pending' | 'suspended';
}

interface PartnerAuthContextType {
  isAuthenticated: boolean;
  partner: Partner | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (email: string, password: string, companyName: string, contactPerson: string, phone?: string) => Promise<{ error: string | null }>;
  logout: () => void;
  isLoading: boolean;
}

const PartnerAuthContext = createContext<PartnerAuthContextType | undefined>(undefined);

export const usePartnerAuth = () => {
  const context = useContext(PartnerAuthContext);
  if (context === undefined) {
    throw new Error('usePartnerAuth must be used within a PartnerAuthProvider');
  }
  return context;
};

export const PartnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing partner session on mount
  useEffect(() => {
    const storedPartnerAuth = localStorage.getItem('sanchaari_partner_auth');
    if (storedPartnerAuth) {
      const authData = JSON.parse(storedPartnerAuth);
      setIsAuthenticated(true);
      setPartner(authData.partner);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For now, using mock authentication
      // In a real app, you'd verify against the database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPartner: Partner = {
        id: '1',
        email: email,
        company_name: 'Travel Solutions Ltd',
        contact_person: 'John Smith',
        phone: '+91 9876543210',
        status: 'active'
      };

      setPartner(mockPartner);
      setIsAuthenticated(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('sanchaari_partner_auth', JSON.stringify({ partner: mockPartner }));
      
      return { error: null };
    } catch (error) {
      return { error: 'Login failed. Please check your credentials.' };
    }
  };

  const register = async (email: string, password: string, companyName: string, contactPerson: string, phone?: string) => {
    try {
      // Mock registration - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPartner: Partner = {
        id: '1',
        email: email,
        company_name: companyName,
        contact_person: contactPerson,
        phone: phone,
        status: 'pending'
      };

      setPartner(mockPartner);
      setIsAuthenticated(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('sanchaari_partner_auth', JSON.stringify({ partner: mockPartner }));
      
      return { error: null };
    } catch (error) {
      return { error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setPartner(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sanchaari_partner_auth');
  };

  const value = {
    isAuthenticated,
    partner,
    login,
    register,
    logout,
    isLoading
  };

  return <PartnerAuthContext.Provider value={value}>{children}</PartnerAuthContext.Provider>;
};