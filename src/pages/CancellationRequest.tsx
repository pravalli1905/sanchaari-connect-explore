import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Info, ArrowLeft } from 'lucide-react';

const CancellationRequest = () => {
  const { groupId } = useParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const bookingItems = [
    { id: 'flight-1', type: 'Flight', name: 'IndiGo DEL → COK', price: 8500, cancelable: true, refundPercent: 80 },
    { id: 'hotel-1', type: 'Hotel', name: 'Backwater Resort (4 nights)', price: 26000, cancelable: true, refundPercent: 90 },
    { id: 'activity-1', type: 'Activity', name: 'Houseboat Cruise', price: 3500, cancelable: true, refundPercent: 100 },
    { id: 'activity-2', type: 'Activity', name: 'Spice Plantation Tour', price: 1200, cancelable: false, refundPercent: 0 }
  ];

  const handleItemSelect = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const getTotalRefund = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = bookingItems.find(i => i.id === itemId);
      return total + (item ? (item.price * item.refundPercent / 100) : 0);
    }, 0);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/booking/${groupId}/confirmation`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Cancel Booking</h1>
              <p className="text-muted-foreground">Select items you want to cancel</p>
            </div>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Cancellation policies vary by service provider. Refund amounts and timelines are shown below.
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Items to Cancel</CardTitle>
              <CardDescription>Choose which bookings you want to cancel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookingItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      id={item.id}
                      disabled={!item.cancelable}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleItemSelect(item.id, checked as boolean)}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.type}</Badge>
                        <Label htmlFor={item.id} className="font-medium">
                          {item.name}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Price: ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {item.cancelable ? (
                      <div>
                        <p className="font-medium text-green-600">
                          {item.refundPercent}% refundable
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{Math.round(item.price * item.refundPercent / 100).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-600">Non-refundable</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {selectedItems.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Cancellation Details</CardTitle>
                <CardDescription>Tell us why you're cancelling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reason">Reason for cancellation</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="change-of-plans">Change of plans</SelectItem>
                      <SelectItem value="medical-emergency">Medical emergency</SelectItem>
                      <SelectItem value="work-commitment">Work commitment</SelectItem>
                      <SelectItem value="financial-constraints">Financial constraints</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="details">Additional details (optional)</Label>
                  <Textarea
                    id="details"
                    placeholder="Provide any additional information..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium mb-2">Refund Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Items selected for cancellation:</span>
                      <span>{selectedItems.length}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total refund amount:</span>
                      <span>₹{getTotalRefund().toLocaleString()}</span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-2">
                      Refunds will be processed within 5-7 business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to={`/booking/${groupId}/confirmation`}>
                Back to Confirmation
              </Link>
            </Button>
            <Button 
              disabled={selectedItems.length === 0 || !reason}
              onClick={() => {
                // Handle cancellation request
                alert('Cancellation request submitted!');
              }}
            >
              Submit Cancellation Request
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancellationRequest;