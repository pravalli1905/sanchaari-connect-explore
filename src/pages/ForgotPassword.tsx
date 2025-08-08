import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-elevated">
          <CardContent className="text-center space-y-6 pt-8">
            <div className="flex justify-center">
              <CheckCircle size={48} className="text-success" />
            </div>
            <h1 className="text-2xl font-bold text-secondary">
              Check your email
            </h1>
            <p className="text-muted-foreground">
              We've sent a password reset link to {email}
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full"
            >
              Resend Email
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft size={16} className="mr-2" />
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-elevated">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-secondary">
            Reset Your Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email and we'll send you a link to reset your password
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email or Mobile</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email or mobile"
              className="input-sanchaari"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-primary to-primary-hover hover:scale-105 transition-transform text-lg py-3"
            disabled={!email}
          >
            Send Reset Link
          </Button>

          <Link to="/login">
            <Button variant="ghost" className="w-full">
              <ArrowLeft size={16} className="mr-2" />
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword