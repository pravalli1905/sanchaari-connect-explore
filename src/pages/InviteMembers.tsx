import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Plus, Copy, QrCode, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Navbar from "@/components/layout/Navbar"

const InviteMembers = () => {
  const { groupId } = useParams()
  const [emails, setEmails] = useState<string[]>([])
  const [phones, setPhones] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentPhone, setCurrentPhone] = useState("")
  const [inviteLink] = useState(`https://sanchaari.app/groups/${groupId}/join?token=abc123`)

  // Mock group data
  const groupData = {
    name: "Goa Beach Vibes",
    dates: "Dec 15-20, 2024",
    members: 8
  }

  const addEmail = () => {
    if (currentEmail && !emails.includes(currentEmail)) {
      setEmails([...emails, currentEmail])
      setCurrentEmail("")
    }
  }

  const addPhone = () => {
    if (currentPhone && !phones.includes(currentPhone)) {
      setPhones([...phones, currentPhone])
      setCurrentPhone("")
    }
  }

  const removeEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email))
  }

  const removePhone = (phone: string) => {
    setPhones(phones.filter(p => p !== phone))
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    toast.success("Invite link copied to clipboard!")
  }

  const sendInvites = () => {
    if (emails.length === 0 && phones.length === 0) {
      toast.error("Please add at least one email or phone number")
      return
    }
    
    toast.success(`Invites sent to ${emails.length + phones.length} contacts!`)
    setEmails([])
    setPhones([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to={`/groups/${groupId}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to {groupData.name}
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Invite Members</h1>
          <p className="text-muted-foreground">
            Invite friends to join "{groupData.name}" • {groupData.dates}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Invites */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send size={20} className="text-primary" />
                <span>Send Email Invites</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                    className="flex-1"
                  />
                  <Button onClick={addEmail} disabled={!currentEmail}>
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {emails.length > 0 && (
                <div className="space-y-2">
                  <Label>Email List ({emails.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {emails.map((email, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{email}</span>
                        <button onClick={() => removeEmail(email)}>
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Phone Invites */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send size={20} className="text-primary" />
                <span>Send SMS Invites</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex space-x-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={currentPhone}
                    onChange={(e) => setCurrentPhone(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPhone()}
                    className="flex-1"
                  />
                  <Button onClick={addPhone} disabled={!currentPhone}>
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {phones.length > 0 && (
                <div className="space-y-2">
                  <Label>Phone List ({phones.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {phones.map((phone, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{phone}</span>
                        <button onClick={() => removePhone(phone)}>
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invite Link */}
          <Card className="card-elevated lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode size={20} className="text-primary" />
                <span>Share Invite Link</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="flex-1 bg-muted"
                />
                <Button onClick={copyInviteLink} variant="outline">
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>
              </div>
              
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <QrCode size={64} className="text-muted-foreground" />
                </div>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                Scan QR code or share the link directly
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Send Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={sendInvites}
            className="bg-gradient-to-r from-primary to-primary-hover px-8 py-3 text-lg"
            disabled={emails.length === 0 && phones.length === 0}
          >
            <Send size={20} className="mr-2" />
            Send Invites ({emails.length + phones.length})
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InviteMembers