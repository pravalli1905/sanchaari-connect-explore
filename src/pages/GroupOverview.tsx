import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { 
  ArrowLeft, Users, Calendar, DollarSign, MapPin, MessageCircle, 
  CreditCard, Plus, Edit, Settings, CheckCircle, Clock, Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/layout/Navbar"

const GroupOverview = () => {
  const { groupId } = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock group data
  const groupData = {
    id: groupId,
    name: "Goa Beach Adventure 2024",
    destination: "Goa, India",
    startDate: "2024-12-15",
    endDate: "2024-12-20",
    status: "planning",
    totalBudget: 80000,
    spentAmount: 25000,
    budgetPerPerson: 10000,
    members: [
      { id: 1, name: "Arjun Sharma", email: "arjun@email.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", role: "admin" },
      { id: 2, name: "Priya Patel", email: "priya@email.com", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face", role: "member" },
      { id: 3, name: "Rahul Kumar", email: "rahul@email.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", role: "member" },
      { id: 4, name: "Sneha Reddy", email: "sneha@email.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", role: "member" },
    ]
  }

  const milestones = [
    { id: 1, title: "Group Created", completed: true, date: "Nov 20" },
    { id: 2, title: "Members Invited", completed: true, date: "Nov 22" },
    { id: 3, title: "Destination Finalized", completed: true, date: "Nov 25" },
    { id: 4, title: "Accommodation Booked", completed: false, date: "Dec 1" },
    { id: 5, title: "Transport Arranged", completed: false, date: "Dec 5" },
    { id: 6, title: "Activities Planned", completed: false, date: "Dec 10" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "planning": return "bg-blue-100 text-blue-800"
      case "booked": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Star size={16} />
      case "planning": return <Clock size={16} />
      case "booked": return <CheckCircle size={16} />
      default: return <Calendar size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Group Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">{groupData.name}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {groupData.destination}
                </span>
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {groupData.startDate} to {groupData.endDate}
                </span>
              </div>
            </div>
            <Badge className={`flex items-center space-x-1 ${getStatusColor(groupData.status)}`}>
              {getStatusIcon(groupData.status)}
              <span className="capitalize">{groupData.status}</span>
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Members & Timeline */}
              <div className="lg:col-span-2 space-y-6">
                {/* Members Card */}
                <Card className="card-elevated">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Users className="mr-2" size={20} />
                      Group Members ({groupData.members.length})
                    </CardTitle>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
                      <Plus size={16} className="mr-1" />
                      Add Member
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {groupData.members.map((member) => (
                        <div key={member.id} className="text-center group cursor-pointer">
                          <Avatar className="mx-auto mb-2 group-hover:scale-110 transition-transform">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-sm">{member.name}</p>
                          <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trip Timeline */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2" size={20} />
                      Trip Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones.map((milestone, index) => (
                        <div key={milestone.id} className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-gradient-to-r from-primary to-primary-hover text-white' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {milestone.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {milestone.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{milestone.date}</p>
                          </div>
                          {index < milestones.length - 1 && (
                            <div className="absolute left-4 mt-8 w-0.5 h-6 bg-border"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Budget & Actions */}
              <div className="space-y-6">
                {/* Budget Overview */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="mr-2" size={20} />
                      Budget Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Total Budget</span>
                        <span className="font-medium">₹{groupData.totalBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Spent</span>
                        <span className="font-medium text-red-600">₹{groupData.spentAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span>Remaining</span>
                        <span className="font-medium text-green-600">
                          ₹{(groupData.totalBudget - groupData.spentAmount).toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={(groupData.spentAmount / groupData.totalBudget) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground">Per Person Budget</p>
                      <p className="text-lg font-bold text-primary">₹{groupData.budgetPerPerson.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary-hover justify-start">
                      <Edit className="mr-2" size={16} />
                      Edit Trip Details
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2" size={16} />
                      Group Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="mr-2" size={16} />
                      Start Booking
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <Card className="card-elevated">
              <CardContent className="p-8 text-center">
                <Calendar size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Itinerary Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Plan your daily activities and create the perfect itinerary for your group trip.
                </p>
                <Button className="bg-gradient-to-r from-primary to-primary-hover">
                  Create Itinerary
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="card-elevated">
              <CardContent className="p-8 text-center">
                <MessageCircle size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Group Chat</h3>
                <p className="text-muted-foreground mb-4">
                  Communicate with your group members and plan together in real-time.
                </p>
                <Button className="bg-gradient-to-r from-primary to-primary-hover">
                  Start Chatting
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="card-elevated">
              <CardContent className="p-8 text-center">
                <CreditCard size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment Management</h3>
                <p className="text-muted-foreground mb-4">
                  Track expenses, split bills, and manage group payments seamlessly.
                </p>
                <Button className="bg-gradient-to-r from-primary to-primary-hover">
                  Manage Payments
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default GroupOverview