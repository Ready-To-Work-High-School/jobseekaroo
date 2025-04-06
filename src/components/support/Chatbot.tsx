
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { user: userMessage, bot: '...' }]);
    
    try {
      const response = await fetch('https://jobseekaroo.onrender.com/api/chat', {
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
        description: "Unable to reach the chat server. Please try again later.",
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-md bg-primary hover:bg-primary/90 z-50"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="sr-only">Open chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4">
          <div className="text-xl font-semibold border-b pb-2">
            Job Search Assistant
          </div>
          
          <div className="h-64 overflow-y-auto space-y-3 p-1">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Ask me anything about jobs, interviews, or career advice!
              </p>
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
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
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
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot;
