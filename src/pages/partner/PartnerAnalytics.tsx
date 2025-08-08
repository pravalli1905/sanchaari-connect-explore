import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Star,
  Download,
  Filter
} from 'lucide-react';

const PartnerAnalytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 12 },
    { month: 'Feb', revenue: 52000, bookings: 15 },
    { month: 'Mar', revenue: 48000, bookings: 13 },
    { month: 'Apr', revenue: 61000, bookings: 18 },
    { month: 'May', revenue: 55000, bookings: 16 },
    { month: 'Jun', revenue: 67000, bookings: 20 }
  ];

  const serviceTypeData = [
    { name: 'Hotels', value: 45, color: '#0088FE' },
    { name: 'Flights', value: 30, color: '#00C49F' },
    { name: 'Activities', value: 25, color: '#FFBB28' }
  ];

  const cancellationData = [
    { month: 'Jan', cancellations: 2, total: 12, rate: 16.7 },
    { month: 'Feb', cancellations: 1, total: 15, rate: 6.7 },
    { month: 'Mar', cancellations: 3, total: 13, rate: 23.1 },
    { month: 'Apr', cancellations: 2, total: 18, rate: 11.1 },
    { month: 'May', cancellations: 1, total: 16, rate: 6.3 },
    { month: 'Jun', cancellations: 2, total: 20, rate: 10.0 }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3,28,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Bookings',
      value: '94',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Avg Rating',
      value: '4.7',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Cancellation Rate',
      value: '12.3%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-partner-primary text-partner-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Performance Analytics</h1>
              <p className="text-partner-primary-foreground/80 mt-1">
                Track your business performance and insights
              </p>
            </div>
            <div className="flex space-x-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[150px] bg-white text-partner-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-partner-primary">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue and booking trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#FF6F3C" name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Service Distribution</CardTitle>
              <CardDescription>Breakdown by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Booking Trends */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Monthly booking volume and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#0B3D91" 
                  strokeWidth={3}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cancellation Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Cancellation Analysis</CardTitle>
            <CardDescription>Monthly cancellation rates and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cancellationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#dc3545" name="Cancellation Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Services</CardTitle>
              <CardDescription>Services with highest bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Goa Beach Resort</p>
                    <p className="text-sm text-muted-foreground">Hotel</p>
                  </div>
                  <Badge className="bg-green-600">24 bookings</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Mumbai-Delhi Flight</p>
                    <p className="text-sm text-muted-foreground">Flight</p>
                  </div>
                  <Badge className="bg-blue-600">18 bookings</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Heritage Tour</p>
                    <p className="text-sm text-muted-foreground">Activity</p>
                  </div>
                  <Badge className="bg-orange-600">12 bookings</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Ratings</CardTitle>
              <CardDescription>Average ratings by service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Heritage Tour</p>
                    <p className="text-sm text-muted-foreground">8 reviews</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">4.9 ⭐</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Goa Beach Resort</p>
                    <p className="text-sm text-muted-foreground">24 reviews</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">4.8 ⭐</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-semibold">Kashmir Houseboat</p>
                    <p className="text-sm text-muted-foreground">12 reviews</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">4.7 ⭐</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerAnalytics;