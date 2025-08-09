import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AdminProfile {
  id: string;
  user_id: string;
  email: string;
  role: string;
  permissions: string[];
  department: string;
  created_at: string;
  updated_at: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  adminProfile: AdminProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdminProfile = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching admin profile:', error);
        return;
      }

      if (data) {
        setAdminProfile(data);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  useEffect(() => {
    // Check for existing admin session in localStorage
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      try {
        const { session: storedSession, profile } = JSON.parse(adminSession);
        setSession(storedSession);
        setUser(storedSession.user);
        setAdminProfile(profile);
      } catch (error) {
        localStorage.removeItem('admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.rpc('authenticate_admin', {
        email_input: email,
        password_input: password
      });

      if (error || !data || data.length === 0 || !data[0]) {
        return { error: { message: 'Invalid email or password' } };
      }

      const adminData = data[0] as unknown as AdminProfile;
      setAdminProfile(adminData);
      
      // Create a mock session for admin
      const mockSession = {
        access_token: 'admin_token',
        refresh_token: 'admin_refresh',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: {
          id: adminData.user_id,
          email: adminData.email,
          user_metadata: { user_type: 'admin' }
        }
      };
      
      setSession(mockSession as any);
      setUser(mockSession.user as any);
      
      // Store session in localStorage
      localStorage.setItem('admin_session', JSON.stringify({
        session: mockSession,
        profile: adminData
      }));
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'Authentication failed' } };
    }
  };

  const logout = async () => {
    localStorage.removeItem('admin_session');
    setSession(null);
    setUser(null);
    setAdminProfile(null);
  };

  const hasPermission = (permission: string) => {
    return adminProfile?.permissions.includes(permission) || adminProfile?.role === 'super_admin';
  };

  const value = {
    isAuthenticated: !!session && !!adminProfile,
    user,
    session,
    adminProfile,
    isLoading,
    login,
    logout,
    hasPermission
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};