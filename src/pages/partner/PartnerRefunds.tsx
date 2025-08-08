import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DollarSign,
  Search,
  Clock,
  Check,
  X,
  AlertCircle,
  FileText
} from 'lucide-react';

const PartnerRefunds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [comments, setComments] = useState('');

  // Mock data for refunds
  const refunds = [
    {
      id: 'RF001',
      bookingId: 'BK001',
      groupName: 'Adventure Seekers',
      serviceName: 'Goa Beach Resort',
      requestDate: '2024-01-10',
      amount: 15000,
      reason: 'Medical emergency - unable to travel',
      status: 'pending',
      customerEmail: 'john@example.com',
      originalAmount: 48000
    },
    {
      id: 'RF002',
      bookingId: 'BK002',
      groupName: 'Family Vacation',
      serviceName: 'Mumbai to Delhi Flight',
      requestDate: '2024-01-08',
      amount: 24000,
      reason: 'Flight cancelled by airline',
      status: 'approved',
      customerEmail: 'sarah@example.com',
      originalAmount: 48000,
      processedDate: '2024-01-09'
    },
    {
      id: 'RF003',
      bookingId: 'BK003',
      groupName: 'Heritage Explorers',
      serviceName: 'Rajasthan Heritage Tour',
      requestDate: '2024-01-12',
      amount: 50000,
      reason: 'Unsatisfactory service quality',
      status: 'rejected',
      customerEmail: 'mike@example.com',
      originalAmount: 200000,
      rejectionReason: 'Service was provided as per agreement'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = refund.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         refund.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || refund.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApproveRefund = (refundId: string) => {
    console.log('Approving refund:', refundId, 'with comments:', comments);
    setComments('');
    // Implementation would update refund status
  };

  const handleRejectRefund = (refundId: string) => {
    console.log('Rejecting refund:', refundId, 'with comments:', comments);
    setComments('');
    // Implementation would update refund status
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-partner-primary text-partner-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Refund Management</h1>
              <p className="text-partner-primary-foreground/80 mt-1">
                Process customer refund requests
              </p>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-partner-primary">
              <FileText className="h-4 w-4 mr-2" />
              Refund Policy
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">1</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
                <X className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-partner-accent">₹89,000</p>
                </div>
                <DollarSign className="h-8 w-8 text-partner-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search refunds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Refunds Table */}
        <Card>
          <CardHeader>
            <CardTitle>Refund Requests</CardTitle>
            <CardDescription>
              Review and process customer refund requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Refund ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-medium">{refund.id}</TableCell>
                    <TableCell>{refund.bookingId}</TableCell>
                    <TableCell>{refund.groupName}</TableCell>
                    <TableCell>{refund.serviceName}</TableCell>
                    <TableCell>{refund.requestDate}</TableCell>
                    <TableCell>₹{refund.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(refund.status)}>
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedRefund(refund)}>
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Refund Request Details</DialogTitle>
                              <DialogDescription>
                                Review and process refund {selectedRefund?.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRefund && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold">Reason for Refund</h4>
                                  <p className="text-sm">{selectedRefund.reason}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Amount Details</h4>
                                  <p className="text-sm">Original: ₹{selectedRefund.originalAmount.toLocaleString()}</p>
                                  <p className="text-sm">Requested: ₹{selectedRefund.amount.toLocaleString()}</p>
                                </div>
                                {selectedRefund.status === 'pending' && (
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium">Comments</label>
                                      <Textarea
                                        placeholder="Add comments for the customer..."
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApproveRefund(selectedRefund.id)}
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() => handleRejectRefund(selectedRefund.id)}
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                {selectedRefund.status === 'rejected' && selectedRefund.rejectionReason && (
                                  <div>
                                    <h4 className="font-semibold">Rejection Reason</h4>
                                    <p className="text-sm">{selectedRefund.rejectionReason}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerRefunds;