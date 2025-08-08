import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PartnerNavbar from '@/components/partner/PartnerNavbar';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  Users, 
  Package,
  RefreshCw,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePartnerAuth } from '@/contexts/PartnerAuthContext';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { user } = usePartnerAuth();
  const [dashboardData, setDashboardData] = useState({
    bookings: {
      new: 12,
      confirmed: 45,
      cancelled: 3
    },
    revenue: {
      weekly: 125000,
      monthly: 450000,
      growth: 12.5
    },
    alerts: [
      { id: 1, type: 'booking', message: 'New booking request from Mumbai group', urgent: true },
      { id: 2, type: 'refund', message: '₹15,000 refund request pending', urgent: false },
      { id: 3, type: 'approval', message: 'Hotel listing approved and live', urgent: false }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.contact_person || 'Partner'}!
          </h1>
          <p className="text-gray-600">
            {user?.user_metadata?.company_name || 'Your Company'} - Partner Dashboard
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">New Bookings</p>
                  <p className="text-3xl font-bold">{dashboardData.bookings.new}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Confirmed</p>
                  <p className="text-3xl font-bold">{dashboardData.bookings.confirmed}</p>
                </div>
                <Users className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-partner-accent to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Monthly Revenue</p>
                  <p className="text-3xl font-bold">₹{(dashboardData.revenue.monthly / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Growth</p>
                  <p className="text-3xl font-bold">+{dashboardData.revenue.growth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => navigate('/partner/services')}
                  className="h-auto p-4 bg-partner-primary hover:bg-partner-primary/90 flex-col items-start"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5" />
                    <span className="font-semibold">Manage Services</span>
                  </div>
                  <p className="text-sm text-left opacity-90">
                    Add, edit, or manage your service listings
                  </p>
                </Button>

                <Button 
                  onClick={() => navigate('/partner/bookings')}
                  className="h-auto p-4 bg-partner-accent hover:bg-partner-accent/90 flex-col items-start"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">View Bookings</span>
                  </div>
                  <p className="text-sm text-left opacity-90">
                    Manage incoming booking requests
                  </p>
                </Button>

                <Button 
                  onClick={() => navigate('/partner/refunds')}
                  className="h-auto p-4 bg-green-600 hover:bg-green-700 flex-col items-start"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RefreshCw className="h-5 w-5" />
                    <span className="font-semibold">Refunds</span>
                  </div>
                  <p className="text-sm text-left opacity-90">
                    Process cancellation requests
                  </p>
                </Button>

                <Button 
                  onClick={() => navigate('/partner/analytics')}
                  className="h-auto p-4 bg-purple-600 hover:bg-purple-700 flex-col items-start"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-semibold">Analytics</span>
                  </div>
                  <p className="text-sm text-left opacity-90">
                    View performance reports
                  </p>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Alerts</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/partner/notifications')}
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dashboardData.alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    alert.urgent ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      {alert.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;