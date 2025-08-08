import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Users, 
  MapPin, 
  Calendar, 
  Plane, 
  TrendingUp,
  Bell,
  Settings,
  Star,
  Activity
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Create New Group",
      description: "Start planning your next adventure",
      icon: Plus,
      href: "/groups/new",
      color: "bg-primary",
      textColor: "text-white"
    },
    {
      title: "View Dashboard",
      description: "See all your trips and activities",
      icon: Activity,
      href: "/dashboard",
      color: "bg-secondary",
      textColor: "text-white"
    },
    {
      title: "Group Invites",
      description: "Check pending invitations",
      icon: Users,
      href: "/groups/invites",
      color: "bg-accent",
      textColor: "text-accent-foreground"
    },
    {
      title: "Profile Settings",
      description: "Update your preferences",
      icon: Settings,
      href: "/profile",
      color: "bg-muted",
      textColor: "text-muted-foreground"
    }
  ];

  const recentActivity = [
    {
      type: "group_created",
      message: "You created a new group 'Goa Beach Trip'",
      time: "2 hours ago",
      icon: Users
    },
    {
      type: "invitation",
      message: "Rahul invited you to 'Manali Adventure'",
      time: "1 day ago",
      icon: Bell
    },
    {
      type: "booking",
      message: "Flight booking confirmed for 'Kerala Backwaters'",
      time: "3 days ago",
      icon: Plane
    }
  ];

  const upcomingTrips = [
    {
      destination: "Goa",
      dates: "Dec 25-30, 2024",
      members: 6,
      status: "Planning",
      image: "🏖️"
    },
    {
      destination: "Manali",
      dates: "Jan 15-20, 2025",
      members: 4,
      status: "Booked",
      image: "🏔️"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}! 👋
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to plan your next adventure? Manage your trips, connect with friends, and explore amazing destinations.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${action.color} ${action.textColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Upcoming Trips */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Upcoming Trips
                  </CardTitle>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {upcomingTrips.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingTrips.map((trip, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{trip.image}</div>
                            <div>
                              <h4 className="font-semibold">{trip.destination}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {trip.dates}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {trip.members} members
                              </p>
                            </div>
                          </div>
                          <Badge variant={trip.status === 'Booked' ? 'default' : 'secondary'}>
                            {trip.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">No upcoming trips</h3>
                      <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
                      <Link to="/groups/new">
                        <Button>Create New Group</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <activity.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Your Travel Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">5</div>
                      <div className="text-xs text-muted-foreground">Groups Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">12</div>
                      <div className="text-xs text-muted-foreground">Trips Planned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">8</div>
                      <div className="text-xs text-muted-foreground">Cities Visited</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">24</div>
                      <div className="text-xs text-muted-foreground">Friends Connected</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-2xl font-bold">Sanchaari</span>
              </div>
              <p className="text-white/80 max-w-md">
                Making group travel planning effortless and enjoyable for Indian travelers. 
                Continue your adventure with friends!
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/groups/new" className="hover:text-white transition-colors">Create Group</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/profile" className="hover:text-white transition-colors">Profile</Link></li>
                <li><Link to="/notifications" className="hover:text-white transition-colors">Notifications</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/language" className="hover:text-white transition-colors">Language</Link></li>
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

export default Home;