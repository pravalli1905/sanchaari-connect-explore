import { MessageCircle, Wallet, Users } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "AI Chatbot Planner",
    description: "Get personalized travel recommendations and instant planning assistance from our smart AI companion"
  },
  {
    icon: Wallet,
    title: "Real-Time Budgeting",
    description: "Track expenses, split costs, and manage group finances effortlessly with live budget updates"
  },
  {
    icon: Users,
    title: "Group Collaboration",
    description: "Seamlessly coordinate with friends, vote on destinations, and plan together in real-time"
  }
]

const Features = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Everything You Need for Perfect Group Travel
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From planning to execution, Sanchaari makes group travel planning effortless and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-feature group text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features