import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Users, 
  Users2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminProfile } = useAdminAuth();
  const navigate = useNavigate();

  const kpis = [
    {
      title: 'Total Users',
      value: '12,458',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Groups',
      value: '1,247',
      change: '+8%',
      icon: Users2,
      color: 'bg-green-500'
    },
    {
      title: 'Total Bookings',
      value: '3,891',
      change: '+15%',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue (₹)',
      value: '₹45.2L',
      change: '+23%',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];

  const pendingItems = [
    { type: 'Refund Requests', count: 12, urgent: 3, action: () => navigate('/admin/refunds') },
    { type: 'Support Tickets', count: 28, urgent: 5, action: () => navigate('/admin/support') },
    { type: 'Provider Approvals', count: 8, urgent: 2, action: () => navigate('/admin/providers') },
    { type: 'Flagged Groups', count: 4, urgent: 1, action: () => navigate('/admin/groups') }
  ];

  const recentActivity = [
    { action: 'New user registration spike', time: '2 min ago', type: 'info' },
    { action: 'Refund approved for ₹25,000', time: '15 min ago', type: 'success' },
    { action: 'Payment gateway failure detected', time: '1 hour ago', type: 'error' },
    { action: 'Partner suspended: XYZ Hotels', time: '2 hours ago', type: 'warning' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminNavbar onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {adminProfile?.role || 'Administrator'}!
              </h1>
              <p className="text-gray-600">
                System overview and management dashboard
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{kpi.title}</p>
                          <p className="text-3xl font-bold">{kpi.value}</p>
                          <p className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.change} from last month
                          </p>
                        </div>
                        <div className={`p-3 rounded-full ${kpi.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Actions */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Pending Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingItems.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={item.action}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.type}</h4>
                          <p className="text-sm text-gray-600">
                            {item.count} total, {item.urgent} urgent
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.urgent > 0 && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            {item.urgent} urgent
                          </span>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'info' ? 'bg-blue-500' :
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    className="h-auto p-4 flex-col bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate('/admin/users')}
                  >
                    <Users className="h-6 w-6 mb-2" />
                    <span>Manage Users</span>
                  </Button>
                  
                  <Button 
                    className="h-auto p-4 flex-col bg-green-600 hover:bg-green-700"
                    onClick={() => navigate('/admin/groups')}
                  >
                    <Users2 className="h-6 w-6 mb-2" />
                    <span>Monitor Groups</span>
                  </Button>
                  
                  <Button 
                    className="h-auto p-4 flex-col bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/admin/bookings')}
                  >
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>View Bookings</span>
                  </Button>
                  
                  <Button 
                    className="h-auto p-4 flex-col bg-orange-600 hover:bg-orange-700"
                    onClick={() => navigate('/admin/reports')}
                  >
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;