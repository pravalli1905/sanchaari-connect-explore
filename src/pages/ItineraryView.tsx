import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, MapPin, Clock, Users, DollarSign, Share, Printer, ChevronDown, ChevronUp, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Navbar from "@/components/layout/Navbar"

interface Activity {
  id: number
  time: string
  title: string
  location: string
  description: string
  cost: number
  images?: string[]
  notes?: string
}

interface ItineraryDay {
  date: string
  day: string
  activities: Activity[]
  isExpanded: boolean
}

const ItineraryView = () => {
  const { groupId } = useParams()
  
  // Mock group data
  const groupData = {
    name: "Goa Beach Vibes",
    dates: "Dec 15-20, 2024",
    members: 8,
    totalBudget: 25000,
    currentCost: 18500
  }

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      date: "Dec 15, 2024",
      day: "Day 1",
      isExpanded: true,
      activities: [
        {
          id: 1,
          time: "10:00 AM",
          title: "Airport Pickup & Hotel Check-in",
          location: "Goa Airport → Hotel Baga Marina",
          description: "Arrive at Goa Airport, private transfer to hotel, check-in and freshen up. Welcome drinks at the hotel lobby.",
          cost: 1500,
          images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop"],
          notes: "Flight: AI 139 at 9:30 AM"
        },
        {
          id: 2,
          time: "2:00 PM",
          title: "Welcome Lunch at Beach Shack",
          location: "Britto's, Baga Beach",
          description: "Welcome lunch at famous Britto's beach shack with fresh seafood and Goan specialties. Perfect spot to start your beach vacation!",
          cost: 800,
          images: ["https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=200&fit=crop"]
        },
        {
          id: 3,
          time: "4:00 PM",
          title: "Beach Relaxation & Swimming",
          location: "Baga Beach",
          description: "Relax on the golden sands of Baga Beach, swimming in the Arabian Sea, beach volleyball, and soaking up the Goan sun.",
          cost: 0,
          images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop"]
        },
        {
          id: 4,
          time: "7:00 PM",
          title: "Sunset Viewing & Dinner",
          location: "Anjuna Beach",
          description: "Watch the spectacular Goan sunset followed by dinner at a beachside restaurant with live music.",
          cost: 1200,
          images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"]
        }
      ]
    },
    {
      date: "Dec 16, 2024",
      day: "Day 2",
      isExpanded: false,
      activities: [
        {
          id: 5,
          time: "9:00 AM",
          title: "Water Sports Adventure",
          location: "Calangute Beach",
          description: "Thrilling water sports activities including parasailing, jet skiing, banana boat rides, and bumper rides.",
          cost: 2500,
          images: ["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300&h=200&fit=crop"]
        },
        {
          id: 6,
          time: "1:00 PM",
          title: "Authentic Goan Seafood Lunch",
          location: "Fisherman's Wharf, Panaji",
          description: "Experience authentic Goan cuisine with fresh catch of the day, fish curry rice, and bebinca for dessert.",
          cost: 1200,
          images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"]
        },
        {
          id: 7,
          time: "3:30 PM",
          title: "Old Goa Heritage Tour",
          location: "Basilica of Bom Jesus & Se Cathedral",
          description: "Explore the UNESCO World Heritage sites of Old Goa, including historic churches and Portuguese architecture.",
          cost: 300,
          images: ["https://images.unsplash.com/photo-1585465550579-2d7b12cf8b93?w=300&h=200&fit=crop"]
        }
      ]
    },
    {
      date: "Dec 17, 2024",
      day: "Day 3",
      isExpanded: false,
      activities: [
        {
          id: 8,
          time: "8:00 AM",
          title: "Spice Plantation Tour",
          location: "Sahakari Spice Farm",
          description: "Guided tour of traditional spice plantations, elephant ride, and traditional Goan lunch.",
          cost: 1800,
          images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"]
        }
      ]
    }
  ])

  const toggleDay = (dayIndex: number) => {
    const updatedItinerary = [...itinerary]
    updatedItinerary[dayIndex].isExpanded = !updatedItinerary[dayIndex].isExpanded
    setItinerary(updatedItinerary)
  }

  const shareItinerary = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Itinerary link copied to clipboard!")
  }

  const printItinerary = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link to={`/groups/${groupId}`}>
                <Button variant="ghost">
                  <ArrowLeft className="mr-2" size={20} />
                  Back to Group
                </Button>
              </Link>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={shareItinerary}>
                <Share size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={printItinerary}>
                <Printer size={16} className="mr-2" />
                Print
              </Button>
              <Link to={`/groups/${groupId}/itinerary/edit`}>
                <Button className="bg-gradient-to-r from-primary to-primary-hover">
                  Edit Itinerary
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="card-elevated">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">6 Days</p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Group Size</p>
                <p className="font-semibold">{groupData.members} Members</p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold">₹{groupData.totalBudget.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card className="card-elevated">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="font-semibold">Goa, India</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{groupData.name}</h1>
            <p className="text-xl text-muted-foreground">{groupData.dates}</p>
          </div>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-6">
          {itinerary.map((day, dayIndex) => (
            <Card key={dayIndex} className="card-elevated overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleDay(dayIndex)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-foreground">
                    {day.day} - {day.date}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      {day.activities.length} {day.activities.length === 1 ? 'Activity' : 'Activities'}
                    </Badge>
                    {day.isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </CardHeader>
              
              {day.isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activity.id} className="relative">
                        {activityIndex > 0 && <Separator className="mb-6" />}
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Activity Details */}
                          <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-start space-x-4">
                              <div className="flex items-center space-x-2 text-primary">
                                <Clock size={16} />
                                <span className="font-medium">{activity.time}</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-foreground mb-2">{activity.title}</h3>
                                <div className="flex items-center space-x-2 text-muted-foreground mb-3">
                                  <MapPin size={16} />
                                  <span>{activity.location}</span>
                                </div>
                                <p className="text-foreground leading-relaxed">{activity.description}</p>
                                
                                {activity.notes && (
                                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                      <strong>Note:</strong> {activity.notes}
                                    </p>
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center space-x-2">
                                    <DollarSign size={16} className="text-green-600" />
                                    <span className="font-medium text-green-600">
                                      {activity.cost === 0 ? 'Free' : `₹${activity.cost.toLocaleString()}`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Activity Images */}
                          {activity.images && activity.images.length > 0 && (
                            <div className="lg:col-span-1">
                              <div className="grid grid-cols-2 gap-2">
                                {activity.images.map((image, imageIndex) => (
                                  <div key={imageIndex} className="relative group cursor-pointer">
                                    <img
                                      src={image}
                                      alt={activity.title}
                                      className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                                      <Image size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Budget Summary */}
        <Card className="card-elevated mt-8 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign size={24} className="text-primary" />
              <span>Trip Budget Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-foreground">₹{groupData.totalBudget.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Planned Expenses</p>
                <p className="text-2xl font-bold text-primary">₹{groupData.currentCost.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-green-600">₹{(groupData.totalBudget - groupData.currentCost).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-3 bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-300"
                  style={{ width: `${(groupData.currentCost / groupData.totalBudget) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {Math.round((groupData.currentCost / groupData.totalBudget) * 100)}% of budget allocated
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ItineraryView