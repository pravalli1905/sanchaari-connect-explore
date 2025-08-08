import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Calendar, DollarSign, AlertCircle, Settings, Check } from 'lucide-react';

const PartnerNotifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    { id: 1, title: 'New booking request', message: 'Adventure Seekers group wants to book Goa Beach Resort', category: 'booking', isRead: false, time: '2 hours ago' },
    { id: 2, title: 'Payment processed', message: 'Payment of ₹48,000 has been processed for booking BK001', category: 'system', isRead: true, time: '1 day ago' },
    { id: 3, title: 'Refund request', message: 'Customer has requested refund for booking BK003', category: 'refund', isRead: false, time: '2 days ago' },
    { id: 4, title: 'Service approved', message: 'Your Rajasthan Heritage Tour has been approved', category: 'system', isRead: true, time: '3 days ago' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'booking': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'refund': return <DollarSign className="h-5 w-5 text-orange-600" />;
      case 'system': return <Settings className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || notification.category === filter
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-partner-primary text-partner-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-partner-primary-foreground/80 mt-1">Stay updated with your business activities</p>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-partner-primary">
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="booking">Bookings</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-partner-accent' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {getCategoryIcon(notification.category)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && <Badge variant="destructive">New</Badge>}
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerNotifications;