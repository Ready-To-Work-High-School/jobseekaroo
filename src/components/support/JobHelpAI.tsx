
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Bot, User, Loader2, Send, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabaseClient } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface JobHelpAIProps {
  initialPrompt?: string;
  title?: string;
  description?: string;
}

// Pre-defined fallback responses for when the AI is unavailable
const FALLBACK_RESPONSES = {
  default: "I'm here to help with your job search questions! While I'm currently in offline mode, I can still offer some general guidance.",
  resume: "Creating an effective resume is crucial. Focus on highlighting relevant skills, using action verbs, quantifying achievements, and tailoring it to each job application.",
  interview: "For interview preparation: Research the company, practice common questions, prepare examples using the STAR method (Situation, Task, Action, Result), and prepare thoughtful questions to ask.",
  application: "When applying for jobs, carefully read the job description, customize your application materials, follow all instructions exactly, and apply as early as possible.",
  skills: "Important skills for entry-level positions include communication, problem-solving, adaptability, teamwork, time management, and basic technical skills relevant to your field."
};

const JobHelpAI = ({ 
  initialPrompt = "How can I improve my job application?", 
  title = "AI Job Assistant", 
  description = "Get personalized advice for your job search needs" 
}: JobHelpAIProps) => {
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // If there's an initial prompt, automatically send it when component loads
    if (initialPrompt && messages.length === 0) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

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

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { user: messageText, bot: '...' }]);
    
    try {
      if (!apiAvailable) {
        // Use fallback mode if API is not available
        setTimeout(() => {
          const fallbackReply = getFallbackResponse(messageText);
          setMessages(prev => prev.slice(0, -1).concat({ user: messageText, bot: fallbackReply }));
          setIsLoading(false);
        }, 1000); // Simulate a short delay
        return;
      }
      
      // Call the Supabase Edge Function
      const { data, error } = await supabaseClient.functions.invoke('chat', {
        body: { message: messageText }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update the last message with the bot's reply
      setMessages(prev => prev.slice(0, -1).concat({ user: messageText, bot: data.reply }));
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
        user: messageText, 
        bot: apiAvailable 
          ? "Sorry, I'm having trouble connecting right now. Please try again later."
          : getFallbackResponse(messageText)
      }));
    } finally {
      setInput('');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage(input);
    }
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title} 
          {!apiAvailable && <span className="text-sm font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Offline Mode</span>}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!apiAvailable && (
          <Alert variant="default" className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertTitle>AI Service Unavailable</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>The AI assistant is currently operating in offline mode with limited functionality.</p>
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
        )}

        <div className="h-[400px] overflow-y-auto p-4 border rounded-md space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <div>
                <Bot className="mx-auto h-12 w-12 mb-2 text-primary/50" />
                <p>Send a message to start getting help with your job search</p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg max-w-[90%]">
                    <p className="text-sm">{msg.user}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-secondary h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg max-w-[90%]">
                    <p className="text-sm whitespace-pre-line">{msg.bot === '...' ? 
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                      </span> : msg.bot}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="resize-none"
            rows={3}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <Button 
            onClick={() => handleSendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="h-auto"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {apiAvailable 
          ? "Powered by AI - Responses are generated based on job search best practices"
          : "Currently in offline mode - Providing general job search guidance"
        }
      </CardFooter>
    </Card>
  );
};

export default JobHelpAI;
