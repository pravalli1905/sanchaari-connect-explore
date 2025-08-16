import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/home/Hero"
import Features from "@/components/home/Features"
import Testimonials from "@/components/home/Testimonials"
import Home from "./Home"

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show logged-in homepage for authenticated users
  if (isAuthenticated) {
    return <Home />;
  }

  // Show marketing homepage for logged-out users
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      
      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/lovable-uploads/516a5d75-688a-4977-8145-75b378df61a9.png" 
                  alt="Sanchaari Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-white/80 max-w-md">
                Making group travel planning effortless and enjoyable for Indian travelers. 
                Start your next adventure with friends today!
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="/help-center" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Sanchaari. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
