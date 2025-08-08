import React from 'react';
import { usePartnerAuth } from '@/contexts/PartnerAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Users,
  AlertCircle,
  Plus,
  Settings,
  FileText
} from 'lucide-react';

const PartnerDashboard = () => {
  const { partner } = usePartnerAuth();

  const stats = [
    {
      title: 'New Bookings',
      value: '12',
      change: '+20%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Confirmed Bookings',
      value: '84',
      change: '+12%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '₹2,45,000',
      change: '+8%',
      icon: DollarSign,
      color: 'text-partner-accent'
    },
    {
      title: 'Active Services',
      value: '15',
      change: '+2',
      icon: Package,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Services',
      description: 'Add, edit, or remove your service listings',
      href: '/partner/services',
      icon: Package,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'View Bookings',
      description: 'Review and manage incoming bookings',
      href: '/partner/bookings',
      icon: Calendar,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Handle Refunds',
      description: 'Process refund requests from customers',
      href: '/partner/refunds',
      icon: DollarSign,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Analytics',
      description: 'View performance reports and insights',
      href: '/partner/analytics',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const alerts = [
    {
      id: 1,
      message: '3 new booking requests require confirmation',
      type: 'warning',
      time: '2 hours ago'
    },
    {
      id: 2,
      message: 'System maintenance scheduled for tonight',
      type: 'info',
      time: '4 hours ago'
    },
    {
      id: 3,
      message: '2 refund requests pending review',
      type: 'warning',
      time: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-partner-primary text-partner-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Partner Dashboard</h1>
              <p className="text-partner-primary-foreground/80 mt-1">
                Welcome back, {partner?.contact_person}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-partner-primary">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-partner-primary">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Manage your services and bookings efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <action.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                      <p className="text-sm font-medium text-orange-800">{alert.message}</p>
                      <p className="text-xs text-orange-600 mt-1">{alert.time}</p>
                    </div>
                  ))}
                  <Link to="/partner/notifications">
                    <Button variant="outline" className="w-full mt-4">
                      View All Notifications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">New booking for "Goa Beach Resort"</p>
                  <p className="text-sm text-muted-foreground">Group of 6 guests, check-in: Dec 25</p>
                </div>
                <Badge variant="secondary">2 hours ago</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Service "Adventure Trek Package" approved</p>
                  <p className="text-sm text-muted-foreground">Now available for booking</p>
                </div>
                <Badge variant="secondary">1 day ago</Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Refund processed for booking #BK12345</p>
                  <p className="text-sm text-muted-foreground">Amount: ₹15,000</p>
                </div>
                <Badge variant="secondary">2 days ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;