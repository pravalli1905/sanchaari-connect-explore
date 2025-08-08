import { useState } from "react"
import { Camera, Save, User, CreditCard, Bell, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/layout/Navbar"

const Profile = () => {
  const [activeSection, setActiveSection] = useState("personal")
  const [profile, setProfile] = useState({
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  })

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: false,
    smsAlerts: true,
    groupInvites: true
  })

  const menuItems = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "language", label: "Language Preferences", icon: Globe }
  ]

  const paymentMethods = [
    { id: 1, type: "Visa", last4: "4532", expiry: "12/26" },
    { id: 2, type: "Mastercard", last4: "8901", expiry: "08/25" }
  ]

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-secondary">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="input-sanchaari"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="input-sanchaari"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            className="input-sanchaari"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={profile.city}
            onChange={(e) => setProfile({...profile, city: e.target.value})}
            className="input-sanchaari"
          />
        </div>
      </div>
    </div>
  )

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-secondary">Payment Methods</h2>
      
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="card-elevated">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-primary to-primary-hover rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {method.type === "Visa" ? "V" : "M"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">**** **** **** {method.last4}</p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Remove</Button>
            </CardContent>
          </Card>
        ))}
        
        <Button className="w-full bg-gradient-to-r from-primary to-primary-hover hover:scale-105 transition-transform">
          <CreditCard className="mr-2" size={20} />
          Add New Payment Method
        </Button>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-secondary">Notification Settings</h2>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </p>
              <p className="text-sm text-muted-foreground">
                {key === 'emailUpdates' && 'Receive trip updates via email'}
                {key === 'pushNotifications' && 'Get push notifications on your device'}
                {key === 'smsAlerts' && 'Receive important alerts via SMS'}
                {key === 'groupInvites' && 'Get notified about group invitations'}
              </p>
            </div>
            <Switch
              checked={value}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, [key]: checked})
              }
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderLanguage = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-secondary">Language Preferences</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Interface Language</Label>
          <Select defaultValue="english">
            <SelectTrigger className="input-sanchaari">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
              <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
              <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
              <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>AI Chatbot Language</Label>
          <Select defaultValue="english">
            <SelectTrigger className="input-sanchaari">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
              <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
              <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
              <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-elevated sticky top-24">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full w-8 h-8 bg-primary hover:bg-primary-hover"
                  >
                    <Camera size={16} />
                  </Button>
                </div>
                <h3 className="font-bold text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.email}</p>
              </CardHeader>
              
              <CardContent className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-primary to-primary-hover text-white" 
                        : ""
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className="mr-2" size={20} />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-elevated">
              <CardContent className="p-8">
                {activeSection === "personal" && renderPersonalInfo()}
                {activeSection === "payment" && renderPaymentMethods()}
                {activeSection === "notifications" && renderNotifications()}
                {activeSection === "language" && renderLanguage()}
                
                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-border mt-8">
                  <Button className="bg-gradient-to-r from-primary to-primary-hover hover:scale-105 transition-transform">
                    <Save className="mr-2" size={20} />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile