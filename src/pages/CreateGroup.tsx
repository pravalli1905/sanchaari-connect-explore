import { useState } from "react"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, DollarSign, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/layout/Navbar"
import { Link } from "react-router-dom"

const CreateGroup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [groupData, setGroupData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    budgetPerPerson: "",
    members: [],
    tripType: "leisure",
    language: "english",
    budgetFlexible: false
  })

  const [memberEmail, setMemberEmail] = useState("")
  const [members, setMembers] = useState([
    { id: 1, email: "priya.sharma@email.com", name: "Priya Sharma" },
    { id: 2, email: "rahul.kumar@email.com", name: "Rahul Kumar" }
  ])

  const steps = [
    { id: 1, title: "Trip Details", icon: MapPin },
    { id: 2, title: "Members", icon: Users },
    { id: 3, title: "Preferences", icon: DollarSign },
    { id: 4, title: "Review", icon: Calendar }
  ]

  const addMember = () => {
    if (memberEmail && !members.find(m => m.email === memberEmail)) {
      const newMember = {
        id: Date.now(),
        email: memberEmail,
        name: memberEmail.split('@')[0].replace('.', ' ')
      }
      setMembers([...members, newMember])
      setMemberEmail("")
    }
  }

  const removeMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderTripDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin size={48} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-secondary">Trip Details</h2>
        <p className="text-muted-foreground">Let's start with the basics of your group trip</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="tripName">Trip Name</Label>
          <Input
            id="tripName"
            placeholder="e.g., Goa Beach Adventure 2024"
            className="input-sanchaari"
            value={groupData.name}
            onChange={(e) => setGroupData({...groupData, name: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="Where are you going?"
            className="input-sanchaari"
            value={groupData.destination}
            onChange={(e) => setGroupData({...groupData, destination: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget per Person (₹)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="10000"
            className="input-sanchaari"
            value={groupData.budgetPerPerson}
            onChange={(e) => setGroupData({...groupData, budgetPerPerson: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            className="input-sanchaari"
            value={groupData.startDate}
            onChange={(e) => setGroupData({...groupData, startDate: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            className="input-sanchaari"
            value={groupData.endDate}
            onChange={(e) => setGroupData({...groupData, endDate: e.target.value})}
          />
        </div>
      </div>
    </div>
  )

  const renderMembers = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Users size={48} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-secondary">Invite Members</h2>
        <p className="text-muted-foreground">Add friends and family to your group trip</p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter email address"
            className="input-sanchaari flex-1"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addMember()}
          />
          <Button 
            onClick={addMember}
            className="bg-gradient-to-r from-primary to-primary-hover"
          >
            <Plus size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Group Members ({members.length})</h3>
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeMember(member.id)}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <DollarSign size={48} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-secondary">Trip Preferences</h2>
        <p className="text-muted-foreground">Customize your group trip settings</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Trip Type</Label>
          <Select value={groupData.tripType} onValueChange={(value) => setGroupData({...groupData, tripType: value})}>
            <SelectTrigger className="input-sanchaari">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leisure">Leisure & Recreation</SelectItem>
              <SelectItem value="corporate">Corporate Team Building</SelectItem>
              <SelectItem value="family">Family Vacation</SelectItem>
              <SelectItem value="adventure">Adventure & Sports</SelectItem>
              <SelectItem value="cultural">Cultural & Heritage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Group Language</Label>
          <Select value={groupData.language} onValueChange={(value) => setGroupData({...groupData, language: value})}>
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

        <div className="flex items-center justify-between py-4 border border-border rounded-lg px-4">
          <div>
            <p className="font-medium">Budget Flexibility</p>
            <p className="text-sm text-muted-foreground">Allow budget adjustments during planning</p>
          </div>
          <Switch
            checked={groupData.budgetFlexible}
            onCheckedChange={(checked) => setGroupData({...groupData, budgetFlexible: checked})}
          />
        </div>
      </div>
    </div>
  )

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calendar size={48} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-secondary">Review & Create</h2>
        <p className="text-muted-foreground">Review your group trip details before creating</p>
      </div>

      <div className="grid gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" size={20} />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {groupData.name}</p>
            <p><strong>Destination:</strong> {groupData.destination}</p>
            <p><strong>Dates:</strong> {groupData.startDate} to {groupData.endDate}</p>
            <p><strong>Budget:</strong> ₹{groupData.budgetPerPerson} per person</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2" size={20} />
              Members ({members.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {members.map((member) => (
                <Badge key={member.id} variant="secondary" className="px-3 py-1">
                  {member.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2" size={20} />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Trip Type:</strong> {groupData.tripType}</p>
            <p><strong>Language:</strong> {groupData.language}</p>
            <p><strong>Budget Flexible:</strong> {groupData.budgetFlexible ? 'Yes' : 'No'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${
                  currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-r from-primary to-primary-hover text-white' 
                    : 'bg-muted'
                }`}>
                  <step.icon size={20} />
                </div>
                <span className="font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="card-elevated">
          <CardContent className="p-8">
            {currentStep === 1 && renderTripDetails()}
            {currentStep === 2 && renderMembers()}
            {currentStep === 3 && renderPreferences()}
            {currentStep === 4 && renderReview()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 mb-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-primary to-primary-hover px-6"
            >
              Next
              <ArrowRight className="ml-2" size={20} />
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-primary to-primary-hover px-6">
              Create Group
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateGroup