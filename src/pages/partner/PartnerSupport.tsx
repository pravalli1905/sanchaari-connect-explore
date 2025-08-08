import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, Phone, Mail, FileText, Search, Send } from 'lucide-react';

const PartnerSupport = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium');

  const tickets = [
    { id: 'T001', subject: 'Payment processing issue', status: 'open', priority: 'high', date: '2024-01-15' },
    { id: 'T002', subject: 'Service listing approval', status: 'resolved', priority: 'medium', date: '2024-01-12' }
  ];

  const faqs = [
    { question: 'How do I add a new service?', answer: 'Go to Service Management and click "Add New Service" to create listings.' },
    { question: 'When do I receive payments?', answer: 'Payments are processed within 7 business days after service completion.' },
    { question: 'How can I update my profile?', answer: 'Visit Profile Management to update company information and banking details.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-partner-primary text-partner-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-partner-primary-foreground/80 mt-1">Get help and support for your partner account</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-3 text-partner-primary" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">Chat with our support team</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-3 text-partner-primary" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Call us at +91 1800-123-456</p>
              <Button variant="outline" className="w-full">Request Callback</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-partner-primary" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">partners@sanchaari.com</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Support Ticket</CardTitle>
            <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Subject" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} />
            <Select value={ticketPriority} onValueChange={setTicketPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Describe your issue..." value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)} rows={4} />
            <Button className="bg-partner-primary hover:bg-partner-primary/90">
              <Send className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerSupport;