
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MessageInputProps {
  conversationId: string;
  receiverId: string;
  onSendMessage: (content: string) => Promise<void>;
  requiresModeration: boolean;
}

export const MessageInput = ({ 
  conversationId, 
  receiverId, 
  onSendMessage,
  requiresModeration
}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!user) {
      toast({
        title: "Not signed in",
        description: "You need to be signed in to send messages",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSending(true);
      await onSendMessage(message);
      setMessage('');
      
      if (requiresModeration) {
        toast({
          title: "Message sent for moderation",
          description: "Your message will be visible once approved by a moderator",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mt-4 flex space-x-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="resize-none min-h-[80px]"
        disabled={isSending}
      />
      <Button 
        onClick={handleSendMessage} 
        disabled={!message.trim() || isSending}
        variant="default"
        size="icon"
        className="h-10 w-10 self-end"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
