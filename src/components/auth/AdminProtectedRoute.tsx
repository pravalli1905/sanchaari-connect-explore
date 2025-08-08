import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  permission?: string;
  redirectTo?: string;
  message?: string;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  permission,
  redirectTo = '/admin/login',
  message = 'Please login to access the admin panel.'
}) => {
  const { isAuthenticated, isLoading, hasPermission } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error(message);
    } else if (!isLoading && isAuthenticated && permission && !hasPermission(permission)) {
      toast.error('You do not have permission to access this page.');
    }
  }, [isLoading, isAuthenticated, permission, hasPermission, message]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;