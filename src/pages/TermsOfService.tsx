import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/Navbar"

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using Sanchaari's services.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 16, 2024
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Sanchaari's website, mobile application, and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Sanchaari provides a platform for planning, organizing, and booking group travel experiences. Our services include but are not limited to:
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6 mt-4">
                  <li>Group travel planning tools and collaboration features</li>
                  <li>Booking services for flights, hotels, and activities</li>
                  <li>Payment splitting and management tools</li>
                  <li>Communication and chat features for travel groups</li>
                  <li>Itinerary building and sharing capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Registration and Account</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  To use certain features of our service, you must register for an account. You agree to:
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6 mt-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Be responsible for all activities that occur under your account</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Booking and Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  When making bookings through our platform:
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6 mt-4">
                  <li>All prices are subject to availability and confirmation</li>
                  <li>Payment is required at the time of booking</li>
                  <li>Cancellation and refund policies are determined by individual service providers</li>
                  <li>Additional charges may apply for changes or cancellations</li>
                  <li>We act as an intermediary between you and service providers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. User Conduct and Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  You agree not to use our service to:
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6 mt-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Interfere with the operation of our platform</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our service for any commercial purpose without permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  The service and its original content, features, and functionality are owned by Sanchaari and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Privacy and Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Sanchaari shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Termination</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p>Email: legal@sanchaari.com</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Address: 123 Travel Street, Mumbai, Maharashtra 400001, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TermsOfService