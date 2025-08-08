import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AdminProfile {
  id: string;
  user_id: string;
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

  const fetchAdminProfile = async (userId: string) => {
    try {
      // Mock admin profile for now
      const mockProfile: AdminProfile = {
        id: '1',
        user_id: userId,
        role: 'super_admin',
        permissions: ['users.read', 'users.write', 'groups.read', 'groups.write', 'bookings.read', 'bookings.write'],
        department: 'Operations',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setAdminProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && session.user.user_metadata?.user_type === 'admin') {
          await fetchAdminProfile(session.user.id);
        } else {
          setAdminProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user && session.user.user_metadata?.user_type === 'admin') {
        fetchAdminProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    // Check if user is admin
    if (data.user && data.user.user_metadata?.user_type !== 'admin') {
      await supabase.auth.signOut();
      return { error: { message: 'Access denied. Admin credentials required.' } };
    }
    
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
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