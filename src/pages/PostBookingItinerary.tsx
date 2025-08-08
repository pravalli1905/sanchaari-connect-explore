import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, AlertTriangle, Download, MessageCircle, Map } from 'lucide-react';

const PostBookingItinerary = () => {
  const { groupId } = useParams();
  const [viewMode, setViewMode] = useState<'timeline' | 'map'>('timeline');

  const itinerary = [
    {
      day: 1,
      date: 'March 15, 2024',
      activities: [
        { time: '06:30', activity: 'Flight Departure - Delhi', status: 'confirmed' },
        { time: '09:45', activity: 'Arrival - Kochi', status: 'confirmed' },
        { time: '11:00', activity: 'Transfer to Kumarakom', status: 'confirmed' },
        { time: '15:00', activity: 'Check-in at Backwater Resort', status: 'confirmed' }
      ],
      updates: []
    },
    {
      day: 2,
      date: 'March 16, 2024',
      activities: [
        { time: '08:00', activity: 'Backwater Houseboat Cruise', status: 'confirmed' },
        { time: '13:00', activity: 'Traditional Kerala Lunch', status: 'confirmed' },
        { time: '16:00', activity: 'Village Tour', status: 'delayed' }
      ],
      updates: [
        { type: 'delay', message: 'Village Tour delayed by 30 minutes due to rain', time: '14:30' }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Live Itinerary</h1>
              <p className="text-muted-foreground">Real-time updates for your Kerala Adventure Trip</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/groups/${groupId}/chat`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Group Chat
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="timeline" className="space-y-6">
            <TabsList>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              {itinerary.map((day) => (
                <Card key={day.day}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Day {day.day} - {day.date}
                      {day.updates.length > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {day.updates.length} Update{day.updates.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {day.updates.length > 0 && (
                      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-orange-800">Recent Updates</h4>
                            {day.updates.map((update, i) => (
                              <p key={i} className="text-sm text-orange-700 mt-1">
                                {update.time}: {update.message}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {day.activities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="text-center min-w-[60px]">
                            <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                            <span className="text-sm font-medium">{activity.time}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.activity}</h4>
                          </div>
                          <Badge 
                            variant={activity.status === 'confirmed' ? 'default' : 'destructive'}
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Trip Map
                  </CardTitle>
                  <CardDescription>Key locations and route for your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing: Delhi → Kochi → Kumarakom → Alleppey
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Need Help During Your Trip?</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is available 24/7 for any assistance
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/help/chat">Live Chat</Link>
                  </Button>
                  <Button variant="outline">Emergency Hotline</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PostBookingItinerary;