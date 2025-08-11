import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Bell, Plus, Users, Calendar, Mail, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/Navbar"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

const Dashboard = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [activeGroups, setActiveGroups] = useState<any[]>([])
  const [groupInvites, setGroupInvites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's groups
      const { data: userGroups, error: groupsError } = await supabase
        .from('groups')
        .select(`
          *,
          group_members!inner(
            role,
            status,
            user_id
          )
        `)
        .eq('group_members.user_id', user?.id)
        .eq('group_members.status', 'accepted')

      if (groupsError) throw groupsError

      // Fetch user notifications
      const { data: userNotifications, error: notificationsError } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (notificationsError) throw notificationsError

      // Fetch pending group invites
      const { data: pendingInvites, error: invitesError } = await supabase
        .from('group_members')
        .select(`
          *,
          groups(name)
        `)
        .eq('user_id', user?.id)
        .eq('status', 'pending')

      if (invitesError) throw invitesError

      setActiveGroups(userGroups || [])
      setNotifications(userNotifications || [])
      setGroupInvites(pendingInvites || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

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
                {groupInvites.length > 0 && (
                  <Badge variant="secondary">{groupInvites.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <p className="text-muted-foreground text-center py-4">Loading...</p>
              ) : groupInvites.length > 0 ? (
                groupInvites.map((invite) => (
                  <div key={invite.id} className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-card-foreground mb-2">{invite.groups?.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Pending invitation
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
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No pending invites
                </p>
              )}
            </CardContent>
          </Card>

          {/* Active Groups as Upcoming Trips */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="text-primary" size={24} />
                <span>Upcoming Trips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <p className="text-muted-foreground text-center py-4">Loading...</p>
              ) : activeGroups.filter(group => group.status === 'planning' || group.status === 'booked').slice(0, 3).map((group) => (
                <div key={group.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{group.destination || group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.start_date && group.end_date 
                        ? `${new Date(group.start_date).toLocaleDateString()} - ${new Date(group.end_date).toLocaleDateString()}`
                        : 'Planning stage'
                      }
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/groups/${group.id}`}>
                      View Details
                    </Link>
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