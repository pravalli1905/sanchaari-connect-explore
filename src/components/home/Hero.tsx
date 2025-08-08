import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HeroButton } from "@/components/ui/hero-button"
import { Play, MessageCircle } from "lucide-react"
import heroImage from "@/assets/hero-image.jpg"

const Hero = () => {
  const [currentText, setCurrentText] = useState("")
  const fullText = "Explore More, Spend Less — Effortless Group Travel Planning"
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Group of friends traveling together in India" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          {currentText}
          <span className="animate-pulse">|</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
          Plan amazing group trips with AI assistance, real-time budgeting, and seamless collaboration
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/signup">
            <HeroButton variant="primary" className="btn-pulse min-w-[200px]">
              Get Started Free
            </HeroButton>
          </Link>
          <HeroButton variant="secondary" className="min-w-[200px] group">
            <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo
          </HeroButton>
        </div>

        {/* Floating Chat Bubble */}
        <div className="fixed bottom-6 right-6 z-50 animate-float">
          <div className="bg-gradient-to-r from-primary to-primary-hover text-white px-4 py-3 rounded-full shadow-floating flex items-center space-x-2 cursor-pointer hover:scale-110 transition-transform">
            <MessageCircle size={20} />
            <span className="font-medium">Chat with AI</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero