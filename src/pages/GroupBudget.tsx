import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertTriangle, Bell, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

const GroupBudget = () => {
  const { groupId } = useParams();
  const [autoAdjust, setAutoAdjust] = useState(false);
  const [totalBudget, setTotalBudget] = useState(150000);
  const [contributions, setContributions] = useState<Record<string, number>>({
    'member-1': 50000,
    'member-2': 50000,
    'member-3': 50000
  });

  const mockMembers = [
    { id: 'member-1', name: 'Rahul Sharma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { id: 'member-2', name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e2c144?w=40&h=40&fit=crop&crop=face' },
    { id: 'member-3', name: 'Arjun Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' }
  ];

  const currentTotal = Object.values(contributions).reduce((sum, amount) => sum + amount, 0);
  const budgetUsed = 75000; // Mock spent amount
  const budgetPercentage = Math.round((budgetUsed / currentTotal) * 100);
  const isOverBudget = currentTotal > totalBudget;

  const handleContributionChange = (memberId: string, amount: number) => {
    setContributions(prev => ({
      ...prev,
      [memberId]: amount
    }));
  };

  const handleAutoAdjust = () => {
    if (autoAdjust) {
      const perMemberAmount = Math.floor(totalBudget / mockMembers.length);
      const newContributions: { [key: string]: number } = {};
      mockMembers.forEach(member => {
        newContributions[member.id] = perMemberAmount;
      });
      setContributions(newContributions);
      toast.success('Contributions auto-adjusted equally');
    }
  };

  const handleSave = () => {
    toast.success('Budget settings saved successfully!');
  };

  const handleNotifyMembers = () => {
    toast.success('Budget update notifications sent to all members');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/groups/${groupId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Budget Management</h1>
              <p className="text-muted-foreground">Manage group expenses and contributions</p>
            </div>
          </div>

          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalBudget.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Target amount</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collected</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{currentTotal.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">From {mockMembers.length} members</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{budgetUsed.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{budgetPercentage}% of collected</p>
              </CardContent>
            </Card>
          </div>

          {/* Budget Alerts */}
          {isOverBudget && (
            <Alert className="mb-6 border-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Total contributions (₹{currentTotal.toLocaleString()}) exceed the target budget by ₹{(currentTotal - totalBudget).toLocaleString()}.
                Consider adjusting individual contributions.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Budget Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Settings</CardTitle>
                  <CardDescription>Configure the total budget and auto-adjustment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-budget">Total Budget Target</Label>
                    <Input
                      id="total-budget"
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number(e.target.value))}
                      placeholder="Enter total budget"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-adjust">Auto Adjust Contributions</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically split budget equally among members
                      </p>
                    </div>
                    <Switch
                      id="auto-adjust"
                      checked={autoAdjust}
                      onCheckedChange={(checked) => {
                        setAutoAdjust(checked);
                        if (checked) handleAutoAdjust();
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Member Contributions */}
              <Card>
                <CardHeader>
                  <CardTitle>Individual Contributions</CardTitle>
                  <CardDescription>Set how much each member contributes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`contribution-${member.id}`} className="text-sm font-medium">
                          {member.name}
                        </Label>
                        <Input
                          id={`contribution-${member.id}`}
                          type="number"
                          value={contributions[member.id]}
                          onChange={(e) => handleContributionChange(member.id, Number(e.target.value))}
                          className="mt-1"
                          placeholder="Amount"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Budget Visualization */}
            <div className="space-y-6">
              {/* Budget Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Usage</CardTitle>
                  <CardDescription>Current spending vs collected amount</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Spent</span>
                      <span>₹{budgetUsed.toLocaleString()} / ₹{currentTotal.toLocaleString()}</span>
                    </div>
                    <Progress value={budgetPercentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">₹{(currentTotal - budgetUsed).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-muted-foreground">{100 - budgetPercentage}%</p>
                      <p className="text-sm text-muted-foreground">Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Contribution Breakdown</CardTitle>
                  <CardDescription>Individual member contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMembers.map((member) => {
                      const memberContribution = contributions[member.id];
                      const percentage = Math.round((memberContribution / currentTotal) * 100);
                      
                      return (
                        <div key={member.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="flex items-center gap-2">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              {member.name}
                            </span>
                            <span>₹{memberContribution.toLocaleString()} ({percentage}%)</span>
                          </div>
                          <Progress value={percentage} className="h-1" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={handleNotifyMembers} variant="outline" className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Members of Budget Changes
                </Button>
                
                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Budget Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupBudget;