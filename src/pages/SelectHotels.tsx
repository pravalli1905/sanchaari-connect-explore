import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Wifi, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const SelectHotels = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { setSelectedHotel, selectedHotel, addToCart } = useBooking();
  const [loading, setLoading] = useState(false);

  const mockHotels = [
    {
      id: 'hotel-1',
      name: 'Backwater Resort Kumarakom',
      location: 'Kumarakom, Kerala',
      price: 6500,
      rating: 4.5,
      amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-2', 
      name: 'Hill Palace Munnar',
      location: 'Munnar, Kerala',
      price: 4800,
      rating: 4.3,
      amenities: ['Mountain View', 'Restaurant', 'WiFi'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop'
    }
  ];

  const selectHotel = (hotel: any) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedHotel(hotel);
      addToCart(hotel);
      setLoading(false);
      toast.success(`${hotel.name} selected`);
    }, 500);
  };

  const continueToActivities = () => {
    if (!selectedHotel) {
      toast.error('Please select a hotel before continuing');
      return;
    }
    navigate(`/booking/${groupId}/activities`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/booking/${groupId}/flights`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Select Hotels</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {hotel.location}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(hotel.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm ml-1">{hotel.rating}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <p className="text-2xl font-bold">₹{hotel.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">per night</p>
                      </div>
                      <Button onClick={() => selectHotel(hotel)} disabled={loading}>
                        {loading ? 'Selecting...' : 'Select Hotel'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedHotel && (
            <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="font-medium">{selectedHotel.name} selected</p>
              <Button variant="secondary" className="mt-2" onClick={continueToActivities}>
                Continue to Activities →
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectHotels;