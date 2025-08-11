import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/Navbar"
import { useBooking } from "@/contexts/BookingContext"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

const SelectHotels = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { selectedHotel, setSelectedHotel } = useBooking()
  const [hotels, setHotels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHotels()
  }, [])

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false })

      if (error) throw error
      setHotels(data || [])
    } catch (error) {
      console.error('Error fetching hotels:', error)
      toast.error('Failed to load hotels')
    } finally {
      setLoading(false)
    }
  }

  const selectHotel = (hotel: any) => {
    setSelectedHotel({
      id: hotel.id,
      type: 'hotel',
      name: hotel.name,
      price: hotel.price_per_night
    })
    toast.success("Hotel selected successfully!")
  }

  const continueToActivities = () => {
    if (!selectedHotel) {
      toast.error('Please select a hotel before continuing')
      return
    }
    navigate(`/booking/${groupId}/activities`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(`/booking/${groupId}/flights`)}>
            <ArrowLeft className="mr-2" size={20} />
            Back to Flights
          </Button>
          <h1 className="text-3xl font-bold text-secondary mb-2">Select Hotels</h1>
          <p className="text-muted-foreground">Choose the perfect accommodation for your stay</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center py-8">Loading hotels...</div>
          ) : hotels.length > 0 ? (
            hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{hotel.name}</h3>
                      <p className="text-muted-foreground flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {hotel.location}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="ml-1 font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{hotel.price_per_night.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">per night • {hotel.available_rooms} rooms available</p>
                    </div>
                    <Button 
                      onClick={() => selectHotel(hotel)}
                      className="bg-gradient-to-r from-primary to-primary-hover"
                    >
                      Select Hotel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No hotels available</p>
            </div>
          )}
        </div>

        {/* Selected Summary */}
        {selectedHotel && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
            <p className="font-medium">{selectedHotel.name} selected</p>
            <Button variant="secondary" className="mt-2" onClick={continueToActivities}>
              Continue to Activities →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectHotels