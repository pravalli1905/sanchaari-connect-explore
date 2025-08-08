import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Star, MapPin, Calendar, Users, ShoppingCart, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Navbar from '@/components/layout/Navbar';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const BookingStart = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { setGroupId, addToCart, removeFromCart, cartItems, getTotalPrice } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');

  const mockGroupData = {
    name: 'Kerala Adventure Trip',
    destination: 'Kerala, India',
    dates: 'March 15-22, 2024',
    members: 4,
    budget: 120000
  };

  const mockFlights = [
    {
      id: 'flight-1',
      airline: 'IndiGo',
      route: 'DEL → COK',
      departure: '06:30',
      arrival: '09:45',
      price: 8500,
      rating: 4.2,
      duration: '3h 15m',
      stops: 'Non-stop'
    },
    {
      id: 'flight-2',
      airline: 'SpiceJet',
      route: 'DEL → COK',
      departure: '14:20',
      arrival: '17:50',
      price: 7200,
      rating: 4.0,
      duration: '3h 30m',
      stops: 'Non-stop'
    }
  ];

  const mockHotels = [
    {
      id: 'hotel-1',
      name: 'Backwater Resort Kumarakom',
      location: 'Kumarakom, Kerala',
      price: 6500,
      rating: 4.5,
      amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
    },
    {
      id: 'hotel-2',
      name: 'Hill Palace Munnar',
      location: 'Munnar, Kerala',
      price: 4800,
      rating: 4.3,
      amenities: ['Mountain View', 'Restaurant', 'WiFi', 'Parking'],
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&h=200&fit=crop'
    }
  ];

  const mockActivities = [
    {
      id: 'activity-1',
      name: 'Backwater Houseboat Cruise',
      location: 'Alleppey',
      price: 3500,
      rating: 4.6,
      duration: 'Full Day',
      groupSize: 'Up to 6 people'
    },
    {
      id: 'activity-2',
      name: 'Spice Plantation Tour',
      location: 'Thekkady',
      price: 1200,
      rating: 4.4,
      duration: '4 hours',
      groupSize: 'Per person'
    }
  ];

  useEffect(() => {
    if (groupId) {
      setGroupId(groupId);
    }
  }, [groupId, setGroupId]);

  const addToCartHandler = (item: any, type: string) => {
    const cartItem = { ...item, type, quantity: 1 };
    addToCart(cartItem);
    toast.success(`${item.name || item.airline} added to booking cart`);
  };

  const removeFromCartHandler = (itemId: string) => {
    removeFromCart(itemId);
    toast.success('Item removed from cart');
  };

  const proceedToPayment = () => {
    if (cartItems.length === 0) {
      toast.error('Please add items to your cart before proceeding');
      return;
    }
    navigate(`/booking/${groupId}/payment`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/groups/${groupId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Book Your Trip</h1>
              <p className="text-muted-foreground">Search and book flights, hotels, and activities</p>
            </div>
          </div>

          {/* Trip Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {mockGroupData.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockGroupData.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockGroupData.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockGroupData.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">₹{mockGroupData.budget.toLocaleString()} budget</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="flights" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="flights">Flights</TabsTrigger>
                  <TabsTrigger value="hotels">Hotels</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                {/* Flights Tab */}
                <TabsContent value="flights" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Flights</CardTitle>
                      <CardDescription>Find the best flights for your group</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="From (DEL)" />
                        <Input placeholder="To (COK)" />
                        <Input type="date" />
                      </div>
                      <div className="flex gap-4">
                        <Button>
                          <Search className="h-4 w-4 mr-2" />
                          Search Flights
                        </Button>
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {mockFlights.map((flight) => (
                      <Card key={flight.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4">
                                <div>
                                  <h3 className="font-semibold">{flight.airline}</h3>
                                  <p className="text-sm text-muted-foreground">{flight.route}</p>
                                </div>
                                <div className="text-center">
                                  <p className="font-medium">{flight.departure} - {flight.arrival}</p>
                                  <p className="text-sm text-muted-foreground">{flight.duration} • {flight.stops}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{flight.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">₹{flight.price.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">per person</p>
                              <Button 
                                className="mt-2"
                                onClick={() => addToCartHandler(flight, 'flight')}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Hotels Tab */}
                <TabsContent value="hotels" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Hotels</CardTitle>
                      <CardDescription>Find accommodation for your group</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Destination" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <Input type="date" placeholder="Check-in" />
                        <Input type="date" placeholder="Check-out" />
                      </div>
                      <div className="flex gap-4">
                        <Button>
                          <Search className="h-4 w-4 mr-2" />
                          Search Hotels
                        </Button>
                        <Button variant="outline">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {mockHotels.map((hotel) => (
                      <Card key={hotel.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                  <p className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {hotel.location}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">{hotel.rating}</span>
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    {hotel.amenities.map((amenity) => (
                                      <Badge key={amenity} variant="secondary" className="text-xs">
                                        {amenity}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold">₹{hotel.price.toLocaleString()}</p>
                                  <p className="text-sm text-muted-foreground">per night</p>
                                  <Button 
                                    className="mt-2"
                                    onClick={() => addToCartHandler(hotel, 'hotel')}
                                  >
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Activities Tab */}
                <TabsContent value="activities" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Activities</CardTitle>
                      <CardDescription>Discover experiences for your group</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Activity or location" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="adventure">Adventure</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="nature">Nature</SelectItem>
                            <SelectItem value="food">Food & Dining</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Search Activities
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {mockActivities.map((activity) => (
                      <Card key={activity.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{activity.name}</h3>
                              <p className="text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {activity.location}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{activity.rating}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{activity.duration}</span>
                                <span className="text-sm text-muted-foreground">{activity.groupSize}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">₹{activity.price.toLocaleString()}</p>
                              <Button 
                                className="mt-2"
                                onClick={() => addToCartHandler(activity, 'activity')}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Cart Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Booking Cart
                  </CardTitle>
                  <CardDescription>{cartItems.length} items selected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Add items to start booking
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {item.name || item.airline}
                              </h4>
                              <p className="text-xs text-muted-foreground capitalize">
                                {item.type}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">₹{item.price.toLocaleString()}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCartHandler(item.id)}
                                className="text-xs h-6 px-2"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-bold">₹{getTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Budget remaining</span>
                          <span>₹{(mockGroupData.budget - getTotalPrice()).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        disabled={cartItems.length === 0}
                        onClick={proceedToPayment}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Payment
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Booking Policies */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium">Cancellation Policy</h4>
                    <p className="text-muted-foreground">Free cancellation up to 24 hours before travel</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Payment</h4>
                    <p className="text-muted-foreground">Secure payment with multiple options</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Support</h4>
                    <p className="text-muted-foreground">24/7 customer support available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingStart;