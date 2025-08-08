import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/layout/Navbar"

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  })
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [strengthText, setStrengthText] = useState("")

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    let text = "Very Weak"
    
    if (password.length >= 8) strength += 20
    if (password.match(/[a-z]/)) strength += 20
    if (password.match(/[A-Z]/)) strength += 20
    if (password.match(/[0-9]/)) strength += 20
    if (password.match(/[^a-zA-Z0-9]/)) strength += 20

    if (strength >= 80) text = "Very Strong"
    else if (strength >= 60) text = "Strong"
    else if (strength >= 40) text = "Medium"
    else if (strength >= 20) text = "Weak"

    return { strength, text }
  }

  const handleNewPasswordChange = (value: string) => {
    setPasswords({ ...passwords, new: value })
    const { strength, text } = calculatePasswordStrength(value)
    setPasswordStrength(strength)
    setStrengthText(text)
  }

  const getStrengthColor = () => {
    if (passwordStrength >= 80) return "bg-green-500"
    if (passwordStrength >= 60) return "bg-yellow-500"
    if (passwordStrength >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/profile">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to Profile
            </Button>
          </Link>
        </div>

        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-secondary">
              Change Password
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Update your password to keep your account secure
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <div className="relative">
                <Input
                  id="current"
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="input-sanchaari pr-10"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <div className="relative">
                <Input
                  id="new"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="input-sanchaari pr-10"
                  value={passwords.new}
                  onChange={(e) => handleNewPasswordChange(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              
              {/* Password Strength Meter */}
              {passwords.new && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Password Strength</span>
                    <span className={`font-medium ${
                      passwordStrength >= 80 ? 'text-green-600' :
                      passwordStrength >= 60 ? 'text-yellow-600' :
                      passwordStrength >= 40 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {strengthText}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="input-sanchaari pr-10"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              
              {/* Password Match Indicator */}
              {passwords.confirm && (
                <p className={`text-sm ${
                  passwords.new === passwords.confirm ? 'text-green-600' : 'text-red-600'
                }`}>
                  {passwords.new === passwords.confirm ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">Password Requirements:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Include at least one number</li>
                <li>• Include at least one special character</li>
              </ul>
            </div>

            {/* Update Button */}
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary-hover hover:scale-105 transition-transform text-lg py-3"
              disabled={
                !passwords.current || 
                !passwords.new || 
                !passwords.confirm || 
                passwords.new !== passwords.confirm ||
                passwordStrength < 60
              }
            >
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ChangePassword