import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Mail, Phone } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import { useState } from "react"

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create my first group trip?",
          answer: "Creating your first group trip is easy! Simply sign up for an account, click on 'Create Group' and follow the step-by-step guide. You'll set your destination, dates, and invite your travel companions."
        },
        {
          question: "Is Sanchaari free to use?",
          answer: "Yes! Our basic features are completely free. You can create groups, invite members, and plan basic itineraries at no cost. We also offer premium features for enhanced planning capabilities."
        },
        {
          question: "How many people can join a group?",
          answer: "Free accounts can have up to 5 group members, while Pro accounts support up to 20 members. Enterprise plans have no limits on group size."
        }
      ]
    },
    {
      title: "Planning & Booking",
      faqs: [
        {
          question: "Can I book flights and hotels through Sanchaari?",
          answer: "Yes! We partner with leading travel providers to offer competitive rates on flights, hotels, and activities. You can compare prices and book everything in one place."
        },
        {
          question: "How does payment splitting work?",
          answer: "Our smart payment system automatically calculates each person's share based on what they've selected. Members can pay individually or designate one person to pay and settle later."
        },
        {
          question: "Can I modify my itinerary after booking?",
          answer: "Yes, you can make changes to your itinerary. However, modification fees may apply depending on the booking terms of hotels, flights, or activities."
        }
      ]
    },
    {
      title: "Group Management",
      faqs: [
        {
          question: "How do I invite people to my group?",
          answer: "You can invite people via email, phone number, or by sharing a unique group link. Invitees will receive notifications and can join with just a few clicks."
        },
        {
          question: "What if someone can't make the trip anymore?",
          answer: "Group members can leave trips at any time. If they've made payments, refund eligibility depends on the cancellation policies of booked services."
        },
        {
          question: "Can I create multiple groups?",
          answer: "Absolutely! You can create and manage multiple travel groups simultaneously. Each group has its own chat, itinerary, and booking management."
        }
      ]
    },
    {
      title: "Payment & Security",
      faqs: [
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use bank-level encryption and partner with certified payment processors. Your financial information is never stored on our servers."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets popular in India."
        },
        {
          question: "What is your refund policy?",
          answer: "Refunds depend on the cancellation policy of individual bookings. We provide transparent information about refund terms before you book."
        }
      ]
    }
  ]

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about planning group trips with Sanchaari.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg px-6 bg-card"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
            
            {filteredCategories.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No FAQs found matching "{searchQuery}"
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Still have questions?</CardTitle>
                <CardDescription>
                  Our support team is here to help you with any questions about group travel planning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get instant help from our support team
                      </p>
                      <Button size="sm" asChild>
                        <a href="/help/chat">Start Chat</a>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Send us a detailed message
                      </p>
                      <Button size="sm" variant="outline" asChild>
                        <a href="/contact">Send Email</a>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Speak directly with our team
                      </p>
                      <Button size="sm" variant="outline">
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FAQ