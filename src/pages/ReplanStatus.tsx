import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

const ReplanStatus = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const replanSteps = [
    {
      title: 'Analyzing Member Preferences',
      description: 'Reviewing updated member preferences and requirements',
      duration: 30
    },
    {
      title: 'Optimizing Budget Allocation',
      description: 'Redistributing costs based on current group size',
      duration: 45
    },
    {
      title: 'Updating Accommodation',
      description: 'Finding suitable rooms for the current group',
      duration: 40
    },
    {
      title: 'Adjusting Activities',
      description: 'Modifying group activities and experiences',
      duration: 35
    },
    {
      title: 'Finalizing Itinerary',
      description: 'Creating the updated travel schedule',
      duration: 30
    }
  ];

  const mockChanges = [
    'Budget reduced from ₹1,50,000 to ₹1,20,000 due to member dropout',
    'Hotel rooms changed from 3 to 2 double occupancy rooms',
    'Group activity discounts applied for smaller group size',
    'Transportation adjusted for 4 people instead of 6',
    'Restaurant reservations updated for current group size'
  ];

  useEffect(() => {
    if (isCompleted || isCancelled) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 180); // Complete in 3 minutes
        
        // Update current step based on progress
        const stepThreshold = 100 / replanSteps.length;
        const newCurrentStep = Math.min(
          Math.floor(newProgress / stepThreshold),
          replanSteps.length - 1
        );
        setCurrentStep(newCurrentStep);
        
        if (newProgress >= 100) {
          setIsCompleted(true);
          clearInterval(interval);
          return 100;
        }
        
        return newProgress;
      });
      
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isCompleted, isCancelled]);

  const handleCancelReplan = () => {
    setIsCancelled(true);
    toast.success('Replanning cancelled');
  };

  const handleAcceptChanges = () => {
    toast.success('Updated itinerary accepted!');
    // SPA navigation (no full reload)
    navigate(`/groups/${groupId}/itinerary`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCancelled) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <X className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Replanning Cancelled</h1>
                <p className="text-muted-foreground mt-2">
                  The trip replanning process has been cancelled
                </p>
              </div>
              <Button asChild>
                <Link to={`/groups/${groupId}`}>
                  Return to Group Overview
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isCompleted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Replanning Complete!</h1>
                <p className="text-muted-foreground mt-2">
                  Your trip has been successfully optimized for the current group
                </p>
              </div>

              <Card className="text-left max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Summary of Changes</CardTitle>
                  <CardDescription>Here's what we've updated for your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockChanges.map((change, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link to={`/groups/${groupId}`}>
                    Review Later
                  </Link>
                </Button>
                <Button onClick={handleAcceptChanges}>
                  Accept Updated Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/groups/${groupId}/members`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Trip Replanning in Progress</h1>
              <p className="text-muted-foreground">Optimizing your trip for the current group</p>
            </div>
          </div>

          {/* Progress Section */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <RefreshCw className="h-5 w-5 animate-spin" />
                Replanning Your Trip
              </CardTitle>
              <CardDescription>
                Estimated time remaining: {formatTime(timeRemaining)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">
                  {replanSteps[currentStep]?.title}
                </h3>
                <p className="text-muted-foreground">
                  {replanSteps[currentStep]?.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Steps Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Replanning Steps</CardTitle>
              <CardDescription>Here's what we're working on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {replanSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {index < currentStep ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      ) : index === currentStep ? (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-600 animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    <Badge variant={index <= currentStep ? "default" : "secondary"}>
                      {index < currentStep ? "Complete" : index === currentStep ? "In Progress" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Changes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Changes Made So Far</CardTitle>
              <CardDescription>We're making these adjustments to optimize your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockChanges.slice(0, currentStep + 1).map((change, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleCancelReplan}>
              <X className="h-4 w-4 mr-2" />
              Cancel Replanning
            </Button>
            
            {progress > 50 && (
              <Button onClick={handleAcceptChanges}>
                Accept Changes Now
              </Button>
            )}
          </div>

          {/* Auto-refresh notice */}
          <Alert className="mt-8">
            <Clock className="h-4 w-4" />
            <AlertDescription>
              This page updates automatically. You can safely navigate away and return later to check the progress.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
};

export default ReplanStatus;
