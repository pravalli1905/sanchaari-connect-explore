import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Plane, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const SelectFlights = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { setGroupId, setSelectedFlight, selectedFlight, addToCart } = useBooking();
  const [loading, setLoading] = useState(false);

  const mockFlights = [
    {
      id: 'flight-1',
      airline: 'IndiGo',
      logo: '🛩️',
      route: 'DEL → COK',
      departure: '06:30',
      arrival: '09:45',
      price: 8500,
      duration: '3h 15m',
      stops: 'Non-stop'
    },
    {
      id: 'flight-2',
      airline: 'SpiceJet',
      logo: '✈️',
      route: 'DEL → COK',
      departure: '14:20',
      arrival: '17:50',
      price: 7200,
      duration: '3h 30m',
      stops: 'Non-stop'
    }
  ];

  useEffect(() => {
    if (groupId) {
      setGroupId(groupId);
    }
  }, [groupId, setGroupId]);

  const selectFlight = (flight: any) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedFlight(flight);
      addToCart(flight);
      setLoading(false);
      toast.success(`${flight.airline} flight selected`);
    }, 500);
  };

  const continueToHotels = () => {
    if (!selectedFlight) {
      toast.error('Please select a flight before continuing');
      return;
    }
    navigate(`/booking/${groupId}/hotels`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/booking/${groupId}/start`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Select Flights</h1>
          </div>

          {/* Search Form */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input placeholder="From (DEL)" />
                <Input placeholder="To (COK)" />
                <Input type="date" />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Flight Results */}
          <div className="space-y-4">
            {mockFlights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-2xl">{flight.logo}</div>
                      <div>
                        <h3 className="font-semibold">{flight.airline}</h3>
                        <p className="text-sm text-muted-foreground">{flight.route}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{flight.departure} - {flight.arrival}</p>
                        <p className="text-sm text-muted-foreground">{flight.duration}</p>
                      </div>
                      <Badge variant="secondary">{flight.stops}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₹{flight.price.toLocaleString()}</p>
                      <Button onClick={() => selectFlight(flight)} disabled={loading}>
                        {loading ? 'Selecting...' : 'Select Flight'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Summary */}
          {selectedFlight && (
            <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <p className="font-medium">{selectedFlight.airline} selected</p>
              <Button variant="secondary" className="mt-2" onClick={continueToHotels}>
                Continue to Hotels →
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectFlights;