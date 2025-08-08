import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const BookingPayment = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { selectedFlight, selectedHotel, selectedActivities, getTotalPrice, clearBooking } = useBooking();
  const [agree, setAgree] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Check if booking exists
  const hasValidBooking = selectedFlight && selectedHotel;
  
  if (!hasValidBooking) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">No Booking Found</h1>
              <p className="text-muted-foreground mb-6">Please complete your booking first.</p>
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

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      toast.error('Please fill in all card details');
      return;
    }

    if (!agree) {
      toast.error('Please agree to terms and conditions');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful!');
      clearBooking();
      navigate(`/booking/${groupId}/confirmation`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
                  <Button 
                    variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    UPI
                  </Button>
                  <Button 
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Cards
                  </Button>
                  <Button 
                    variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    Net Banking
                  </Button>
                  <Button 
                    variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    Wallets
                  </Button>
                  <Button 
                    variant={paymentMethod === 'emi' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('emi')}
                  >
                    EMI
                  </Button>
                </div>
                <Separator />
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input 
                          id="card-number" 
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Name on Card</Label>
                        <Input 
                          id="name" 
                          placeholder="Rahul Sharma"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123" 
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="user@paytm" />
                  </div>
                )}
                
                {paymentMethod && (
                  <div className="space-y-3">
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
                      <Button 
                        disabled={!agree || !paymentMethod || isProcessing} 
                        className="flex-1"
                        onClick={handlePayment}
                      >
                        {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                      </Button>
                    </div>
                  </div>
                )}
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
                {selectedFlight && (
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      <Badge variant="secondary" className="mr-2">Flight</Badge>
                      {selectedFlight.airline || selectedFlight.name}
                    </span>
                    <span className="font-medium">₹{selectedFlight.price.toLocaleString()}</span>
                  </div>
                )}
                {selectedHotel && (
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      <Badge variant="secondary" className="mr-2">Hotel</Badge>
                      {selectedHotel.name}
                    </span>
                    <span className="font-medium">₹{selectedHotel.price.toLocaleString()}</span>
                  </div>
                )}
                {selectedActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>
                      <Badge variant="secondary" className="mr-2">Activity</Badge>
                      {activity.name}
                    </span>
                    <span className="font-medium">₹{activity.price.toLocaleString()}</span>
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
