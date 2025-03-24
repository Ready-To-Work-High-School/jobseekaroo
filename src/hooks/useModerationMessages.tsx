
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  fetchMessagesForModeration, 
  approveMessage as approveMessageApi, 
  rejectMessage as rejectMessageApi 
} from '@/lib/supabase/messaging';
import { ModerationMessage } from '@/lib/supabase/messaging/types';

export const useModerationMessages = () => {
  const [messages, setMessages] = useState<ModerationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const moderationMessages = await fetchMessagesForModeration();
      setMessages(moderationMessages);
    } catch (error) {
      console.error('Error fetching messages for moderation:', error);
      toast({
        title: "Failed to load messages",
        description: "There was an error loading messages for moderation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNewMessages = () => {
    const channel = supabase
      .channel('moderation-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `needs_moderation=eq.true`
        },
        () => {
          fetchMessages();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `needs_moderation=eq.true`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();
      
    return channel;
  };

  const approveMessage = async (messageId: string) => {
    try {
      await approveMessageApi(messageId);
      
      toast({
        title: "Message approved",
        description: "The message has been approved and is now visible to the recipient",
      });
      
      // Remove the approved message from the list
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error approving message:', error);
      toast({
        title: "Failed to approve message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const rejectMessage = async (messageId: string) => {
    try {
      await rejectMessageApi(messageId);
      
      toast({
        title: "Message rejected",
        description: "The message has been rejected and will not be visible to the recipient",
      });
      
      // Remove the rejected message from the list
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error rejecting message:', error);
      toast({
        title: "Failed to reject message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    const channel = subscribeToNewMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    messages,
    isLoading,
    approveMessage,
    rejectMessage,
    refreshMessages: fetchMessages
  };
};
