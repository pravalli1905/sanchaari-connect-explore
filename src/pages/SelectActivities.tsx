import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

const SelectActivities = () => {
  const { groupId } = useParams();
  const [selectedActivities, setSelectedActivities] = useState<any[]>([]);

  const mockActivities = [
    {
      id: 'activity-1',
      name: 'Backwater Houseboat Cruise',
      location: 'Alleppey',
      price: 3500,
      rating: 4.6,
      duration: 'Full Day',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
    },
    {
      id: 'activity-2',
      name: 'Spice Plantation Tour',
      location: 'Thekkady', 
      price: 1200,
      rating: 4.4,
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    }
  ];

  const addActivity = (activity: any) => {
    setSelectedActivities(prev => [...prev, activity]);
    toast.success(`${activity.name} added to booking`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/booking/${groupId}/hotels`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Select Activities</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">{activity.name}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {activity.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {activity.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{activity.rating}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <p className="text-2xl font-bold">₹{activity.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                      <Button onClick={() => addActivity(activity)}>
                        Add to Booking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedActivities.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="font-medium">{selectedActivities.length} activities selected</p>
              <Button variant="secondary" className="mt-2" asChild>
                <Link to={`/booking/${groupId}/review`}>
                  Review Booking →
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectActivities;