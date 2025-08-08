import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Navbar from '@/components/layout/Navbar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const GroupPreferences = () => {
  const { groupId } = useParams();
  const [budget, setBudget] = useState([25000, 75000]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [foodPreferences, setFoodPreferences] = useState('');

  const interestOptions = [
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'culture', label: 'Culture', icon: '🏛️' },
    { id: 'relaxation', label: 'Relaxation', icon: '🧘' },
    { id: 'food', label: 'Food', icon: '🍛' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'nature', label: 'Nature', icon: '🌿' }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setInterests([...interests, interestId]);
    } else {
      setInterests(interests.filter(id => id !== interestId));
    }
  };

  const handleSave = () => {
    // Mock save functionality
    toast.success('Preferences saved successfully!');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/groups/${groupId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Trip Preferences</h1>
              <p className="text-muted-foreground">Customize your trip experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Budget Range */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Budget Range
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your budget range affects accommodation and activity recommendations</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>Set your preferred spending range for this trip</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-4">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      min={10000}
                      max={200000}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{budget[0].toLocaleString()}</span>
                    <span>₹{budget[1].toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader>
                  <CardTitle>Interests & Activities</CardTitle>
                  <CardDescription>What would you like to experience during this trip?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {interestOptions.map((interest) => (
                      <div key={interest.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest.id}
                          checked={interests.includes(interest.id)}
                          onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                        />
                        <Label htmlFor={interest.id} className="flex items-center gap-2 cursor-pointer">
                          <span>{interest.icon}</span>
                          <span className="text-sm">{interest.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Travel Dates */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Dates</CardTitle>
                  <CardDescription>Select the dates when you're available to travel</CardDescription>
                </CardHeader>
                <CardContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {selectedDates.length > 0 
                          ? `${selectedDates.length} dates selected`
                          : "Select available dates"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => setSelectedDates(dates || [])}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {selectedDates.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Selected dates:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDates.map((date, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {format(date, 'MMM dd')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Food Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Food Preferences</CardTitle>
                  <CardDescription>Any dietary restrictions or preferences?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={foodPreferences} onValueChange={setFoodPreferences}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your food preferences" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-preference">No specific preference</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="halal">Halal</SelectItem>
                      <SelectItem value="gluten-free">Gluten-free</SelectItem>
                      <SelectItem value="dairy-free">Dairy-free</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Your Preferences</CardTitle>
                  <CardDescription>Current settings summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">Budget Range</h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{budget[0].toLocaleString()} - ₹{budget[1].toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Interests</h4>
                    <p className="text-sm text-muted-foreground">
                      {interests.length > 0 
                        ? `${interests.length} selected`
                        : 'None selected'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Available Dates</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedDates.length > 0 
                        ? `${selectedDates.length} dates`
                        : 'Not specified'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Food Preference</h4>
                    <p className="text-sm text-muted-foreground">
                      {foodPreferences || 'Not specified'}
                    </p>
                  </div>
                  
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPreferences;