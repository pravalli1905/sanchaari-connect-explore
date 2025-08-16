import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Heart, Globe } from "lucide-react"
import Navbar from "@/components/layout/Navbar"

const AboutUs = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe travel is better when shared. Our platform connects people and creates lasting friendships through shared adventures."
    },
    {
      icon: Target,
      title: "Simplicity",
      description: "Complex travel planning shouldn't be complicated. We make group travel planning as simple as planning a dinner with friends."
    },
    {
      icon: Heart,
      title: "Memorable Experiences",
      description: "Every trip should be unforgettable. We focus on creating experiences that bring people together and create lifelong memories."
    },
    {
      icon: Globe,
      title: "Cultural Appreciation",
      description: "We celebrate India's diverse culture and help travelers discover hidden gems while respecting local communities."
    }
  ]

  const team = [
    {
      name: "Priya Sharma",
      role: "Co-Founder & CEO",
      description: "Former travel consultant with 10+ years of experience in group travel planning."
    },
    {
      name: "Rahul Patel",
      role: "Co-Founder & CTO",
      description: "Tech entrepreneur passionate about solving real-world problems through innovative solutions."
    },
    {
      name: "Anita Desai",
      role: "Head of Product",
      description: "UX expert focused on creating intuitive experiences for travelers."
    },
    {
      name: "Vikram Singh",
      role: "Head of Partnerships",
      description: "Travel industry veteran with extensive network of local partners across India."
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
              About Sanchaari
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Making group travel planning effortless and enjoyable for Indian travelers. We're on a mission to bring people together through unforgettable adventures.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Sanchaari was born from a simple frustration: planning group trips was unnecessarily complicated. 
                  Our founders, frequent travelers themselves, experienced firsthand the chaos of coordinating schedules, 
                  managing preferences, and splitting costs among friends and family.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  After one particularly challenging group trip planning experience involving 12 friends and countless 
                  WhatsApp messages, they realized there had to be a better way. That's when the idea for Sanchaari 
                  was born - a platform that would make group travel planning as enjoyable as the trip itself.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're proud to have helped thousands of travelers create unforgettable memories together. 
                  From weekend getaways to month-long adventures, Sanchaari has become the go-to platform for 
                  group travel planning in India.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              To revolutionize group travel by providing the tools, technology, and support that make 
              planning and booking group trips effortless, affordable, and enjoyable for everyone involved.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Successful Trips</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Destinations</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutUs