import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Mic, MicOff, Sparkles, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
  suggestions?: string[];
}

interface ChatBotProps {
  userType?: 'user' | 'business';
  context?: string;
}

const ModernChatBot = ({ userType = 'user', context }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: userType === 'business' 
        ? '🚀 Welcome to Sanchaari Business Hub! I\'m your AI assistant specialized in partner operations, analytics, and booking management. How can I accelerate your business today?'
        : '✈️ Hey there! I\'m Sanchaari AI - your intelligent travel companion. I can plan epic group trips, find hidden gems, manage bookings, and make your travel dreams come true. What adventure are we planning today?',
      role: 'assistant',
      timestamp: new Date(),
      suggestions: userType === 'business' 
        ? ['View Analytics', 'Manage Bookings', 'Partner Support', 'Revenue Insights']
        : ['Plan a Group Trip', 'Find Destinations', 'Check My Bookings', 'Travel Tips']
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSystemPrompt = () => {
    const basePrompt = userType === 'business' 
      ? 'You are Sanchaari AI, an advanced business assistant for partners on the Sanchaari platform. You excel at analytics, booking management, revenue optimization, and partner support.'
      : 'You are Sanchaari AI, an intelligent travel assistant that specializes in group travel planning, destination discovery, and personalized travel experiences.';
    
    const contextPrompt = context ? ` Current context: ${context}` : '';
    const userPrompt = user ? ` User: ${user.email}` : ' Guest user.';
    
    return basePrompt + contextPrompt + userPrompt + ' Be enthusiastic, helpful, and provide actionable insights. Use emojis naturally.';
  };

  const typeMessage = (content: string, messageId: string) => {
    setIsTyping(true);
    const words = content.split(' ');
    let currentText = '';
    let wordIndex = 0;

    const typeWord = () => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText, isStreaming: true }
            : msg
        ));
        wordIndex++;
        setTimeout(typeWord, Math.random() * 100 + 50);
      } else {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isStreaming: false }
            : msg
        ));
        setIsTyping(false);
      }
    };

    typeWord();
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with streaming effect
    const assistantMessageId = (Date.now() + 1).toString();
    const placeholderMessage: Message = {
      id: assistantMessageId,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isStreaming: true,
      suggestions: ['Ask follow-up', 'Get more details', 'Start booking', 'Explore options']
    };

    setMessages(prev => [...prev, placeholderMessage]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responses = [
        '🎯 Great question! Based on your preferences, I recommend exploring these amazing destinations for your group trip. Each offers unique experiences perfect for creating unforgettable memories together.',
        '📊 I\'ve analyzed your current performance metrics. Your booking conversion rate has improved by 23% this month! Here are some actionable insights to boost it even further.',
        '✨ I found some incredible options for you! Let me break down the best choices with pricing, availability, and group-friendly features.',
        '🌟 Perfect timing! I can help you optimize this experience. Here\'s a personalized recommendation based on your travel history and preferences.'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      typeMessage(randomResponse, assistantMessageId);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { 
              ...msg, 
              content: '🚨 Oops! I\'m experiencing some technical difficulties. Let me try that again in a moment.',
              isStreaming: false 
            }
          : msg
      ));
      toast.error('Connection issue - retrying...');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success('🎤 Voice recording started');
    } else {
      toast.info('🔇 Voice recording stopped');
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full shadow-floating hover:scale-110 transition-all duration-300 bg-gradient-to-br from-primary via-primary-hover to-accent animate-pulse border-4 border-white/20"
            size="icon"
          >
            <div className="relative">
              <Sparkles className="h-7 w-7 text-white animate-bounce" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
            </div>
          </Button>
          
          {/* Floating badges */}
          <Badge 
            variant="secondary" 
            className="absolute -top-3 -left-2 bg-accent text-white border-0 animate-bounce font-medium shadow-lg"
            style={{ animationDelay: '0.5s' }}
          >
            <Bot className="h-3 w-3 mr-1" />
            AI
          </Badge>
          
          <Badge 
            variant="secondary" 
            className="absolute -bottom-2 -right-3 bg-secondary text-white border-0 animate-bounce font-medium shadow-lg"
            style={{ animationDelay: '1s' }}
          >
            <Zap className="h-3 w-3 mr-1" />
            Live
          </Badge>

          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`shadow-floating border-0 bg-gradient-to-br from-card via-card to-muted/50 backdrop-blur-xl transition-all duration-500 ease-bounce ${
        isMinimized ? 'w-80 h-20' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary via-primary-hover to-accent p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  Sanchaari AI 
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/90 text-sm font-medium">
                    {userType === 'business' ? 'Business Assistant' : 'Travel Companion'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-lg">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute top-6 left-4 w-4 h-4 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 right-8 w-6 h-6 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 h-[440px] p-4 bg-gradient-to-b from-background/50 to-muted/20">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary/20 shadow-md">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] space-y-2`}>
                      <div
                        className={`p-4 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-primary to-primary-hover text-white ml-auto rounded-br-md'
                            : 'bg-white border border-border/50 rounded-bl-md'
                        }`}
                      >
                        <p className={`text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-foreground'}`}>
                          {message.content}
                          {message.isStreaming && <span className="animate-pulse">|</span>}
                        </p>
                        <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      {/* Suggestions */}
                      {message.role === 'assistant' && message.suggestions && !message.isStreaming && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="h-8 px-3 text-xs bg-white/50 hover:bg-primary hover:text-white border-primary/20 hover:border-primary transition-all duration-200 rounded-full"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center flex-shrink-0 border-2 border-secondary/20 shadow-md">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing indicator */}
                {(isLoading || isTyping) && (
                  <div className="flex gap-3 justify-start animate-fade-in-up">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-primary/20">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-soft border border-border/50">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-gradient-to-r from-background to-muted/30">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask me anything about ${userType === 'business' ? 'your business' : 'travel'}...`}
                    disabled={isLoading}
                    className="pr-20 py-3 rounded-xl border-2 border-border/50 focus:border-primary bg-white/80 backdrop-blur-sm transition-all duration-300"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleRecording}
                      className={`h-8 w-8 p-0 rounded-full transition-all duration-200 ${
                        isRecording ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-muted'
                      }`}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="h-11 w-11 rounded-xl bg-gradient-to-r from-primary to-primary-hover hover:scale-105 transition-all duration-200 shadow-soft"
                  size="icon"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Status bar */}
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  <span>Connected</span>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ModernChatBot;