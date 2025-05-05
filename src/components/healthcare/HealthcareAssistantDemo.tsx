
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Bot, Send, Stethoscope, User, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define message type
interface Message {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  timestamp: Date;
}

// Demo responses for healthcare assistant
const demoResponses: Record<string, string> = {
  "hello": "Hello! I'm your Healthcare Assistant. How can I help you today? I can provide information about common medical conditions, preventive care, or help you schedule an appointment.",
  "appointment": "I'd be happy to help you schedule an appointment. Our next available slots are tomorrow at 10:00 AM or Friday at 2:00 PM. Would either of these times work for you?",
  "symptoms": "I understand you're not feeling well. Could you please describe your symptoms in more detail? Information about duration, severity, and any related factors would be helpful for providing better guidance.",
  "insurance": "We accept most major insurance plans including BlueCross BlueShield, Aetna, Cigna, and UnitedHealthcare. Would you like me to check if your specific plan is covered?",
  "medication": "For questions about medication, I'd need to know which specific medication you're asking about. However, please remember that you should always follow your doctor's instructions regarding dosage and frequency.",
  "default": "Thank you for your message. As a healthcare assistant, I can provide general health information and help with appointment scheduling. For specific medical advice, please consult with a healthcare professional directly. Is there something specific I can help you with today?"
};

const HealthcareAssistantDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Healthcare Assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate response based on keywords in user input
      let responseContent = demoResponses.default;
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
        responseContent = demoResponses.hello;
      } else if (lowercaseInput.includes('appointment') || lowercaseInput.includes('schedule')) {
        responseContent = demoResponses.appointment;
      } else if (lowercaseInput.includes('symptom') || lowercaseInput.includes('sick') || lowercaseInput.includes('pain')) {
        responseContent = demoResponses.symptoms;
      } else if (lowercaseInput.includes('insurance') || lowercaseInput.includes('coverage')) {
        responseContent = demoResponses.insurance;
      } else if (lowercaseInput.includes('medicine') || lowercaseInput.includes('medication') || lowercaseInput.includes('pill')) {
        responseContent = demoResponses.medication;
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader className="bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="bg-blue-500">
              <Stethoscope className="h-5 w-5 text-white" />
              <AvatarFallback>HA</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                Healthcare Assistant
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-700">Demo</Badge>
              </CardTitle>
              <CardDescription>Virtual healthcare support and guidance</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.role === 'assistant' && (
                    <Avatar className="mt-0.5 bg-blue-100">
                      <Bot className="h-4 w-4 text-blue-700" />
                      <AvatarFallback>HA</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="mt-0.5 bg-blue-600">
                      <User className="h-4 w-4 text-white" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="mt-0.5 bg-blue-100">
                    <Bot className="h-4 w-4 text-blue-700" />
                    <AvatarFallback>HA</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HealthcareAssistantDemo;
