import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Sanchaari made planning our college reunion trip to Goa so much easier! The AI suggestions were spot-on and the budget tracking saved us from overspending."
  },
  {
    name: "Arjun Patel",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Best travel planning app ever! Coordinating with 8 friends for our Himachal trip was seamless. Everyone could contribute ideas and vote on activities."
  },
  {
    name: "Sneha Reddy",
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The real-time expense splitting feature is a game-changer! No more awkward conversations about money. Everything is transparent and fair."
  }
]

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            What Travelers Are Saying
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of happy travelers who've made their group trips unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-card hover:shadow-floating transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials