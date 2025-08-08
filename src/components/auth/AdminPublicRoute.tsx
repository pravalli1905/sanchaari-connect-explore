import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface AdminPublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  message?: string;
}

const AdminPublicRoute: React.FC<AdminPublicRouteProps> = ({ 
  children, 
  redirectTo = '/admin/dashboard',
  message = 'You are already logged in to the admin panel.'
}) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      toast.info(message);
    }
  }, [isLoading, isAuthenticated, message]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default AdminPublicRoute;