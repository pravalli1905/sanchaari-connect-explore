import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Calendar, CreditCard, MessageCircle, Shield } from "lucide-react"
import Navbar from "@/components/layout/Navbar"

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Group Planning Made Easy",
      description: "Collaborate with friends and family to plan the perfect trip together. Everyone gets a voice in the planning process."
    },
    {
      icon: MapPin,
      title: "Smart Destination Suggestions",
      description: "Get personalized destination recommendations based on your group's preferences, budget, and travel dates."
    },
    {
      icon: Calendar,
      title: "Flexible Itinerary Builder",
      description: "Create detailed itineraries with our drag-and-drop builder. Easily adjust plans as your group makes decisions."
    },
    {
      icon: CreditCard,
      title: "Split Payments",
      description: "Transparent cost splitting and easy payment management. No more awkward money conversations."
    },
    {
      icon: MessageCircle,
      title: "Real-time Group Chat",
      description: "Stay connected with your travel group. Share ideas, photos, and updates in real-time."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data and payments are protected with bank-level security. Travel with confidence."
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
              Powerful Features for Group Travel
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan, book, and enjoy amazing group trips with friends and family.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center bg-primary/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of travelers who have made their group trips memorable with Sanchaari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Get Started Free
              </a>
              <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Features