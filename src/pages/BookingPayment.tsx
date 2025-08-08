import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const BookingPayment = () => {
  const { groupId } = useParams();
  const [agree, setAgree] = useState(false);

  const order = {
    items: [
      { type: 'Flight', name: 'IndiGo DEL → COK', price: 8500 },
      { type: 'Hotel', name: 'Backwater Resort Kumarakom (4 nights)', price: 26000 },
      { type: 'Activity', name: 'Houseboat Cruise', price: 3500 },
      { type: 'Activity', name: 'Spice Plantation Tour', price: 1200 },
    ],
  };
  const subtotal = order.items.reduce((t, i) => t + i.price, 0);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Button variant="outline">UPI</Button>
                  <Button variant="outline">Cards</Button>
                  <Button variant="outline">Net Banking</Button>
                  <Button variant="outline">Wallets</Button>
                  <Button variant="outline">EMI</Button>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="Rahul Sharma" />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the Terms, Cancellation and Refund Policy
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link to={`/booking/${groupId}/review`}>Back to Review</Link>
                    </Button>
                    <Button disabled={!agree} className="flex-1">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Group #{groupId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((i, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>
                      <Badge variant="secondary" className="mr-2">{i.type}</Badge>
                      {i.name}
                    </span>
                    <span className="font-medium">₹{i.price.toLocaleString()}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPayment;
