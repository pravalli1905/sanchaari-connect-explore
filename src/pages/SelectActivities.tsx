import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/layout/Navbar"
import { useBooking } from "@/contexts/BookingContext"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

const SelectActivities = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { selectedActivities, addSelectedActivity } = useBooking()
  const [loading, setLoading] = useState(false)
  const [activities, setActivities] = useState<any[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('rating', { ascending: false })

      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
      toast.error('Failed to load activities')
    } finally {
      setDataLoading(false)
    }
  }

  const addActivity = async (activity: any) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    addSelectedActivity({
      id: activity.id,
      type: 'activity',
      name: activity.name,
      price: activity.price
    })
    toast.success(`${activity.name} added to your booking!`)
    setLoading(false)
  }

  const continueToReview = () => {
    navigate(`/booking/${groupId}/review`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(`/booking/${groupId}/hotels`)}>
            <ArrowLeft className="mr-2" size={20} />
            Back to Hotels
          </Button>
          <h1 className="text-3xl font-bold text-secondary mb-2">Select Activities</h1>
          <p className="text-muted-foreground">Choose exciting activities for your trip</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataLoading ? (
            <div className="col-span-2 text-center py-8">Loading activities...</div>
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={activity.image_url || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'}
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{activity.name}</h3>
                      <p className="text-muted-foreground flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {activity.location}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="ml-1 font-medium">{activity.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4 text-muted-foreground">
                    <Clock size={16} className="mr-1" />
                    <span>{activity.duration}</span>
                  </div>

                  {activity.description && (
                    <p className="text-sm text-muted-foreground mb-4">{activity.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{activity.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">per person • {activity.capacity} spots available</p>
                    </div>
                    <Button 
                      onClick={() => addActivity(activity)}
                      disabled={loading}
                      className="bg-gradient-to-r from-primary to-primary-hover"
                    >
                      {loading ? "Adding..." : "Add to Booking"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No activities available</p>
            </div>
          )}
        </div>

        {/* Selected Summary */}
        {selectedActivities.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
            <p className="font-medium">{selectedActivities.length} activities selected</p>
            <Button variant="secondary" className="mt-2" onClick={continueToReview}>
              Review Booking →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectActivities