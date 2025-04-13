
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Briefcase, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const JOB_HELP_SUGGESTIONS = [
  "How do I write a good resume?",
  "Tips for my first job interview",
  "What skills are in demand for entry-level jobs?",
  "How to negotiate salary for my first job?",
  "What should I wear to an interview?"
];

// Pre-defined fallback responses for when the API is unavailable
const FALLBACK_RESPONSES = {
  default: "I'm here to help with your job search questions! While I'm currently in offline mode, I can still offer some general guidance.",
  resume: "Creating an effective resume is crucial. Focus on highlighting relevant skills, using action verbs, quantifying achievements, and tailoring it to each job application.",
  interview: "For interview preparation: Research the company, practice common questions, prepare examples using the STAR method (Situation, Task, Action, Result), and prepare thoughtful questions to ask.",
  application: "When applying for jobs, carefully read the job description, customize your application materials, follow all instructions exactly, and apply as early as possible.",
  skills: "Important skills for entry-level positions include communication, problem-solving, adaptability, teamwork, time management, and basic technical skills relevant to your field."
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getFallbackResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('resume')) {
      return FALLBACK_RESPONSES.resume;
    } else if (lowerCaseMessage.includes('interview')) {
      return FALLBACK_RESPONSES.interview;
    } else if (lowerCaseMessage.includes('application') || lowerCaseMessage.includes('apply')) {
      return FALLBACK_RESPONSES.application;
    } else if (lowerCaseMessage.includes('skill')) {
      return FALLBACK_RESPONSES.skills;
    }
    
    return FALLBACK_RESPONSES.default;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { user: userMessage, bot: '...' }]);
    
    try {
      if (!apiAvailable) {
        // Use fallback mode if API is not available
        setTimeout(() => {
          const fallbackReply = getFallbackResponse(userMessage);
          setMessages(prev => prev.slice(0, -1).concat({ user: userMessage, bot: fallbackReply }));
          setIsLoading(false);
        }, 1000); // Simulate a short delay
        return;
      }
      
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
      // Reset retry count on successful call
      setRetryCount(0);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Mark API as unavailable after multiple failures
      if (retryCount >= 2) {
        setApiAvailable(false);
        toast({
          title: "Switched to Offline Mode",
          description: "AI assistant is now using offline responses. Some features may be limited.",
          variant: "default"
        });
      } else {
        setRetryCount(prev => prev + 1);
        toast({
          title: "Communication Error",
          description: "Unable to reach the job assistant. Please try again later.",
          variant: "destructive"
        });
      }
      
      // Update the last message with either error or fallback
      setMessages(prev => prev.slice(0, -1).concat({ 
        user: userMessage, 
        bot: apiAvailable 
          ? "Sorry, I'm having trouble connecting right now. Please try again later."
          : getFallbackResponse(userMessage)
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

  const handleRetryConnection = () => {
    setApiAvailable(true);
    setRetryCount(0);
    toast({
      title: "Reconnecting to AI Service",
      description: "Attempting to restore AI assistant functionality",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-md bg-primary hover:bg-primary/90 z-50 w-12 h-12 flex items-center justify-center"
        >
          <span className="text-white font-medium text-sm">AI</span>
          <span className="sr-only">Job Help AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[80vh] max-h-[600px] p-0">
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b px-4">
              <TabsTrigger value="chat" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Job Assistant {!apiAvailable && <span className="ml-2 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">Offline</span>}
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
            
            {!apiAvailable && (
              <div className="px-4 pt-4">
                <Alert variant="default" className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <AlertTitle>AI Service Unavailable</AlertTitle>
                  <AlertDescription className="flex flex-col gap-2">
                    <p>The assistant is currently in offline mode with limited responses.</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="self-start"
                      onClick={handleRetryConnection}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Retry Connection
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
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
              {!apiAvailable && (
                <p className="text-xs text-amber-600 mt-2">Running in offline mode with limited responses</p>
              )}
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
