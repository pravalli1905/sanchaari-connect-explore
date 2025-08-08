import { useState, useRef, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Send, Smile, Paperclip, Bot, Users, Plus, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/layout/Navbar"

interface Message {
  id: number
  type: 'user' | 'bot'
  sender?: string
  avatar?: string
  content: string
  timestamp: string
}

const GroupChat = () => {
  const { groupId } = useParams()
  const [currentMessage, setCurrentMessage] = useState("")
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Mock group data
  const groupData = {
    name: "Goa Beach Vibes",
    members: 8
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'user',
      sender: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Hey everyone! Super excited for our Goa trip! 🏖️',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      sender: 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Same here! Should we plan some water sports?',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      type: 'bot',
      content: 'I can help you plan water sports activities! Goa offers parasailing, jet skiing, banana boat rides, and scuba diving. Would you like me to suggest some popular spots and pricing?',
      timestamp: '10:33 AM'
    }
  ])

  const [aiSuggestions] = useState([
    {
      id: 1,
      title: "Beach Activities",
      description: "Parasailing, jet skiing, beach volleyball",
      action: "Add to itinerary"
    },
    {
      id: 2,
      title: "Local Cuisine",
      description: "Fish curry, bebinca, feni tasting",
      action: "Find restaurants"
    },
    {
      id: 3,
      title: "Nightlife",
      description: "Beach clubs, live music venues",
      action: "Get recommendations"
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        sender: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        content: currentMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setMessages([...messages, newMessage])
      setCurrentMessage("")
      
      // Simulate AI response
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'bot',
          content: "Great suggestion! I can help you find the best options for that. Let me gather some recommendations based on your group preferences.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 h-screen flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 border-b border-border bg-background/90 backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Link to={`/groups/${groupId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">{groupData.name}</h1>
                <p className="text-sm text-muted-foreground">{groupData.members} members</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="md:hidden"
            >
              <Bot size={16} className="mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-xs md:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {message.type === 'bot' ? (
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                    ) : message.avatar ? (
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : null}
                    
                    <div className={`rounded-lg p-3 ${
                      message.type === 'bot' 
                        ? 'bg-blue-50 border border-blue-200' 
                        : message.sender === 'You'
                        ? 'bg-gradient-to-r from-primary to-primary-hover text-white'
                        : 'bg-muted'
                    }`}>
                      {message.sender && message.sender !== 'You' && (
                        <p className="text-xs font-medium text-muted-foreground mb-1">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'bot' ? 'text-blue-600' : 
                        message.sender === 'You' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-xs">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Smile size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Paperclip size={16} />
                    </Button>
                  </div>
                </div>
                <Button onClick={sendMessage} disabled={!currentMessage.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* AI Assistant Panel */}
          {showAIPanel && (
            <>
              <Separator orientation="vertical" className="hidden md:block" />
              <div className="w-80 bg-background border-l border-border hidden md:block">
                <Card className="h-full rounded-none border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot size={20} className="text-primary" />
                      <span>AI Travel Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      I can help you plan activities, find restaurants, suggest budgets, and optimize your itinerary!
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Quick Suggestions</h4>
                      {aiSuggestions.map((suggestion) => (
                        <Card key={suggestion.id} className="p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                          <h5 className="font-medium text-sm text-foreground mb-1">{suggestion.title}</h5>
                          <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Plus size={14} className="mr-1" />
                            {suggestion.action}
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupChat