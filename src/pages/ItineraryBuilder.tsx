import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Plus, GripVertical, Clock, MapPin, DollarSign, Save, Undo, Redo, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Navbar from "@/components/layout/Navbar"

interface Activity {
  id: number
  time: string
  title: string
  location: string
  description: string
  cost: number
}

interface ItineraryDay {
  date: string
  day: string
  activities: Activity[]
}

const ItineraryBuilder = () => {
  const { groupId } = useParams()
  const [syncStatus, setSyncStatus] = useState<'saved' | 'saving' | 'offline'>('saved')
  const [totalBudget] = useState(25000)
  const [currentBudget, setCurrentBudget] = useState(18500)

  // Mock group data
  const groupData = {
    name: "Goa Beach Vibes",
    dates: "Dec 15-20, 2024"
  }

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      date: "Dec 15, 2024",
      day: "Day 1",
      activities: [
        {
          id: 1,
          time: "10:00 AM",
          title: "Airport Pickup & Hotel Check-in",
          location: "Goa Airport → Hotel",
          description: "Arrive at Goa Airport, private transfer to hotel, check-in and freshen up",
          cost: 1500
        },
        {
          id: 2,
          time: "2:00 PM",
          title: "Lunch at Beach Shack",
          location: "Baga Beach",
          description: "Welcome lunch at famous Britto's beach shack",
          cost: 800
        },
        {
          id: 3,
          time: "4:00 PM",
          title: "Beach Relaxation",
          location: "Baga Beach",
          description: "Relax on the beach, swimming, beach volleyball",
          cost: 0
        }
      ]
    },
    {
      date: "Dec 16, 2024",
      day: "Day 2",
      activities: [
        {
          id: 4,
          time: "9:00 AM",
          title: "Water Sports Adventure",
          location: "Calangute Beach",
          description: "Parasailing, jet skiing, banana boat rides",
          cost: 2500
        },
        {
          id: 5,
          time: "1:00 PM",
          title: "Seafood Lunch",
          location: "Fisherman's Wharf",
          description: "Fresh seafood lunch with traditional Goan flavors",
          cost: 1200
        }
      ]
    }
  ])

  const addActivity = (dayIndex: number) => {
    const newActivity: Activity = {
      id: Date.now(),
      time: "12:00 PM",
      title: "New Activity",
      location: "Location",
      description: "Activity description",
      cost: 0
    }
    
    const updatedItinerary = [...itinerary]
    updatedItinerary[dayIndex].activities.push(newActivity)
    setItinerary(updatedItinerary)
    setSyncStatus('saving')
    
    // Simulate save
    setTimeout(() => setSyncStatus('saved'), 1000)
  }

  const updateActivity = (dayIndex: number, activityIndex: number, field: keyof Activity, value: string | number) => {
    const updatedItinerary = [...itinerary]
    updatedItinerary[dayIndex].activities[activityIndex] = {
      ...updatedItinerary[dayIndex].activities[activityIndex],
      [field]: value
    }
    setItinerary(updatedItinerary)
    setSyncStatus('saving')
    
    // Update budget if cost changed
    if (field === 'cost') {
      const totalCost = updatedItinerary.reduce((total, day) => 
        total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
      )
      setCurrentBudget(totalCost)
    }
    
    // Simulate save
    setTimeout(() => setSyncStatus('saved'), 1000)
  }

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedItinerary = [...itinerary]
    updatedItinerary[dayIndex].activities.splice(activityIndex, 1)
    setItinerary(updatedItinerary)
    setSyncStatus('saving')
    
    setTimeout(() => setSyncStatus('saved'), 1000)
  }

  const optimizeItinerary = () => {
    toast.success("AI is optimizing your itinerary for better flow and budget efficiency!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20">
        {/* Fixed Header */}
        <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to={`/groups/${groupId}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft size={20} />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{groupData.name}</h1>
                  <p className="text-sm text-muted-foreground">Edit Itinerary • {groupData.dates}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sync Status */}
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    syncStatus === 'saved' ? 'bg-green-500' : 
                    syncStatus === 'saving' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm text-muted-foreground capitalize">{syncStatus}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Undo size={14} className="mr-1" />
                    Undo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Redo size={14} className="mr-1" />
                    Redo
                  </Button>
                  <Button size="sm" onClick={optimizeItinerary}>
                    <Sparkles size={14} className="mr-1" />
                    AI Optimize
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Itinerary Editor */}
            <div className="lg:col-span-3 space-y-6">
              {itinerary.map((day, dayIndex) => (
                <Card key={dayIndex} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-foreground">
                        {day.day} - {day.date}
                      </CardTitle>
                      <Button
                        onClick={() => addActivity(dayIndex)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Activity
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {day.activities.map((activity, activityIndex) => (
                      <Card key={activity.id} className="p-4 bg-muted/30">
                        <div className="flex items-start space-x-4">
                          <Button variant="ghost" size="sm" className="mt-2 cursor-grab">
                            <GripVertical size={16} />
                          </Button>
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor={`time-${activity.id}`}>Time</Label>
                                <div className="flex items-center space-x-2">
                                  <Clock size={16} className="text-primary" />
                                  <Input
                                    id={`time-${activity.id}`}
                                    value={activity.time}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, 'time', e.target.value)}
                                    className="w-32"
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`title-${activity.id}`}>Activity</Label>
                                <Input
                                  id={`title-${activity.id}`}
                                  value={activity.title}
                                  onChange={(e) => updateActivity(dayIndex, activityIndex, 'title', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor={`location-${activity.id}`}>Location</Label>
                                <div className="flex items-center space-x-2">
                                  <MapPin size={16} className="text-primary" />
                                  <Input
                                    id={`location-${activity.id}`}
                                    value={activity.location}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, 'location', e.target.value)}
                                    className="flex-1"
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`cost-${activity.id}`}>Cost (₹)</Label>
                                <div className="flex items-center space-x-2">
                                  <DollarSign size={16} className="text-primary" />
                                  <Input
                                    id={`cost-${activity.id}`}
                                    type="number"
                                    value={activity.cost}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, 'cost', parseInt(e.target.value) || 0)}
                                    className="w-32"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor={`description-${activity.id}`}>Description</Label>
                              <Textarea
                                id={`description-${activity.id}`}
                                value={activity.description}
                                onChange={(e) => updateActivity(dayIndex, activityIndex, 'description', e.target.value)}
                                rows={2}
                              />
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeActivity(dayIndex, activityIndex)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Budget Sidebar */}
            <div className="lg:col-span-1">
              <Card className="card-elevated sticky top-40">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign size={20} className="text-primary" />
                    <span>Budget Overview</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Budget</span>
                      <span className="font-medium">₹{totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current Cost</span>
                      <span className={`font-medium ${currentBudget > totalBudget ? 'text-destructive' : 'text-primary'}`}>
                        ₹{currentBudget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Remaining</span>
                      <span className={`font-medium ${(totalBudget - currentBudget) < 0 ? 'text-destructive' : 'text-green-600'}`}>
                        ₹{(totalBudget - currentBudget).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentBudget > totalBudget ? 'bg-destructive' : 'bg-gradient-to-r from-primary to-primary-hover'
                      }`}
                      style={{ width: `${Math.min((currentBudget / totalBudget) * 100, 100)}%` }}
                    />
                  </div>
                  
                  {currentBudget > totalBudget && (
                    <Badge variant="destructive" className="w-full justify-center">
                      Over Budget by ₹{(currentBudget - totalBudget).toLocaleString()}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryBuilder