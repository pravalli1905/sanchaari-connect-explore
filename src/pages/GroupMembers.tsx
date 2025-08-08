import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserMinus, RefreshCw, Send, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'sonner';

const GroupMembers = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [dropoutReason, setDropoutReason] = useState('');
  const [showReplanDialog, setShowReplanDialog] = useState(false);

  const mockMembers = [
    {
      id: 'member-1',
      name: 'Rahul Sharma',
      email: 'rahul.s***@gmail.com',
      phone: '+91 98765***21',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinedAt: '2024-01-15',
      role: 'admin'
    },
    {
      id: 'member-2',
      name: 'Priya Patel',
      email: 'priya.p***@yahoo.com',
      phone: '+91 87654***32',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e2c144?w=80&h=80&fit=crop&crop=face',
      status: 'active',
      joinedAt: '2024-01-16',
      role: 'member'
    },
    {
      id: 'member-3',
      name: 'Arjun Kumar',
      email: 'arjun.k***@hotmail.com',
      phone: '+91 76543***43',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      status: 'inactive',
      joinedAt: '2024-01-17',
      role: 'member',
      dropoutReason: 'Work commitments changed'
    },
    {
      id: 'member-4',
      name: 'Sneha Reddy',
      email: 'sneha.r***@gmail.com',
      phone: '+91 65432***54',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      status: 'dropped_out',
      joinedAt: '2024-01-18',
      role: 'member',
      dropoutReason: 'Budget constraints'
    }
  ];

  const [members, setMembers] = useState(mockMembers);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'dropped_out': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Clock className="h-4 w-4" />;
      case 'dropped_out': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleStatusChange = (memberId: string, newStatus: string) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, status: newStatus, dropoutReason: newStatus === 'dropped_out' ? dropoutReason : undefined }
        : member
    ));
    
    if (newStatus === 'dropped_out') {
      setShowReplanDialog(true);
    }
    
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
    toast.success('Member removed from group');
  };

  const handleSendReminder = (memberName: string) => {
    toast.success(`Reminder sent to ${memberName}`);
  };

  const handleReplan = () => {
    setShowReplanDialog(false);
    toast.success('Trip replanning initiated');
    // SPA navigation (no full reload)
    navigate(`/groups/${groupId}/replan-status`);
  };

  const activeMembers = members.filter(m => m.status === 'active').length;
  const droppedOutMembers = members.filter(m => m.status === 'dropped_out').length;

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
              <h1 className="text-3xl font-bold">Group Members</h1>
              <p className="text-muted-foreground">Manage member status and handle dropouts</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{activeMembers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{members.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dropouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{droppedOutMembers}</div>
              </CardContent>
            </Card>
          </div>

          {/* Dropout Alert */}
          {droppedOutMembers > 0 && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {droppedOutMembers} member(s) have dropped out. Consider replanning the trip to adjust for the changes.
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-4"
                  onClick={() => setShowReplanDialog(true)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Replan Trip
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>View and manage all group members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{member.name}</h3>
                          {member.role === 'admin' && (
                            <Badge variant="secondary">Admin</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-sm text-muted-foreground">{member.phone}</p>
                        {member.dropoutReason && (
                          <p className="text-sm text-red-600 mt-1">
                            Reason: {member.dropoutReason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(member.status)}>
                        {getStatusIcon(member.status)}
                        <span className="ml-1 capitalize">{member.status.replace('_', ' ')}</span>
                      </Badge>

                      {member.role !== 'admin' && (
                        <div className="flex gap-2">
                          <Select
                            value={member.status}
                            onValueChange={(value) => {
                              setSelectedMember(member.id);
                              handleStatusChange(member.id, value);
                            }}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="dropped_out">Dropped Out</SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendReminder(member.name)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <UserMinus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Remove Member</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to remove {member.name} from the group? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleRemoveMember(member.id)}
                                >
                                  Remove Member
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Replan Dialog */}
          <Dialog open={showReplanDialog} onOpenChange={setShowReplanDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Replan Trip</DialogTitle>
                <DialogDescription>
                  Member changes detected. Would you like to automatically replan the trip to optimize for the current group?
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dropout-reason">Reason for dropout (optional)</Label>
                  <Textarea
                    id="dropout-reason"
                    placeholder="Add a note about why this member left..."
                    value={dropoutReason}
                    onChange={(e) => setDropoutReason(e.target.value)}
                  />
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Replanning will adjust the itinerary and budget based on the current active members.
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReplanDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReplan}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start Replanning
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default GroupMembers;
