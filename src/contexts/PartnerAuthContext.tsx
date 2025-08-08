import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface PartnerProfile {
  id: string;
  partner_id: string;
  bank_account_number: string;
  bank_ifsc_code: string;
  bank_name: string;
  business_address: string;
  certificates: string[];
  legal_documents: string[];
  tax_info: string;
  created_at: string;
  updated_at: string;
}

interface PartnerAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  partnerProfile: PartnerProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: any }>;
  signup: (email: string, password: string, companyName: string, contactPerson: string) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<PartnerProfile>) => Promise<{ error?: any }>;
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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<PartnerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPartnerProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('partner_profiles')
        .select('*')
        .eq('partner_id', userId)
        .single();

      if (error) throw error;
      setPartnerProfile(data);
    } catch (error) {
      console.error('Error fetching partner profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchPartnerProfile(session.user.id);
        } else {
          setPartnerProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchPartnerProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signup = async (email: string, password: string, companyName: string, contactPerson: string) => {
    const redirectUrl = `${window.location.origin}/partner/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          company_name: companyName,
          contact_person: contactPerson,
          user_type: 'partner'
        }
      }
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setPartnerProfile(null);
  };

  const updateProfile = async (updates: Partial<PartnerProfile>) => {
    if (!user) return { error: 'No user found' };

    try {
      const { error } = await supabase
        .from('partner_profiles')
        .update(updates)
        .eq('partner_id', user.id);

      if (error) throw error;
      
      // Refresh profile data
      await fetchPartnerProfile(user.id);
      return {};
    } catch (error) {
      return { error };
    }
  };

  const value = {
    isAuthenticated: !!session,
    user,
    session,
    partnerProfile,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <PartnerAuthContext.Provider value={value}>
      {children}
    </PartnerAuthContext.Provider>
  );
};