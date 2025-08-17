import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';

interface DemoVideoModalProps {
  trigger?: React.ReactNode;
}

const DemoVideoModal = ({ trigger }: DemoVideoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold">Sanchaari Platform Demo</DialogTitle>
          </DialogHeader>
          
          <div className="px-6 pb-6">
            {/* Video Container */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              {/* Placeholder for demo video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Demo Video Coming Soon</h3>
                  <p className="text-gray-300 max-w-md">
                    Watch how Sanchaari makes group travel planning effortless with AI assistance, 
                    real-time collaboration, and smart budgeting tools.
                  </p>
                </div>
              </div>
              
              {/* Video would go here */}
              {/* 
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/demo-thumbnail.jpg"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              */}
            </div>
            
            {/* Video Description */}
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold">What you'll see in this demo:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-sm">AI-powered trip planning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-sm">Real-time group collaboration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-sm">Smart expense splitting</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-sm">Seamless booking process</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-sm">Interactive itinerary building</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-sm">Group voting & preferences</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-primary">Ready to try it yourself?</h5>
                  <p className="text-sm text-gray-600">Start planning your next group trip for free</p>
                </div>
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to signup or dashboard
                    window.location.href = '/signup';
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DemoVideoModal;