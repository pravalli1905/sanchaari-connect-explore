import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, User, LogOut, Settings, Building } from 'lucide-react';
import { usePartnerAuth } from '@/contexts/PartnerAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PartnerNavbar = () => {
  const { user, logout } = usePartnerAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/partner/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <nav className="bg-partner-primary border-b border-partner-primary/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/516a5d75-688a-4977-8145-75b378df61a9.png" 
              alt="Sanchaari Logo" 
              className="h-8 sm:h-10 w-auto"
            />
            <h1 className="text-lg sm:text-xl font-bold text-white">Partner Portal</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-partner-primary/80">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-partner-accent p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-semibold">Notifications</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3">
                <div>
                  <p className="font-medium">New booking request</p>
                  <p className="text-sm text-muted-foreground">Group trip to Goa - 5 people</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <p className="font-medium">Refund request</p>
                  <p className="text-sm text-muted-foreground">₹15,000 refund pending approval</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <p className="font-medium">Service approved</p>
                  <p className="text-sm text-muted-foreground">Your hotel listing is now active</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-partner-primary/80">
                <User className="h-5 w-5" />
                <span className="hidden sm:block">{user?.user_metadata?.contact_person || 'Partner'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/partner/profile')}>
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default PartnerNavbar;