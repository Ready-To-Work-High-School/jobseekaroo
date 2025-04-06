
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const JOB_HELP_SUGGESTIONS = [
  "How do I write a good resume?",
  "Tips for my first job interview",
  "What skills are in demand for entry-level jobs?",
  "How to negotiate salary for my first job?",
  "What should I wear to an interview?"
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { user: userMessage, bot: '...' }]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const { reply } = await response.json();
      
      // Update the last message with the bot's reply
      setMessages(prev => prev.slice(0, -1).concat({ user: userMessage, bot: reply }));
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Communication Error",
        description: "Unable to reach the job assistant. Please try again later.",
        variant: "destructive"
      });
      
      // Update the last message to indicate error
      setMessages(prev => prev.slice(0, -1).concat({ 
        user: userMessage, 
        bot: "Sorry, I'm having trouble connecting right now. Please try again later." 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    sendMessage();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-md bg-primary hover:bg-primary/90 z-50"
        >
          <Briefcase className="w-5 h-5" />
          <span className="sr-only">Job Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80vh] max-h-[600px] p-0">
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b px-4">
              <TabsTrigger value="chat" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Job Assistant
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Resources
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-grow flex flex-col p-0 m-0 overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="text-lg font-medium">Job Search Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Ask me anything about job searching, interviews, or career advice!
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col gap-3">
                  <p className="text-center text-muted-foreground py-4">
                    Hi there! I'm your job search assistant. How can I help you today?
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {JOB_HELP_SUGGESTIONS.map((suggestion, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        className="text-sm justify-start text-left h-auto py-2 px-3"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className="space-y-2">
                    <div className="bg-muted/50 p-3 rounded-lg ml-auto max-w-[80%] break-words">
                      <p className="text-sm font-medium">You</p>
                      <p>{msg.user}</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg mr-auto max-w-[80%] break-words">
                      <p className="text-sm font-medium">Assistant</p>
                      <p>{msg.bot}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about jobs, interviews, resumes..."
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={isLoading || !input.trim()}
                  size="sm"
                >
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="flex-grow flex flex-col p-4 m-0 overflow-auto space-y-4">
            <h3 className="text-lg font-medium">Job Search Resources</h3>
            
            <Card className="p-4">
              <h4 className="font-medium mb-2">Resume Templates</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Access professionally designed resume templates
              </p>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/resume-assistant'}>
                View Templates
              </Button>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-medium mb-2">Interview Preparation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Practice for your interviews with common questions and tips
              </p>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/interview-prep'}>
                Practice Now
              </Button>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-medium mb-2">Skill Assessment</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Find out which skills are in demand and how to develop them
              </p>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/skills'}>
                Assess Skills
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
