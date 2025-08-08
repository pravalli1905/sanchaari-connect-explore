import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const BookingReview = () => {
  const { groupId } = useParams();

  // Mock selections summary (in a real app, pull from state/store)
  const summary = {
    flight: { airline: 'IndiGo', route: 'DEL → COK', price: 8500 },
    hotel: { name: 'Backwater Resort Kumarakom', nights: 4, price: 26000 },
    activities: [
      { name: 'Houseboat Cruise', price: 3500 },
      { name: 'Spice Plantation Tour', price: 1200 },
    ],
  };

  const total = summary.flight.price + summary.hotel.price + summary.activities.reduce((t, a) => t + a.price, 0);

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
                    <p className="font-medium">{summary.flight.airline}</p>
                    <p className="text-sm text-muted-foreground">{summary.flight.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{summary.flight.price.toLocaleString()}</p>
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
                    <p className="font-medium">{summary.hotel.name}</p>
                    <p className="text-sm text-muted-foreground">{summary.hotel.nights} nights</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{summary.hotel.price.toLocaleString()}</p>
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
                  <div className="space-y-3">
                    {summary.activities.map((a, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <p>{a.name}</p>
                        <p className="font-medium">₹{a.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
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
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>₹{Math.round(total * 0.12).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{Math.round(total * 1.12).toLocaleString()}</span>
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
