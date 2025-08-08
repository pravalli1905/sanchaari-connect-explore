import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Share2, CheckCircle, Phone } from 'lucide-react';

const BookingConfirmation = () => {
  const { groupId } = useParams();
  
  const booking = {
    id: 'BK001234',
    trip: 'Kerala Adventure Trip',
    dates: 'March 15-22, 2024',
    members: ['Rahul Sharma', 'Priya Patel', 'Arjun Kumar'],
    total: 156500,
    status: 'Confirmed'
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your trip is all set. Here are your details.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{booking.trip}</CardTitle>
                  <CardDescription>Booking ID: {booking.id}</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium">Travel Dates</h4>
                  <p className="text-muted-foreground">{booking.dates}</p>
                </div>
                <div>
                  <h4 className="font-medium">Group Members</h4>
                  <p className="text-muted-foreground">{booking.members.length} travelers</p>
                </div>
                <div>
                  <h4 className="font-medium">Total Amount</h4>
                  <p className="text-muted-foreground">₹{booking.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Download Documents</CardTitle>
                <CardDescription>Get your travel documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Flight Tickets (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Hotel Vouchers (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Activity Tickets (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Invoice (PDF)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Share and manage your booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Email Confirmation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4">
            <Button asChild>
              <Link to={`/groups/${groupId}/itinerary`}>
                View Full Itinerary
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Have questions? <Link to="/help/chat" className="text-primary hover:underline">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;