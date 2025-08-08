import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Check,
  X,
  Users,
  Clock
} from 'lucide-react';

const PartnerBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Mock data for bookings
  const bookings = [
    {
      id: 'BK001',
      groupName: 'Adventure Seekers',
      serviceName: 'Goa Beach Resort',
      serviceType: 'hotel',
      checkIn: '2024-01-15',
      checkOut: '2024-01-20',
      guests: 6,
      amount: 48000,
      status: 'pending',
      customerContact: 'john@example.com',
      phone: '+91 9876543210',
      specialRequests: 'Sea view rooms preferred'
    },
    {
      id: 'BK002',
      groupName: 'Family Vacation',
      serviceName: 'Mumbai to Delhi Flight',
      serviceType: 'flight',
      checkIn: '2024-01-18',
      checkOut: '2024-01-18',
      guests: 4,
      amount: 48000,
      status: 'confirmed',
      customerContact: 'sarah@example.com',
      phone: '+91 9876543211'
    },
    {
      id: 'BK003',
      groupName: 'Heritage Explorers',
      serviceName: 'Rajasthan Heritage Tour',
      serviceType: 'activity',
      checkIn: '2024-01-25',
      checkOut: '2024-01-30',
      guests: 8,
      amount: 200000,
      status: 'pending',
      customerContact: 'mike@example.com',
      phone: '+91 9876543212',
      specialRequests: 'Vegetarian meals only'
    },
    {
      id: 'BK004',
      groupName: 'Romantic Getaway',
      serviceName: 'Kashmir Houseboat',
      serviceType: 'hotel',
      checkIn: '2024-02-01',
      checkOut: '2024-02-05',
      guests: 2,
      amount: 30000,
      status: 'rejected',
      customerContact: 'lisa@example.com',
      phone: '+91 9876543213'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmBooking = (bookingId: string) => {
    console.log('Confirming booking:', bookingId);
    // Implementation would update booking status
  };

  const handleRejectBooking = (bookingId: string) => {
    console.log('Rejecting booking:', bookingId);
    // Implementation would update booking status
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-partner-primary text-partner-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Booking Management</h1>
              <p className="text-partner-primary-foreground/80 mt-1">
                Review and manage incoming bookings
              </p>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-partner-primary">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
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
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Guests</p>
                  <p className="text-2xl font-bold">20</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-partner-accent">₹3,26,000</p>
                </div>
                <Calendar className="h-8 w-8 text-partner-accent" />
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
                    placeholder="Search bookings..."
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Manage your incoming booking requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.groupName}</TableCell>
                    <TableCell>{booking.serviceName}</TableCell>
                    <TableCell>
                      {booking.checkIn} to {booking.checkOut}
                    </TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                              <DialogDescription>
                                Complete information for booking {selectedBooking?.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold">Contact Information</h4>
                                  <p>Email: {selectedBooking.customerContact}</p>
                                  <p>Phone: {selectedBooking.phone}</p>
                                </div>
                                {selectedBooking.specialRequests && (
                                  <div>
                                    <h4 className="font-semibold">Special Requests</h4>
                                    <p>{selectedBooking.specialRequests}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:bg-green-50"
                              onClick={() => handleConfirmBooking(booking.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleRejectBooking(booking.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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

export default PartnerBookings;