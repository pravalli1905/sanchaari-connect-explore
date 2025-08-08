import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3>Data Protection & Security</h3>
              <p>
                At Sanchaari, we take your privacy seriously. All uploaded documents are encrypted 
                using industry-standard AES-256 encryption and stored securely on our servers.
              </p>
              
              <h3>Information We Collect</h3>
              <ul>
                <li>Personal identification information (name, email, phone)</li>
                <li>Travel documents (passport, visa, certificates)</li>
                <li>Payment information (processed securely through our partners)</li>
                <li>Trip preferences and booking history</li>
              </ul>

              <h3>How We Use Your Information</h3>
              <p>
                Your information is used solely for providing travel services, processing bookings,
                and ensuring compliance with travel regulations. We never sell your data to third parties.
              </p>

              <h3>Data Retention</h3>
              <p>
                We retain your data for as long as necessary to provide services and comply with legal
                obligations. You can request data deletion at any time.
              </p>

              <h3>Contact Us</h3>
              <p>
                For privacy-related questions, contact us at privacy@sanchaari.com or through our
                support chat.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;