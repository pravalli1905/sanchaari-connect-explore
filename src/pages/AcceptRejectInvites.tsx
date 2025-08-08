import { useState } from "react"
import { Link } from "react-router-dom"
import { Check, X, Users, Calendar, User, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Navbar from "@/components/layout/Navbar"

const AcceptRejectInvites = () => {
  const [invites, setInvites] = useState([
    {
      id: 1,
      groupName: "Rajasthan Royal Tour",
      dates: "Jan 15-22, 2025",
      invitedBy: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      members: 8,
      budget: "₹25,000 per person",
      destination: "Jaipur, Udaipur, Jodhpur"
    },
    {
      id: 2,
      groupName: "Mumbai Food Walk",
      dates: "Feb 5-7, 2025",
      invitedBy: {
        name: "Arjun Patel",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      members: 6,
      budget: "₹8,000 per person",
      destination: "Mumbai Street Food Tour"
    },
    {
      id: 3,
      groupName: "Kerala Backwaters",
      dates: "Mar 10-15, 2025",
      invitedBy: {
        name: "Sneha Menon",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      members: 5,
      budget: "₹18,000 per person",
      destination: "Alleppey, Kumarakom"
    }
  ])
  
  const [recentlyRemoved, setRecentlyRemoved] = useState<typeof invites[0] | null>(null)
  const [undoTimeout, setUndoTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleAccept = (inviteId: number) => {
    const invite = invites.find(inv => inv.id === inviteId)
    if (invite) {
      setInvites(invites.filter(inv => inv.id !== inviteId))
      toast.success(`Joined ${invite.groupName}! Redirecting to group...`)
      // In real app: navigate(`/groups/${invite.groupId}`)
    }
  }

  const handleReject = (inviteId: number) => {
    const invite = invites.find(inv => inv.id === inviteId)
    if (invite) {
      setInvites(invites.filter(inv => inv.id !== inviteId))
      setRecentlyRemoved(invite)
      
      // Clear any existing timeout
      if (undoTimeout) {
        clearTimeout(undoTimeout)
      }
      
      // Set 10-second undo timeout
      const timeout = setTimeout(() => {
        setRecentlyRemoved(null)
      }, 10000)
      setUndoTimeout(timeout)
      
      toast.success(`Declined ${invite.groupName}`, {
        action: {
          label: "Undo",
          onClick: () => handleUndo()
        }
      })
    }
  }

  const handleUndo = () => {
    if (recentlyRemoved) {
      setInvites([...invites, recentlyRemoved])
      setRecentlyRemoved(null)
      if (undoTimeout) {
        clearTimeout(undoTimeout)
        setUndoTimeout(null)
      }
      toast.success("Invite restored!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Group Invitations</h1>
          <p className="text-muted-foreground">
            You have {invites.length} pending group {invites.length === 1 ? 'invitation' : 'invitations'}
          </p>
        </div>

        {/* Invites List */}
        <div className="space-y-6">
          {invites.length === 0 ? (
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <Users size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Pending Invites</h3>
                <p className="text-muted-foreground mb-4">
                  You're all caught up! No new group invitations at the moment.
                </p>
                <Link to="/dashboard">
                  <Button variant="outline">
                    Back to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            invites.map((invite) => (
              <Card key={invite.id} className="card-elevated hover:shadow-floating transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={invite.invitedBy.avatar}
                        alt={invite.invitedBy.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-xl text-foreground">{invite.groupName}</CardTitle>
                        <p className="text-muted-foreground">
                          Invited by {invite.invitedBy.name}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{invite.members} members</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Trip Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-sm text-foreground">{invite.dates}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-primary" />
                      <span className="text-sm text-foreground">{invite.budget}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-primary" />
                      <span className="text-sm text-foreground">{invite.destination}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button 
                      onClick={() => handleAccept(invite.id)}
                      className="flex-1 bg-gradient-to-r from-primary to-primary-hover"
                    >
                      <Check size={16} className="mr-2" />
                      Accept Invitation
                    </Button>
                    <Button 
                      onClick={() => handleReject(invite.id)}
                      variant="outline"
                      className="flex-1 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X size={16} className="mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Undo Notification */}
        {recentlyRemoved && (
          <Card className="fixed bottom-6 right-6 w-80 bg-card border-l-4 border-l-destructive shadow-floating animate-slide-in-right">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Invitation Declined</p>
                  <p className="text-sm text-muted-foreground">{recentlyRemoved.groupName}</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleUndo}>
                  <Undo size={14} className="mr-1" />
                  Undo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AcceptRejectInvites