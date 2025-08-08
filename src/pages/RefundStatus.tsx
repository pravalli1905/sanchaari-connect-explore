import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Phone, ArrowLeft } from 'lucide-react';

const RefundStatus = () => {
  const { groupId } = useParams();

  const refundData = {
    requestId: 'REF001234',
    amount: 28500,
    status: 'processing',
    progress: 60,
    timeline: [
      { step: 'Request Submitted', status: 'completed', date: 'Mar 10, 2024 10:30 AM' },
      { step: 'Under Review', status: 'completed', date: 'Mar 10, 2024 2:15 PM' },
      { step: 'Processing Refund', status: 'current', date: 'Mar 11, 2024 9:00 AM' },
      { step: 'Refund Completed', status: 'pending', date: 'Expected: Mar 15, 2024' }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current': return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />;
      case 'pending': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'current': return 'text-blue-600';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/booking/${groupId}/cancel`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Refund Status</h1>
              <p className="text-muted-foreground">Track your refund request</p>
            </div>
          </div>

          {/* Refund Overview */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Refund Request #{refundData.requestId}</CardTitle>
                  <CardDescription>Kerala Adventure Trip cancellation</CardDescription>
                </div>
                <Badge variant="secondary">
                  {refundData.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-2xl mb-2">
                    ₹{refundData.amount.toLocaleString()}
                  </h3>
                  <p className="text-muted-foreground">Refund amount</p>
                </div>
                <div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{refundData.progress}%</span>
                    </div>
                    <Progress value={refundData.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Refund Timeline</CardTitle>
              <CardDescription>Track the progress of your refund request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {refundData.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${getStatusColor(item.status)}`}>
                        {item.step}
                      </h4>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    {item.status === 'current' && (
                      <Badge variant="default" className="text-xs">
                        In Progress
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium">Refund Method</h4>
                <p className="text-muted-foreground">
                  Refund will be credited to your original payment method (Credit Card ending in 1234)
                </p>
              </div>
              <div>
                <h4 className="font-medium">Processing Time</h4>
                <p className="text-muted-foreground">
                  Refunds typically take 5-7 business days to reflect in your account after processing
                </p>
              </div>
              <div>
                <h4 className="font-medium">Refund Breakdown</h4>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Flight cancellation (80% refund):</span>
                    <span>₹6,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotel cancellation (90% refund):</span>
                    <span>₹23,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Activity cancellation (100% refund):</span>
                    <span>₹3,500</span>
                  </div>
                  <div className="flex justify-between font-medium text-foreground pt-1 border-t">
                    <span>Total refund:</span>
                    <span>₹{refundData.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Actions */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/help/chat">
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/booking/${groupId}/confirmation`}>
                Back to Booking Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundStatus;