import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Calendar, CreditCard } from "lucide-react"
import Navbar from "@/components/layout/Navbar"

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: "Create Your Group",
      description: "Start by creating a travel group and inviting your friends or family members. Everyone gets to participate in the planning process.",
      step: "01"
    },
    {
      icon: MapPin,
      title: "Choose Destination",
      description: "Browse destinations together and vote on your favorites. Our smart suggestions help you find the perfect place for everyone.",
      step: "02"
    },
    {
      icon: Calendar,
      title: "Plan Your Itinerary",
      description: "Collaborate on building your itinerary. Add activities, restaurants, and experiences that everyone will enjoy.",
      step: "03"
    },
    {
      icon: CreditCard,
      title: "Book & Pay Together",
      description: "Split costs fairly and book everything in one place. Secure payments and transparent cost sharing make it easy.",
      step: "04"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Planning group travel has never been easier. Follow these simple steps to create unforgettable experiences together.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{step.step}</span>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-primary/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Watch how easy it is to plan your next group adventure.
            </p>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
              <p className="text-muted-foreground">Video Demo Coming Soon</p>
            </div>
            <a href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Start Planning Now
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HowItWorks