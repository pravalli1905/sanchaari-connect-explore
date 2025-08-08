import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const BookingReview = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { selectedFlight, selectedHotel, selectedActivities, getTotalPrice } = useBooking();

  // Check if all required selections are made
  const hasValidBooking = selectedFlight && selectedHotel;
  
  if (!hasValidBooking) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">No Booking to Review</h1>
              <p className="text-muted-foreground mb-6">Please make your selections first.</p>
              <Button asChild>
                <Link to={`/booking/${groupId}/start`}>Start Booking</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const subtotal = getTotalPrice();
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Review Your Booking</h1>
            <Badge variant="secondary">Group #{groupId}</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flight</CardTitle>
                  <CardDescription>Review your selected flight</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedFlight?.airline || selectedFlight?.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedFlight?.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{selectedFlight?.price.toLocaleString()}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/booking/${groupId}/flights`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hotel</CardTitle>
                  <CardDescription>Review your selected accommodation</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedHotel?.name}</p>
                    <p className="text-sm text-muted-foreground">Selected accommodation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{selectedHotel?.price.toLocaleString()}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/booking/${groupId}/hotels`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                  <CardDescription>Review selected experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedActivities.length > 0 ? (
                    <div className="space-y-3">
                      {selectedActivities.map((activity, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <p>{activity.name}</p>
                          <p className="font-medium">₹{activity.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No activities selected</p>
                  )}
                  <div className="mt-4 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/booking/${groupId}/activities`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Summary</CardTitle>
                  <CardDescription>Taxes and fees included</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <AlertDescription>
                  You can modify your selections before completing payment.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/booking/${groupId}/start`}>Back to Booking</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to={`/booking/${groupId}/payment`}>Proceed to Payment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingReview;
