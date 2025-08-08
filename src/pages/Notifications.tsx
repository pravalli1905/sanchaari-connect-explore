import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCircle, Clock, X, CreditCard, Users, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([

    {
      id: '1',
      type: 'payment',
      title: 'Payment Due Reminder',
      message: 'Payment for Kerala Adventure Trip is due in 2 days',
      time: '2 hours ago',
      read: false,
      urgent: true
    },
    {
      id: '2',
      type: 'trip',
      title: 'Trip Update',
      message: 'Your hotel booking has been confirmed for Backwater Resort',
      time: '5 hours ago',
      read: false,
      urgent: false
    },
    {
      id: '3',
      type: 'group',
      title: 'Member Dropout',
      message: 'Sneha Reddy has left Kerala Adventure Trip group',
      time: '1 day ago',
      read: true,
      urgent: false
    },
    {
      id: '4',
      type: 'message',
      title: 'New Group Message',
      message: 'Rahul: "What time should we meet at the airport?"',
      time: '2 days ago',
      read: true,
      urgent: false
    },
    {
      id: '5',
      type: 'trip',
      title: 'Itinerary Update',
      message: 'Village tour has been rescheduled due to weather',
      time: '3 days ago',
      read: true,
      urgent: false
    }
  ]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    toast.success('Notification marked as read');
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    toast.success('Notification deleted');
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast.success('All notifications marked as read');
  }, []);

  const openNotificationSettings = useCallback(() => {
    toast.info('Notification settings opened');
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'trip': return <Bell className="h-4 w-4" />;
      case 'group': return <Users className="h-4 w-4" />;
      case 'message': return <MessageCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'bg-red-100 text-red-800';
      case 'trip': return 'bg-blue-100 text-blue-800';
      case 'group': return 'bg-green-100 text-green-800';
      case 'message': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your trips and group activities
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive">
                {unreadCount} unread
              </Badge>
            )}
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="trip">Trips</TabsTrigger>
              <TabsTrigger value="group">Groups</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            {notification.urgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                            {!notification.read && (
                              <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm" onClick={() => deleteNotification(notification.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {['payment', 'trip', 'group', 'message'].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                {notifications.filter(n => n.type === type).map((notification) => (
                  <Card key={notification.id} className={`${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              {notification.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgent</Badge>
                              )}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                        {!notification.read && (
                          <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4 justify-center mt-8">
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
            <Button variant="outline" onClick={openNotificationSettings}>
              Notification Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;