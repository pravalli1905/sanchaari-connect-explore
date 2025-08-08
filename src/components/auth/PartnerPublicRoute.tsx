import { usePartnerAuth } from '@/contexts/PartnerAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface PartnerPublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  message?: string;
}

const PartnerPublicRoute: React.FC<PartnerPublicRouteProps> = ({ 
  children, 
  redirectTo = '/partner/dashboard',
  message = 'You are already logged in.'
}) => {
  const { isAuthenticated, isLoading } = usePartnerAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      toast.info(message);
    }
  }, [isLoading, isAuthenticated, message]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-partner-primary">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-partner-accent"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PartnerPublicRoute;