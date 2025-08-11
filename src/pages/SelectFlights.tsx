import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Clock, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/layout/Navbar"
import { useBooking } from "@/contexts/BookingContext"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

const SelectFlights = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { selectedFlight, setSelectedFlight } = useBooking()
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('price', { ascending: true })

      if (error) throw error
      setFlights(data || [])
    } catch (error) {
      console.error('Error fetching flights:', error)
      toast.error('Failed to load flights')
    } finally {
      setLoading(false)
    }
  }

  const selectFlight = (flight: any) => {
    setSelectedFlight({
      id: flight.id,
      type: 'flight',
      name: `${flight.airline} ${flight.flight_number}`,
      airline: flight.airline,
      price: flight.price
    })
    toast.success("Flight selected successfully!")
  }

  const continueToHotels = () => {
    if (!selectedFlight) {
      toast.error('Please select a flight before continuing')
      return
    }
    navigate(`/booking/${groupId}/hotels`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-secondary mb-2">Select Flights</h1>
          <p className="text-muted-foreground">Choose the best flight for your group</p>
        </div>

        {/* Search Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="From" />
              <Input placeholder="To" />
              <Input type="date" />
              <Button className="bg-gradient-to-r from-primary to-primary-hover">
                Search Flights
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Flight Results */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading flights...</div>
          ) : flights.length > 0 ? (
            flights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Plane className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{flight.airline}</h3>
                        <p className="text-muted-foreground">{flight.flight_number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{flight.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Route</p>
                      <p className="font-medium">{flight.origin} → {flight.destination}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Departure</p>
                      <p className="font-medium">{flight.departure_time}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Arrival</p>
                      <p className="font-medium">{flight.arrival_time}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Duration</p>
                      <p className="font-medium flex items-center justify-center">
                        <Clock size={16} className="mr-1" />
                        {flight.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {flight.available_seats} seats available
                      </span>
                    </div>
                    <Button 
                      onClick={() => selectFlight(flight)}
                      className="bg-gradient-to-r from-primary to-primary-hover"
                    >
                      Select Flight
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No flights available</p>
            </div>
          )}
        </div>

        {/* Selected Summary */}
        {selectedFlight && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
            <p className="font-medium">{selectedFlight.airline} selected</p>
            <Button variant="secondary" className="mt-2" onClick={continueToHotels}>
              Continue to Hotels →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectFlights