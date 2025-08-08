import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Check, X, Eye, AlertTriangle, RefreshCw, DollarSign, Clock } from 'lucide-react';

const AdminRefunds = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [comments, setComments] = useState('');

  const [refunds, setRefunds] = useState([
    {
      id: 'RF001',
      bookingRef: 'BK001',
      userEmail: 'rahul@email.com',
      groupName: 'Mumbai Adventure Group',
      amount: 25000,
      reason: 'Medical emergency - unable to travel',
      status: 'Pending',
      requestDate: '2024-01-20',
      service: 'Hotel Booking',
      priority: 'High'
    },
    {
      id: 'RF002',
      bookingRef: 'BK004',
      userEmail: 'priya@email.com',
      groupName: 'College Friends Trip',
      amount: 15000,
      reason: 'Flight cancellation by airline',
      status: 'Approved',
      requestDate: '2024-01-18',
      processedDate: '2024-01-19',
      service: 'Flight Booking',
      priority: 'Medium'
    },
    {
      id: 'RF003',
      bookingRef: 'BK007',
      userEmail: 'amit@email.com',
      groupName: 'Family Vacation',
      amount: 8500,
      reason: 'Hotel overbooked, no alternative provided',
      status: 'Rejected',
      requestDate: '2024-01-15',
      processedDate: '2024-01-16',
      service: 'Hotel Booking',
      priority: 'Low',
      adminComments: 'Booking was within 24 hours, non-refundable policy applies'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (refundId: string) => {
    setRefunds(prev => prev.map(refund => 
      refund.id === refundId 
        ? { 
            ...refund, 
            status: 'Approved', 
            processedDate: new Date().toISOString().split('T')[0],
            adminComments: comments
          }
        : refund
    ));
    setComments('');
    setSelectedRefund(null);
  };

  const handleReject = (refundId: string) => {
    setRefunds(prev => prev.map(refund => 
      refund.id === refundId 
        ? { 
            ...refund, 
            status: 'Rejected', 
            processedDate: new Date().toISOString().split('T')[0],
            adminComments: comments
          }
        : refund
    ));
    setComments('');
    setSelectedRefund(null);
  };

  const pendingRefunds = refunds.filter(r => r.status === 'Pending');
  const totalPendingAmount = pendingRefunds.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminNavbar onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Refund & Cancellation Management</h1>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Requests</p>
                      <p className="text-3xl font-bold text-yellow-600">{pendingRefunds.length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Amount</p>
                      <p className="text-3xl font-bold text-orange-600">₹{(totalPendingAmount / 1000).toFixed(0)}K</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Approved Today</p>
                      <p className="text-3xl font-bold text-green-600">5</p>
                    </div>
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">High Priority</p>
                      <p className="text-3xl font-bold text-red-600">
                        {refunds.filter(r => r.priority === 'High' && r.status === 'Pending').length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Refunds Table */}
            <Card>
              <CardHeader>
                <CardTitle>Refund Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Refund ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {refunds.map((refund) => (
                        <TableRow key={refund.id}>
                          <TableCell className="font-medium">{refund.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{refund.groupName}</p>
                              <p className="text-sm text-gray-600">{refund.userEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">₹{refund.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(refund.status)}>
                              {refund.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(refund.priority)}>
                              {refund.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{refund.requestDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Refund Request Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="font-semibold">Refund ID:</label>
                                        <p>{refund.id}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Booking Reference:</label>
                                        <p>{refund.bookingRef}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Service Type:</label>
                                        <p>{refund.service}</p>
                                      </div>
                                      <div>
                                        <label className="font-semibold">Amount:</label>
                                        <p className="font-bold">₹{refund.amount.toLocaleString()}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="font-semibold">Reason for Cancellation:</label>
                                      <p className="mt-1 p-3 bg-gray-50 rounded-lg">{refund.reason}</p>
                                    </div>
                                    {refund.adminComments && (
                                      <div>
                                        <label className="font-semibold">Admin Comments:</label>
                                        <p className="mt-1 p-3 bg-gray-50 rounded-lg">{refund.adminComments}</p>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>

                              {refund.status === 'Pending' && (
                                <>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => setSelectedRefund(refund)}
                                      >
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Approve Refund</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <p>Approve refund of ₹{refund.amount.toLocaleString()} for {refund.groupName}?</p>
                                        <Textarea
                                          placeholder="Add comments (optional)"
                                          value={comments}
                                          onChange={(e) => setComments(e.target.value)}
                                        />
                                        <div className="flex space-x-3">
                                          <Button onClick={() => handleApprove(refund.id)}>
                                            Approve Refund
                                          </Button>
                                          <Button variant="outline" onClick={() => setSelectedRefund(null)}>
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => setSelectedRefund(refund)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Reject Refund</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <p>Reject refund request for {refund.groupName}?</p>
                                        <Textarea
                                          placeholder="Reason for rejection (required)"
                                          value={comments}
                                          onChange={(e) => setComments(e.target.value)}
                                          required
                                        />
                                        <div className="flex space-x-3">
                                          <Button 
                                            variant="destructive"
                                            onClick={() => handleReject(refund.id)}
                                            disabled={!comments.trim()}
                                          >
                                            Reject Refund
                                          </Button>
                                          <Button variant="outline" onClick={() => setSelectedRefund(null)}>
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRefunds;