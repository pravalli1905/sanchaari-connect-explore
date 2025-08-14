import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, User, LogOut, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/516a5d75-688a-4977-8145-75b378df61a9.png" 
              alt="Sanchaari Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Center navigation - show marketing nav for logged-out users, app nav for logged-in */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
                <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How it Works</a>
                <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
                <a href="#blog" className="text-foreground hover:text-primary transition-colors">Blog</a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              </>
            ) : (
              <>
                <Link to="/" className={`text-foreground hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary font-medium' : ''}`}>
                  Home
                </Link>
                <Link to="/dashboard" className={`text-foreground hover:text-primary transition-colors ${location.pathname === '/dashboard' ? 'text-primary font-medium' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/groups/new" className="text-foreground hover:text-primary transition-colors">
                  Create Group
                </Link>
              </>
            )}
          </div>

          {/* Right side - Auth-dependent content */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/language">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                EN
              </Button>
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <User size={14} />
                      )}
                    </div>
                    <span className="max-w-20 truncate">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <Users size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/groups/invites" className="flex items-center space-x-2">
                      <Users size={16} />
                      <span>Group Invites</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/change-password" className="flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center space-x-2 text-destructive cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-4">
              {!isAuthenticated ? (
                <>
                  <a href="#features" className="block text-foreground hover:text-primary transition-colors">Features</a>
                  <a href="#how-it-works" className="block text-foreground hover:text-primary transition-colors">How it Works</a>
                  <a href="#pricing" className="block text-foreground hover:text-primary transition-colors">Pricing</a>
                  <a href="#blog" className="block text-foreground hover:text-primary transition-colors">Blog</a>
                  <a href="#contact" className="block text-foreground hover:text-primary transition-colors">Contact</a>
                  <div className="pt-4 border-t border-border space-y-2">
                    <Link to="/language" className="block text-foreground hover:text-primary transition-colors">
                      Language (EN)
                    </Link>
                    <Link to="/login" className="block text-foreground hover:text-primary transition-colors">
                      Login
                    </Link>
                    <Link to="/signup" className="block text-primary font-medium">
                      Sign Up
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/" className="block text-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link to="/dashboard" className="block text-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/groups/new" className="block text-foreground hover:text-primary transition-colors">
                    Create Group
                  </Link>
                  <div className="pt-4 border-t border-border space-y-2">
                    <Link to="/language" className="block text-foreground hover:text-primary transition-colors">
                      Language (EN)
                    </Link>
                    <Link to="/profile" className="block text-foreground hover:text-primary transition-colors">
                      Profile
                    </Link>
                    <div 
                      className="block text-destructive cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar