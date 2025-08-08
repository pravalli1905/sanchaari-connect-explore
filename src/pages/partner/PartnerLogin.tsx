import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePartnerAuth } from '@/contexts/PartnerAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const PartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = usePartnerAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const { error } = await login(email, password);
    setIsLoading(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Login successful!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-partner-primary to-partner-primary/80 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sanchaari Partners</h1>
          <p className="text-partner-primary-foreground/80">Welcome back to your business portal</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Partner Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your partner dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="partner@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link 
                  to="/partner/forgot-password" 
                  className="text-sm text-partner-accent hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-partner-primary hover:bg-partner-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need an account?{' '}
                <Link 
                  to="/partner/register" 
                  className="text-partner-accent font-medium hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-partner-primary-foreground/60">
          <Link to="/partner/terms" className="hover:underline mr-4">
            Terms & Conditions
          </Link>
          <Link to="/partner/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;