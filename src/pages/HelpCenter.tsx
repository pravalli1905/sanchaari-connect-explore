import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Phone, Mail } from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'booking',
      name: 'Booking & Payments',
      count: 12,
      faqs: [
        {
          question: 'How do I book a trip with my group?',
          answer: 'To book a trip, create a group, invite members, plan your itinerary together, and proceed to booking when everyone has confirmed their participation.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept UPI, credit/debit cards, net banking, and popular digital wallets like Paytm and PhonePe.'
        },
        {
          question: 'Can I get a refund if I cancel my booking?',
          answer: 'Refund eligibility depends on the cancellation policy of each service provider. You can check refund percentages in your booking details.'
        }
      ]
    },
    {
      id: 'groups',
      name: 'Group Management',
      count: 8,
      faqs: [
        {
          question: 'How do I invite members to my group?',
          answer: 'Go to your group page and click "Invite Members". You can send invitations via email, phone, or share an invite link.'
        },
        {
          question: 'What happens if a member drops out?',
          answer: 'When a member drops out, you can use our automatic replanning feature to adjust your itinerary and budget for the remaining group.'
        },
        {
          question: 'Can I change group settings after creation?',
          answer: 'Yes, group admins can modify trip details, manage member permissions, and update preferences at any time.'
        }
      ]
    },
    {
      id: 'itinerary',
      name: 'Itinerary Planning',
      count: 6,
      faqs: [
        {
          question: 'How does the AI itinerary planner work?',
          answer: 'Our AI analyzes your group preferences, budget, and destination to suggest personalized activities, accommodations, and routes.'
        },
        {
          question: 'Can I modify the suggested itinerary?',
          answer: 'Absolutely! You can edit, add, or remove activities from your itinerary. Changes are synced with all group members in real-time.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Profile',
      count: 5,
      faqs: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Profile > Change Password or use the "Forgot Password" link on the login page to reset your password.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Visit your Profile page to update your name, email, phone number, and travel preferences.'
        }
      ]
    }
  ];

  const allFaqs = categories.flatMap(cat => 
    cat.faqs.map(faq => ({ ...faq, category: cat.name }))
  );

  const filteredFaqs = searchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
            <p className="text-muted-foreground mb-6">
              Find answers to common questions or get in touch with our support team
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {searchQuery ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                Search Results ({filteredFaqs.length})
              </h2>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <Card key={index}>
                      <AccordionItem value={`search-${index}`} className="border-none">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="text-left">
                            <div className="font-medium">{faq.question}</div>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {faq.category}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
                </Accordion>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try different keywords or browse categories below
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>
                            Common questions and answers
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {category.count} articles
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {category.faqs.slice(0, 2).map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left text-sm hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      {category.faqs.length > 2 && (
                        <Button variant="link" className="p-0 h-auto text-primary">
                          View all {category.count} articles →
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Still need help?</CardTitle>
                  <CardDescription>
                    Can't find what you're looking for? Get in touch with our support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                      <MessageCircle className="h-8 w-8 mb-2" />
                      <span className="font-medium">Live Chat</span>
                      <span className="text-sm text-muted-foreground">Available 24/7</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                      <Phone className="h-8 w-8 mb-2" />
                      <span className="font-medium">Call Support</span>
                      <span className="text-sm text-muted-foreground">+91 1800-123-4567</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                      <Mail className="h-8 w-8 mb-2" />
                      <span className="font-medium">Email Us</span>
                      <span className="text-sm text-muted-foreground">support@sanchaari.com</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpCenter;