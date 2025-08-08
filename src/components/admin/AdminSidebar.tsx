import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Users2, 
  Calendar, 
  Building2, 
  RefreshCw, 
  FileText, 
  Languages, 
  BarChart3, 
  Bot, 
  Settings, 
  HeadphonesIcon, 
  FileSearch, 
  Bell,
  ChevronLeft
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Users2, label: 'Group Management', path: '/admin/groups' },
    { icon: Calendar, label: 'Booking Management', path: '/admin/bookings' },
    { icon: Building2, label: 'Service Providers', path: '/admin/providers' },
    { icon: RefreshCw, label: 'Refunds & Cancellations', path: '/admin/refunds' },
    { icon: FileText, label: 'Content Management', path: '/admin/content' },
    { icon: Languages, label: 'Language Management', path: '/admin/languages' },
    { icon: BarChart3, label: 'Analytics & Reports', path: '/admin/reports' },
    { icon: Bot, label: 'AI Chatbot Config', path: '/admin/ai-chatbot' },
    { icon: Settings, label: 'System Settings', path: '/admin/settings' },
    { icon: HeadphonesIcon, label: 'Support Tickets', path: '/admin/support' },
    { icon: FileSearch, label: 'Audit Logs', path: '/admin/audit-logs' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-gray-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800",
                    isActive && "bg-orange-500 text-white hover:bg-orange-600"
                  )}
                  onClick={() => handleNavigate(item.path)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span className="truncate">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;