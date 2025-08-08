import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Paperclip, Phone, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SupportChat = () => {
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m here to help you with any questions about Sanchaari. How can I assist you today?',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      type: 'user',
      content: 'I need help with my booking cancellation',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      type: 'agent',
      content: 'I\'d be happy to help you with your booking cancellation. Let me connect you with our booking specialist.',
      timestamp: new Date(Date.now() - 180000),
      agent: { name: 'Priya', status: 'online' }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        type: 'agent' as const,
        content: 'Thanks for your message. I\'m looking into this for you right now.',
        timestamp: new Date(),
        agent: { name: 'Priya', status: 'online' as const }
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <Card>
              <CardHeader>
                <CardTitle>Support Chat</CardTitle>
                <CardDescription>
                  Get help with your Sanchaari experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Sign in for personalized support</h3>
                  <p className="text-muted-foreground mb-4">
                    Log in to access your booking history and get personalized assistance
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-3">Quick Help (No login required)</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      How do I create a group trip?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      What payment methods do you accept?
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      How do cancellations work?
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/help" className="w-full justify-start">
                        View all FAQs →
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link to="/help">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Support Chat</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Priya is online</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>

          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex-1 p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-xs ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {msg.type === 'user' ? 'You' : msg.type === 'agent' ? 'P' : 'AI'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        {msg.type === 'agent' && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">{msg.agent?.name}</span>
                            <Badge variant="secondary" className="text-xs">Support</Badge>
                          </div>
                        )}
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-xs">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Average response time: 2 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SupportChat;