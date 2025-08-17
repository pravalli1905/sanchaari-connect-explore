import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

const DemoChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Demo conversation script
  const demoScript = [
    {
      user: "Hi! I want to plan a group trip to Goa for 8 people",
      assistant: "Hello! I'd love to help you plan an amazing group trip to Goa! 🏖️ For 8 people, that sounds like a fantastic getaway. Let me help you get started:\n\n• What's your preferred travel dates?\n• What's your total budget range?\n• Are you looking for beach activities, nightlife, cultural experiences, or a mix?\n\nI can help you find the best accommodations, activities, and create a shared itinerary for your group!"
    },
    {
      user: "We want to go in December for 4 days, budget around ₹2,00,000",
      assistant: "Perfect timing! December is ideal for Goa. With ₹2,00,000 for 8 people (₹25,000 per person), here's what I can arrange:\n\n🏨 **Accommodation Options:**\n• Beach resort with group rooms: ₹8,000/night\n• Luxury villa rental: ₹12,000/night\n\n✈️ **Flights:** ₹8,000-12,000 per person\n🍽️ **Food & Dining:** ₹1,500 per person/day\n🎯 **Activities:** Water sports, casino, beach clubs\n\nShall I create a detailed itinerary and start booking options for your group?"
    },
    {
      user: "Yes, create the itinerary and show group coordination features",
      assistant: "Excellent! I've created your Goa itinerary and set up group coordination tools:\n\n📅 **Day 1:** Arrival + Beach Welcome Party\n📅 **Day 2:** Water Sports + Sunset Cruise  \n📅 **Day 3:** Cultural Tour + Night Market\n📅 **Day 4:** Beach Relaxation + Departure\n\n👥 **Group Features Activated:**\n✅ Shared expense tracker\n✅ Real-time voting for activities\n✅ Group chat with itinerary updates\n✅ Split payment options\n✅ Emergency contact sharing\n\n🔗 I've sent invites to all 8 members. They can vote on accommodations, add preferences, and track shared expenses in real-time!"
    }
  ];

  useEffect(() => {
    if (isOpen && currentStep < demoScript.length) {
      const timer = setTimeout(() => {
        // Add user message
        const userMessage: Message = {
          id: Date.now(),
          content: demoScript[currentStep].user,
          role: 'user',
          timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        // Add assistant message after delay
        setTimeout(() => {
          const assistantMessage: Message = {
            id: Date.now() + 1,
            content: demoScript[currentStep].assistant,
            role: 'assistant',
            timestamp: new Date().toLocaleTimeString()
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
          setCurrentStep(prev => prev + 1);
        }, 2000);
      }, currentStep === 0 ? 1000 : 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const resetDemo = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsTyping(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => {
          setIsOpen(true);
          resetDemo();
        }}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg z-50"
      >
        <span className="text-2xl">💬</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="font-semibold">Sanchaari AI Assistant</h3>
            <p className="text-xs opacity-90">Demo Conversation</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Demo Controls */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">
            Demo Progress: {currentStep}/{demoScript.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={resetDemo}
          >
            Restart Demo
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-white border rounded-lg p-2 text-gray-400 text-sm">
            Watch the AI conversation demo...
          </div>
          <Button size="sm" disabled>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DemoChatBot;