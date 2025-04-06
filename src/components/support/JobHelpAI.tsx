
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Bot, User, Loader2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabaseClient } from '@/integrations/supabase/client';

interface JobHelpAIProps {
  initialPrompt?: string;
  title?: string;
  description?: string;
}

const JobHelpAI = ({ 
  initialPrompt = "How can I improve my job application?", 
  title = "AI Job Assistant", 
  description = "Get personalized advice for your job search needs" 
}: JobHelpAIProps) => {
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { user: messageText, bot: '...' }]);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabaseClient.functions.invoke('chat', {
        body: { message: messageText }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update the last message with the bot's reply
      setMessages(prev => prev.slice(0, -1).concat({ user: messageText, bot: data.reply }));
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Communication Error",
        description: "Unable to reach the job assistant. Please try again later.",
        variant: "destructive"
      });
      
      // Update the last message to indicate error
      setMessages(prev => prev.slice(0, -1).concat({ 
        user: messageText, 
        bot: "Sorry, I'm having trouble connecting right now. Please try again later." 
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        Powered by AI - Responses are generated based on job search best practices
      </CardFooter>
    </Card>
  );
};

export default JobHelpAI;
