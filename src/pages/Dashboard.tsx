import { useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Plus, Users, Calendar, Mail, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/Navbar"

const Dashboard = () => {
  const [notifications] = useState([
    { id: 1, text: "Rahul added new photos to Goa Trip", time: "2 hours ago", unread: true },
    { id: 2, text: "Budget updated for Manali Adventure", time: "5 hours ago", unread: true },
    { id: 3, text: "New message in Kerala Backwaters group", time: "1 day ago", unread: false }
  ])

  const [invites] = useState([
    { id: 1, groupName: "Rajasthan Royal Tour", invitedBy: "Priya Sharma", members: 6 },
    { id: 2, groupName: "Mumbai Food Walk", invitedBy: "Arjun Patel", members: 4 }
  ])

  const [activeGroups] = useState([
    { id: 1, name: "Goa Beach Vibes", members: 8, image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop" },
    { id: 2, name: "Manali Adventure", members: 6, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop" },
    { id: 3, name: "Kerala Backwaters", members: 5, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=200&h=150&fit=crop" }
  ])

  const [upcomingTrips] = useState([
    { id: 1, destination: "Goa", date: "Dec 15-20, 2024", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop" },
    { id: 2, destination: "Manali", date: "Jan 5-10, 2025", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop" }
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome back, Traveler! 👋
                </h1>
                <p className="text-white/90 text-lg">
                  Ready to plan your next adventure?
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Users size={32} className="text-white" />
                </div>
                {notifications.filter(n => n.unread).length > 0 && (
                  <Badge className="bg-white text-primary">
                    {notifications.filter(n => n.unread).length} new
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Groups */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="text-primary" size={24} />
                <span>Active Groups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
                    Open
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Invites */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="text-primary" size={24} />
                <span>Pending Invites</span>
                {invites.length > 0 && (
                  <Badge variant="secondary">{invites.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invites.map((invite) => (
                <div key={invite.id} className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold text-card-foreground mb-2">{invite.groupName}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Invited by {invite.invitedBy} • {invite.members} members
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
                      <CheckCircle size={16} className="mr-1" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      <X size={16} className="mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
              {invites.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No pending invites
                </p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Trips */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="text-primary" size={24} />
                <span>Upcoming Trips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{trip.destination}</h3>
                    <p className="text-sm text-muted-foreground">{trip.date}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="text-primary" size={24} />
                <span>Notifications</span>
                {notifications.filter(n => n.unread).length > 0 && (
                  <Badge variant="destructive">
                    {notifications.filter(n => n.unread).length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.unread ? 'bg-primary/5 border-l-4 border-primary' : 'bg-muted'
                  }`}
                >
                  <p className="text-sm text-card-foreground">{notification.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Floating Action Button */}
        <Link to="/groups/new">
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-gradient-to-r from-primary to-primary-hover shadow-floating hover:scale-110 transition-transform"
            >
              <Plus size={24} />
            </Button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard