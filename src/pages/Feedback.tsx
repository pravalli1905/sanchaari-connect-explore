import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Feedback = () => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [serviceRatings, setServiceRatings] = useState({
    booking: 0,
    support: 0,
    app: 0
  });
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
  };

  const handleServiceRating = (service: string, starNumber: number) => {
    setServiceRatings(prev => ({
      ...prev,
      [service]: starNumber
    }));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }
    
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  Help us improve Sanchaari for everyone
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Sign in to submit feedback</h3>
                  <p className="text-muted-foreground mb-4">
                    We'd love to hear about your experience with Sanchaari
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-3">What our users say</h4>
                  <div className="space-y-4">
                    <div className="text-left p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">Rahul S.</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Amazing platform for group travel planning. Made our Kerala trip so much easier to organize!"
                      </p>
                    </div>
                    <div className="text-left p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">Priya M.</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "The AI itinerary planner saved us hours of research. Highly recommended!"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your feedback has been submitted successfully. We truly appreciate you taking the time to help us improve Sanchaari.
                </p>
                <div className="space-y-2">
                  <Button asChild>
                    <Link to="/dashboard">Back to Dashboard</Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Want to help more? <Link to="/help" className="text-primary hover:underline">Check our help center</Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Share Your Feedback</h1>
            <p className="text-muted-foreground">
              Help us improve Sanchaari by sharing your experience
            </p>
          </div>

          <div className="space-y-6">
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Experience</CardTitle>
                <CardDescription>How would you rate your experience with Sanchaari?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      {rating} out of 5 stars
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Service Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Our Services</CardTitle>
                <CardDescription>Help us understand what we're doing well</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'booking', label: 'Booking Process' },
                  { key: 'support', label: 'Customer Support' },
                  { key: 'app', label: 'App Experience' }
                ].map((service) => (
                  <div key={service.key} className="flex items-center justify-between">
                    <span className="font-medium">{service.label}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleServiceRating(service.key, star)}
                          className="transition-colors"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= serviceRatings[service.key as keyof typeof serviceRatings]
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Written Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Tell us more</CardTitle>
                <CardDescription>What did you like? What could we improve?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feedback">Your feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, suggestions, or report any issues..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                  />
                </div>

                <div>
                  <Label htmlFor="photo-upload">Upload photos (optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop photos or click to upload
                    </p>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        Choose Files
                      </Label>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button variant="outline" asChild className="flex-1">
                <Link to="/dashboard">Cancel</Link>
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;